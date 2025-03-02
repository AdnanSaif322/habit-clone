export interface HabitType {
  id: number;
  name: string;
  completed: boolean; // we can keep this for "today's" completion
  completions: {
    [dateString: string]: boolean; // e.g., "2025-02-22": true
  };
}
