// components/TaskList.tsx

"use client";

import { useEffect } from "react";
import TaskItem from "./TaskItem";
import { Task } from "./types";
import AddTaskForm from "./AddTaskForm";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onComplete: (points: number) => void;
  onAllTasksComplete: () => void;
  addTask: (name: string, points: number, time:number) => void;
  removeTask: (taskId: number) => void;
}

export default function TaskList({
  tasks,
  setTasks,
  onComplete,
  onAllTasksComplete,
  addTask,
  removeTask,
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
    // Store today's date in UTC format for consistency
    const today = new Date().toISOString(); // e.g., "2024-11-03T00:00:00Z"

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId && task.lastCompletedDate !== today) {
          let newStreak = task.streak;

          // Check if last completion was yesterday to maintain streak
          if (task.lastCompletedDate) {
            const yesterday = new Date();
            yesterday.setUTCDate(yesterday.getUTCDate() - 1); // Move back one day in UTC
            const yesterdayString = yesterday.toISOString().split("T")[0];

            const lastCompletedDateString = new Date(task.lastCompletedDate).toISOString().split("T")[0];

            newStreak = lastCompletedDateString === yesterdayString ? task.streak + 1 : 1;
          } else {
            newStreak = 1; // Initialize streak if first completion
          }

          // Reset elapsedTime after completion and update average time
          return {
            ...task,
            completedToday: true,
            lastCompletedDate: today, // Store full UTC date string
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
      <AddTaskForm onAddTask={addTask}/>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={() => completeTask(task.id, task.points)}
          updateTaskTime={updateTaskTime} // Pass down function to update elapsed time
          onRemove={() => removeTask(task.id)}  // Handle task removal
        />
      ))}
    </div>
  );
}
