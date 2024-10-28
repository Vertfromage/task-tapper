export interface Task {
    id: number;
    name: string;
    points: number;
    streak: number;
    lastCompletedDate: string | null;
    completedToday: boolean;
}

export interface Badge {
    id: number;
    name: string;
    emoji: string;
    description: string;
    isUnlocked: boolean;
    condition?: (totalPoints: number, streak?: number, allTasksCompleted?: boolean) => boolean;
}