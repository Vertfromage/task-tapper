// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import Badges from "./components/Badges";
import { badgeData, badgeConditions } from "./components/Badges";
import { Badge, Task } from "./components/types";
import Link from "next/link";
import { initialTasks } from "./components/initialTasks";


export default function Home() {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [pointsToday, setPointsToday] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  // const [newBadge, setNewBadge] = useState<Badge | null>(null);

  const [tasks, setTasks] = useState<Task[]>(initialTasks); // Start with initialTasks

  useEffect(() => {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "null");
      if (savedTasks) setTasks(savedTasks); // Load tasks from localStorage on client
  }, []);
  
  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage whenever they change
  }, [tasks]);

useEffect(() => {
  // Load badges from localStorage initially or use default badge data
  const savedBadges = JSON.parse(localStorage.getItem("badges") || "null") || badgeData;

  // Evaluate each badge's condition using the updated tasks data
  const updatedBadges = savedBadges.map((badge: Omit<Badge, 'condition'>): Badge => {
    if (badgeConditions[badge.id] && !badge.isUnlocked && badgeConditions[badge.id](tasks)) {
        // setNewBadge(badge); // Trigger popup for this badge
        return { ...badge, isUnlocked: true }; // Unlock the badge
    }
    
    return badge;
  });


  // Only update `badges` if there's a change to avoid infinite loops
  if (JSON.stringify(updatedBadges) !== JSON.stringify(badges)) {
      setBadges(updatedBadges);
      localStorage.setItem("badges", JSON.stringify(updatedBadges)); // Save updated badges to localStorage
  }
}, [tasks]); // Depend only on `tasks` to trigger the effect


  const handleTaskComplete = (points: number) => {
    setTotalPoints(prev => {
      const newTotal = prev + points;
      localStorage.setItem("totalPoints", newTotal.toString());
      return newTotal;
    });
    setPointsToday(prev => {
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
    <main style={{ padding: "2rem" }}>
      <h1>Task Tapper</h1>
      <h2>Total Points: {totalPoints}</h2>
      <h3>Points Today: {pointsToday}</h3>
      <h3>
        Daily Streak: {streak} {streak === 1 ? "day" : "days"}
      </h3>
      <Badges badges={badges} />
      <Link href="/badges">
        <button
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          View All Badges
        </button>
      </Link>
      <TaskList
                tasks={tasks}
                setTasks={setTasks}
                onComplete={handleTaskComplete}
                onAllTasksComplete={handleAllTasksComplete}
            />
      <button
        onClick={clearLocalStorage}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Reset All Progress
      </button>
    </main>
  );
}