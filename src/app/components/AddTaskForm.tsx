// components/AddTaskForm.tsx

import { useState } from "react";

interface AddTaskFormProps {
  onAddTask: (name: string, points: number, time: number) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [taskName, setTaskName] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState<number | "">(""); // Start as an empty string for helper text
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddTask = () => {
    if (taskName.trim() && estimatedMinutes !== "") {
      const time = Number(estimatedMinutes) * 60; // Convert minutes to seconds
      let points;

      if (Number(estimatedMinutes) < 10) {
        points = 5; // Easy
      } else if (Number(estimatedMinutes) <= 30) {
        points = 10; // Medium
      } else {
        points = 20; // Hard
      }

      onAddTask(taskName, points, time);
      setTaskName(""); // Reset fields
      setEstimatedMinutes("");
      setIsExpanded(false); // Collapse the form after adding
    }
  };

  return (
    <div className="mb-4">
      {isExpanded ? (
        <div className="flex flex-col md:flex-row items-center gap-2">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task name"
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
          />
          <input
            type="number"
            value={estimatedMinutes}
            onChange={(e) => setEstimatedMinutes(e.target.value ? Number(e.target.value) : "")}
            placeholder="Time in minutes"
            min="1"
            className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
          />
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={handleAddTask}
              className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Add Task
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-full md:w-auto px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add Task
        </button>
      )}
    </div>
  );
}
