// components/TaskList.tsx

"use client";

import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { Task } from "./types";

interface TaskListProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    onComplete: (points: number) => void;
    onAllTasksComplete: () => void;
}

export default function TaskList({ tasks, setTasks, onComplete, onAllTasksComplete }: TaskListProps) {
    // Check if all tasks are completed
    useEffect(() => {
        const allCompleted = tasks.every(task => task.completedToday);
        if (allCompleted && tasks.length > 0) {
            onAllTasksComplete(); // Trigger streak update only if all tasks are completed
        }
    }, [tasks, onAllTasksComplete]);


    const completeTask = (taskId: number, points: number) => {
        const today = new Date().toISOString().split("T")[0];

        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === taskId && task.lastCompletedDate !== today) {
                    let newStreak = task.streak;

                    // Check if last completion was yesterday to maintain streak
                    if (task.lastCompletedDate) {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        const yesterdayString = yesterday.toISOString().split("T")[0];

                        newStreak = task.lastCompletedDate === yesterdayString ? task.streak + 1 : 1;
                    } else {
                        // If it's the first time completing, initialize streak
                        newStreak = 1;
                    }

                    return {
                        ...task,
                        completedToday: true,
                        lastCompletedDate: today,
                        streak: newStreak,
                    };
                }
                return task;
            })
        );

        onComplete(points);
    };

    return (
        <div>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onComplete={() => completeTask(task.id, task.points)} />
            ))}
        </div>
    );
}