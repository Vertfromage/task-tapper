// components/Badges.tsx
import { Badge, Task } from "./types";
import Link from "next/link";

interface BadgesProps {
  badges: Badge[];
}

// Define badge criteria
// Define badge data without conditions for local storage compatibility
export const badgeData: Omit<Badge, "condition">[] = [
  {
    id: 1,
    name: "First Completion",
    emoji: "🏅",
    description: "Complete any task for the first time.",
    isUnlocked: false,
  },
  {
    id: 2,
    name: "Dedicated",
    emoji: "🏆",
    description: "Complete all tasks in a single day.",
    isUnlocked: false,
  },
  {
    id: 3,
    name: "Streak Starter",
    emoji: "🔥",
    description: "Reach a 3-day streak on any task.",
    isUnlocked: false,
  },
  {
    id: 4,
    name: "High Achiever",
    emoji: "💯",
    description: "Reach 100 total points.",
    isUnlocked: false,
  },
];

// Define conditions separately
export const badgeConditions: Record<number, (tasks: Task[]) => boolean> = {
  // Badge 1: "First Completion" - unlock if any task is completed for the first time
  1: (tasks) => tasks.some((task) => task.completedToday && task.streak === 1),

  // Badge 2: "Dedicated" - unlock if all tasks are completed for the day
  2: (tasks) => tasks.every((task) => task.completedToday),

  // Badge 3: "Streak Starter" - unlock if at least one task has a 3-day streak
  3: (tasks) => tasks.some((task) => task.streak >= 3),

  // Badge 4: "High Achiever" - unlock if total points across tasks reach 100 or more
  4: (tasks) => tasks.reduce((total, task) => total + task.points, 0) >= 100,
};

export default function Badges({ badges }: BadgesProps) {
  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-2xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold">Badges</h3>
        <Link
          href="/badges"
          className="text-sm text-primary hover:text-primary-dark underline"
        >
          See details
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) =>
          badge.isUnlocked ? (
            <span
              key={badge.id}
              className="relative group px-2 py-1 bg-yellow-400 text-black rounded-md shadow-sm cursor-default focus:outline-none"
              tabIndex={0}
            >
              {badge.emoji}
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:flex group-focus:flex px-2 py-1 text-xs text-white bg-black rounded-md whitespace-nowrap shadow-lg">
                {badge.name}
              </span>
            </span>
          ) : null
        )}
      </div>
    </div>
  );
}
