export interface Task {
  id: number;
  name: string;
  points: number;
  streak: number;
  lastCompletedDate: string | null;
  completedToday: boolean;
  time: number;
  elapsedTime?: number; // Optional to track time spent on task
  isRunning?: boolean; // Optional to check if the timer is running
}

export interface Badge {
  id: number;
  name: string;
  emoji: string;
  description: string;
  isUnlocked: boolean;
  condition?: (
    totalPoints: number,
    streak?: number,
    allTasksCompleted?: boolean
  ) => boolean;
}
