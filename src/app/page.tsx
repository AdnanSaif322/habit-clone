"use client";
import { useState, useEffect } from "react";
import { HabitType } from "@/types/habit";
import Habit from "@/components/Habit";

const STORAGE_KEY = "habitkit-habits";

const initialHabits: HabitType[] = [
  {
    id: 1,
    name: "Morning Workout",
    completed: false,
    completions: {
      "2025-02-21": true,
      "2025-02-22": false,
    },
  },
  {
    id: 2,
    name: "Read 10 Pages",
    completed: true,
    completions: {},
  },
  {
    id: 3,
    name: "Drink Water",
    completed: false,
    completions: {},
  },
];

export default function Home() {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    const storedHabits = localStorage.getItem(STORAGE_KEY);
    if (storedHabits) {
      try {
        const parsed = JSON.parse(storedHabits);
        const migrated = parsed.map((habit: any) => ({
          ...habit,
          completions: habit.completions || {},
        }));
        setHabits(migrated);
      } catch (err) {
        console.error("Error parsing stored habits:", err);
        setHabits(initialHabits);
      }
    } else {
      setHabits(initialHabits);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim() === "") return;
    const newHabitObj: HabitType = {
      id: Date.now(),
      name: newHabit,
      completed: false,
      completions: {},
    };
    setHabits((prev) => [...prev, newHabitObj]);
    setNewHabit("");
  };

  const updateHabitName = (id: number, newName: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, name: newName } : habit
      )
    );
  };

  const deleteHabit = (id: number) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const toggleHabitCompletion = (id: number, dateStr: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        const currentStatus = habit.completions[dateStr] ?? false;
        return {
          ...habit,
          completions: {
            ...habit.completions,
            [dateStr]: !currentStatus,
          },
        };
      })
    );
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Habits</h1>
      <div className="flex space-x-2 mb-6 w-full max-w-md">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter a new habit..."
          className="border p-2 rounded-md w-full"
        />
        <button
          onClick={addHabit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-md space-y-4">
        {habits.map((habit) => (
          <Habit
            key={habit.id}
            name={habit.name}
            completed={habit.completed}
            completions={habit.completions}
            onUpdate={(newName) => updateHabitName(habit.id, newName)}
            onDelete={() => deleteHabit(habit.id)}
            onToggleDay={(dateStr) => toggleHabitCompletion(habit.id, dateStr)}
          />
        ))}
      </div>
    </main>
  );
}
