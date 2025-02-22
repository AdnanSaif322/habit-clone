"use client";
import { useState } from "react";
import Habit from "@/components/Habit";

const initialHabits = [
  { id: 1, name: "code Habit Clone", completed: false },
  { id: 2, name: "Update Wallet App", completed: true },
  { id: 3, name: "Stream", completed: false },
];

export default function Home() {
  const [habits, setHabits] = useState(initialHabits);

  const updateHabitName = (id: number, newName: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, name: newName } : habit
      )
    );
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3x1 font-bold mb-6">Current Habits</h1>
      <div className="w-full max-w-md space-y-4">
        {habits.map((habit) => (
          <Habit
            key={habit.id}
            name={habit.name}
            completed={habit.completed}
            onUpdate={(newName) => updateHabitName(habit.id, newName)}
            onDelete={() => deleteHabit(habit.id)}
          />
        ))}
      </div>
    </main>
  );
}
