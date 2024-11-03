// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import Badges from "./components/Badges";
import { badgeData, badgeConditions } from "./components/Badges";
import { Badge, Task } from "./components/types";
import { initialTasks } from "./components/initialTasks";
import { isNotToday } from "./components/helpers/time";
import { DarkModeToggle } from "./components/ModeToggle";

export default function Home() {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [pointsToday, setPointsToday] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(
    null
  );
  const [badges, setBadges] = useState<Badge[]>([]);
  // const [newBadge, setNewBadge] = useState<Badge | null>(null);

  const [tasks, setTasks] = useState<Task[]>(initialTasks); // Start with initialTasks

  // Load tasks from localStorage on client, update for today
  useEffect(() => {
    const loadTasks = () => {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "null");
      const savedTotalPoints = JSON.parse(localStorage.getItem("totalPoints") || "0");
      const savedDailyPoints = JSON.parse(localStorage.getItem("pointsToday") || "0");
      let anyToday = false;
    
      const updatedTasks = savedTasks?.map((task: Task) => {
        if (isNotToday(task.lastCompletedDate)) {
          task.completedToday = false;
        } else {
          anyToday = true;
        }
        return task;
      });
    
      if (updatedTasks) setTasks(updatedTasks);
    
      // Check if any tasks were completed today
      if (!anyToday) {
        localStorage.setItem("pointsToday", JSON.stringify(0)); // Store as a string
        setPointsToday(0);
      } else {
        setPointsToday(savedDailyPoints);
      }
    
      // Set total points
      setTotalPoints(savedTotalPoints);
    };
  
    // Load tasks initially
    loadTasks();
  
    // Reload tasks whenever the app regains focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadTasks();
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
  
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Functions for adding and removing tasks
  const addTask = (name: string, points: number, time: number) => {
    const newTask: Task = {
      id: Date.now(),
      name,
      points,
      streak: 0,
      lastCompletedDate: null,
      completedToday: false,
      time,
      elapsedTime: 0,
      isRunning: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    // Load badges from localStorage initially or use default badge data
    const savedBadges =
      JSON.parse(localStorage.getItem("badges") || "null") || badgeData;

    // Evaluate each badge's condition using the updated tasks data
    const updatedBadges = savedBadges.map(
      (badge: Omit<Badge, "condition">): Badge => {
        if (
          badgeConditions[badge.id] &&
          !badge.isUnlocked &&
          badgeConditions[badge.id](tasks)
        ) {
          // setNewBadge(badge); // Trigger popup for this badge
          return { ...badge, isUnlocked: true }; // Unlock the badge
        }

        return badge;
      }
    );

    // Only update `badges` if there's a change to avoid infinite loops
    if (JSON.stringify(updatedBadges) !== JSON.stringify(badges)) {
      setBadges(updatedBadges);
      localStorage.setItem("badges", JSON.stringify(updatedBadges)); // Save updated badges to localStorage
    }
  }, [tasks]); // Depend only on `tasks` to trigger the effect

  const handleTaskComplete = (points: number) => {
    setTotalPoints((prev) => {
      const newTotal = prev + points;
      localStorage.setItem("totalPoints", newTotal.toString());
      return newTotal;
    });
    setPointsToday((prev) => {
      const newPointsToday = prev + points;
      localStorage.setItem("pointsToday", newPointsToday.toString());
      return newPointsToday;
    });
  };

  const handleAllTasksComplete = () => {
    const today = new Date().toISOString().split("T")[0];
    if (lastCompletedDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split("T")[0];
      const newStreak = lastCompletedDate === yesterdayString ? streak + 1 : 1;
      setStreak(newStreak);
      setLastCompletedDate(today);
      localStorage.setItem("streak", newStreak.toString());
      localStorage.setItem("lastCompletedDate", today);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setTotalPoints(0);
    setPointsToday(0);
    setStreak(0);
    setLastCompletedDate(null);
    window.location.reload(); // Refresh the page
  };

  return (
    <main className="p-8 bg-background dark:bg-darkBackground text-foreground dark:text-darkForeground">
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 dark:bg-darkGray p-4 rounded-lg mb-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-display font-semibold text-gray-800 dark:text-gray-100">
            Task Tapper
          </h1>
          <p className="text-sm text-text-muted dark:text-gray-400 italic mt-1">
            Every day is a new day!
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
          <h2 className="text-xl font-semibold text-primary dark:text-blue-300">
            Total Points: {totalPoints}
          </h2>
          <h3 className="text-lg font-semibold text-secondary dark:text-green-300">
            Points Today: {pointsToday}
          </h3>
          <h3 className="text-lg text-text-muted dark:text-gray-400">
            Daily Streak: {streak} {streak === 1 ? "day" : "days"}
          </h3>
        </div>
      </div>

      <Badges badges={badges} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        onComplete={handleTaskComplete}
        onAllTasksComplete={handleAllTasksComplete}
        addTask={addTask}              // Pass addTask function to TaskList
        removeTask={removeTask}         // Pass removeTask function to TaskList
      />

      <button
        onClick={clearLocalStorage}
        className="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark dark:bg-orange-600 dark:hover:bg-orange-500"
      >
        Reset All Progress
      </button>

      <DarkModeToggle />
    </main>
  );
}
