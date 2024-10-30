import { useState, useEffect } from "react";
import { Task } from "./types";

interface TaskItemProps {
  task: Task;
  onComplete: () => void;
  updateTaskTime: (taskId: number, elapsedTime: number) => void;
}

export default function TaskItem({
  task,
  onComplete,
  updateTaskTime,
}: TaskItemProps) {
  const [elapsedTime, setElapsedTime] = useState(task.elapsedTime || 0);
  const [isRunning, setIsRunning] = useState(task.isRunning || false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setTimer(setInterval(() => setElapsedTime((prev) => prev + 1), 1000));
    }
  };

  const stopTimer = () => {
    if (isRunning && timer) {
      clearInterval(timer);
      setTimer(null);
      setIsRunning(false);
      updateTaskTime(task.id, elapsedTime); // Save the time on stop
    }
  };

  const markComplete = () => {
    stopTimer();
    onComplete();
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer); // Cleanup timer on unmount
    };
  }, [timer]);

  // Convert estimated time from seconds to minutes, rounded
  const estimatedMinutes = Math.ceil(task.time / 60);
  return (
    <div className="my-4 p-4 border border-gray-300 rounded-lg shadow-sm">
      <p className="text-lg font-bold text-text mb-1">{task.name}</p>
      <p className="text-sm text-text-muted mb-1">Est. {estimatedMinutes} minutes</p>
      {task.streak>0 && <p className="text-sm text-text-muted mb-1">Streak: {task.streak} days</p>}
      {elapsedTime >0 && <p className="text-sm text-text-muted mb-1">
        Elapsed Time: {elapsedTime || 0} seconds
      </p>}

      <div className="flex gap-2">
        {!task.completedToday && (
          <>
            {!isRunning ? <button
              onClick={startTimer}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              disabled={isRunning}
            >
              Start
            </button> :
            <button
              onClick={stopTimer}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              disabled={!isRunning}
            >
              Stop
            </button>}
          </>
        )}

        <button
          onClick={markComplete}
          className={`px-4 py-2 rounded-lg ${
            task.completedToday
              ? "bg-green-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {task.completedToday ? "Complete! 🎉" : "Mark Complete"}
        </button>
      </div>
    </div>
  );
}
