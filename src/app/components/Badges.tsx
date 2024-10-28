// components/Badges.tsx
import { Badge, Task } from "./types";

interface BadgesProps {
    badges: Badge[];
}

// Define badge criteria
// Define badge data without conditions for local storage compatibility
export const badgeData: Omit<Badge, 'condition'>[] = [
    { id: 1, name: "First Completion", emoji: "🏅", description: "Complete any task for the first time.", isUnlocked: false },
    { id: 2, name: "Dedicated", emoji: "🏆", description: "Complete all tasks in a single day.", isUnlocked: false },
    { id: 3, name: "Streak Starter", emoji: "🔥", description: "Reach a 3-day streak on any task.", isUnlocked: false },
    { id: 4, name: "High Achiever", emoji: "💯", description: "Reach 100 total points.", isUnlocked: false }
];

// Define conditions separately
export const badgeConditions: Record<number, (tasks: Task[]) => boolean> = {
    // Badge 1: "First Completion" - unlock if any task is completed for the first time 
    1: (tasks) => tasks.some(task => task.completedToday && task.streak === 1),  

    // Badge 2: "Dedicated" - unlock if all tasks are completed for the day
    2: (tasks) => tasks.every(task => task.completedToday),

    // Badge 3: "Streak Starter" - unlock if at least one task has a 3-day streak
    3: (tasks) => tasks.some(task => task.streak >= 3),

    // Badge 4: "High Achiever" - unlock if total points across tasks reach 100 or more
    4: (tasks) => tasks.reduce((total, task) => total + task.points, 0) >= 100,
};



export default function Badges({ badges }: BadgesProps) {
    return (
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h3>Badges</h3>
            <div>
                {badges.map((badge) =>
                    badge.isUnlocked ? (
                        <span key={badge.id} style={{ marginRight: '1rem', padding: '0.5rem', backgroundColor: '#FFD700', borderRadius: '4px' }}>
                            {badge.name}
                        </span>
                    ) : null
                )}
            </div>
        </div>
    );
}
