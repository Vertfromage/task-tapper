// components/TaskItem.tsx
"use client";

import { Task } from "./types";

interface TaskItemProps {
    task: Task;
    onComplete: () => void;
}

export default function TaskItem({ task, onComplete }: TaskItemProps) {
    return (
        <div style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ddd' }}>
            <p>{task.name}</p>
            <p>Streak: {task.streak} {task.streak === 1 ? "day" : "days"}</p>
            <button
                onClick={onComplete}
                disabled={task.completedToday}
                style={{
                    backgroundColor: task.completedToday ? '#ddd' : '#0070f3',
                    color: '#fff',
                    padding: '0.5rem',
                    border: 'none',
                    cursor: task.completedToday ? 'default' : 'pointer',
                }}
            >
                {task.completedToday ? "Completed" : `Complete +${task.points} points`}
            </button>
        </div>
    );
}