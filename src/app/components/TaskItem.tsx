import { useState, useEffect } from "react";
import { Task } from "./types";

interface TaskItemProps {
  task: Task;
  onComplete: () => void;
  updateTaskTime: (taskId: number, elapsedTime: number) => void;
  onRemove: () => void;
}

export default function TaskItem({
  task,
  onComplete,
  updateTaskTime,
  onRemove,
}: TaskItemProps) {
  const [elapsedTime, setElapsedTime] = useState(task.elapsedTime || 0); // Stores total elapsed time
  const [isRunning, setIsRunning] = useState(task.isRunning || false);
  const [startTime, setStartTime] = useState<number | null>(null); // Stores the timestamp when the timer was started/resumed

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(Date.now() - elapsedTime * 1000); // Adjust startTime to account for the existing elapsed time
    }
  };

  const stopTimer = () => {
    if (isRunning && startTime) {
      const now = Date.now();
      setElapsedTime(Math.floor((now - startTime) / 1000)); // Finalize elapsed time
      setIsRunning(false);
      updateTaskTime(task.id, Math.floor((now - startTime) / 1000)); // Save final elapsed time
    }
  };

  const markComplete = () => {
    stopTimer();
    onComplete();
    setStartTime(null);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (startTime) {
          const now = Date.now();
          setElapsedTime(Math.floor((now - startTime) / 1000)); // Update elapsedTime based on startTime
        }
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, startTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isRunning && startTime) {
        const now = Date.now();
        setElapsedTime(Math.floor((now - startTime) / 1000)); // Update to the current time difference on visibility change
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isRunning, startTime]);

  // Convert estimated time from seconds to minutes, rounded
  const estimatedMinutes = Math.ceil(task.time / 60);

  return (
    <div className="relative my-4 p-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Delete button as a small "X" in the upper right corner */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 focus:outline-none"
        aria-label="Delete task"
      >
        &times;
      </button>

      <p className="text-lg font-bold text-text dark:text-gray-100 mb-1">
        {task.name}
      </p>
      <p className="text-sm text-text-muted dark:text-gray-400 mb-1">
        Est. {estimatedMinutes} minutes
      </p>
      {task.streak > 0 && (
        <p className="text-sm text-text-muted dark:text-gray-400 mb-1">
          Streak: {task.streak} days
        </p>
      )}
      {elapsedTime > 0 && (
        <p className="text-sm text-text-muted dark:text-gray-400 mb-1">
          Elapsed Time: {Math.floor(elapsedTime / 60)}:
          {String(elapsedTime % 60).padStart(2, "0")}
        </p>
      )}

      <div className="flex gap-2 mt-2">
        {!task.completedToday && (
          <>
            {!isRunning ? (
              <button
                onClick={startTimer}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                disabled={isRunning}
              >
                Start
              </button>
            ) : (
              <button
                onClick={stopTimer}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                disabled={!isRunning}
              >
                Stop
              </button>
            )}
          </>
        )}

        <button
          onClick={markComplete}
          className={`px-4 py-2 rounded-lg transition ${
            task.completedToday
              ? "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          }`}
        >
          {task.completedToday ? "Complete! 🎉" : "Mark Complete"}
        </button>
      </div>
    </div>
  );
}
