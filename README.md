# Task Tapper (or Life Level Up)

Task Tapper, also known as Life Level Up, is a gamified productivity app designed to make daily tasks and goal-tracking more engaging through small, achievable rewards. By incorporating task streaks, points, and badge unlocks, Task Tapper aims to encourage consistent habits and make "adulting" tasks more enjoyable.

## Concept

This app addresses the challenges of daily productivity, especially for users who might struggle with maintaining routines for small tasks. Inspired by the motivational mechanics of apps like Duolingo and Pokémon Go, Task Tapper rewards users for completing tasks and maintaining streaks, unlocking fun badges as they make consistent progress.

### Current Features

- **Task Management**: Users can view and complete daily tasks. Each task is assigned points and maintains its own streak and completion status.
- **Persistent Task Tracking**: Tasks and their completion statuses are saved in `localStorage`, ensuring progress is preserved across sessions.
- **Badges**: Users can earn badges for specific milestones, such as reaching a 3-day streak on a task, completing all tasks in a day, or achieving a high total of points.
- **Points & Streaks**: Tasks have an individual streak count, which resets if a day is missed. Each completed task adds points to the user’s total score, which can unlock achievement badges.

### Future Goals

- **Account System & Data Syncing**: Enable users to create accounts and sync their progress across devices.
- **More Badge Conditions**: Introduce more varied badges, such as a badge for completing specific tasks within a limited time frame.
- **Improved UI/UX**: Add animations and visual feedback to make the app more engaging and polished.
- **Daily Reminders**: Integrate push notifications or reminders to encourage daily task completion.
- **Customizable Task List**: Allow users to add their own custom tasks and define specific goals or habits they want to track.
- **Social Features**: Introduce a friend system or family plan, allowing users to share their progress or even compete for streaks and points.

## Tech Stack

- **Frontend**: Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/), leveraging functional components and hooks.
- **State Management**: Managed using React's `useState` and `useEffect` hooks, with persistent storage in `localStorage`.
- **Deployment**: Hosted on [Vercel](https://vercel.com/) (ideal for Next.js applications).


Contributions are welcome! If you have ideas for new features or improvements, please feel free to open an issue or submit a pull request.