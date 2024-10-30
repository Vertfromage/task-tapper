// components/Badge.tsx

// components/Badge.tsx

import { Badge } from "./types"; // Import Badge type from types

interface BadgeProps {
  badge: Badge; // Use Badge type directly for consistency
}

export default function BadgeDisplay({ badge }: BadgeProps) {
  return (
    <div
      className={`p-6 rounded-xl text-center w-32 transition-all transform ${
        badge.isUnlocked
          ? "bg-accent text-white shadow-lg dark:bg-orange-500 dark:text-gray-100"
          : "bg-gray-200 text-gray-500 shadow-sm dark:bg-gray-700 dark:text-gray-400"
      }`}
    >
      <div className="text-5xl mb-3">{badge.emoji}</div>
      <h3 className="text-lg font-bold">{badge.name}</h3>
      <p className="text-xs mt-1">
        {badge.isUnlocked ? badge.description : "Locked"}
      </p>
    </div>
  );
}

