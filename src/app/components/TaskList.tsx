// components/TaskList.tsx

"use client";

import { useEffect } from "react";
import TaskItem from "./TaskItem";
import { Task } from "./types";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onComplete: (points: number) => void;
  onAllTasksComplete: () => void;
}

export default function TaskList({
  tasks,
  setTasks,
  onComplete,
  onAllTasksComplete,
}: TaskListProps) {
  useEffect(() => {
    const allCompleted = tasks.every((task) => task.completedToday);
    if (allCompleted && tasks.length > 0) {
      onAllTasksComplete();
    }
  }, [tasks, onAllTasksComplete]);

  // Update elapsed time for each task when the timer stops
  const updateTaskTime = (taskId: number, elapsedTime: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, elapsedTime } : task
      )
    );
  };

  const completeTask = (taskId: number, points: number) => {
    const today = new Date().toISOString().split("T")[0];

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId && task.lastCompletedDate !== today) {
          let newStreak = task.streak;

          // Check if last completion was yesterday to maintain streak
          if (task.lastCompletedDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayString = yesterday.toISOString().split("T")[0];

            newStreak =
              task.lastCompletedDate === yesterdayString ? task.streak + 1 : 1;
          } else {
            newStreak = 1; // Initialize streak if first completion
          }

          // Reset elapsedTime after completion and update average time
          return {
            ...task,
            completedToday: true,
            lastCompletedDate: today,
            streak: newStreak,
            time: Math.max(task.time, task.elapsedTime || 0), // Keep the maximum time
            elapsedTime: 0, // Reset elapsed time after completion
          };
        }
        return task;
      })
    );

    onComplete(points);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={() => completeTask(task.id, task.points)}
          updateTaskTime={updateTaskTime} // Pass down function to update elapsed time
        />
      ))}
    </div>
  );
}
