"use client";
import { useEffect, useState } from "react";
import Habit from "@/components/Habit";

const STORAGE_KEY = "habitkit-habits";

export default function Home() {
  const [habits, setHabits] = useState<
    { id: number; name: string; completed: boolean }[]
  >([]);
  const [newHabit, setNewHabit] = useState("");

  //Load habits from local storage when the page loads
  useEffect(() => {
    const storedHabits = localStorage.getItem(STORAGE_KEY);
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  //save habits to local storage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

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

  const addHabit = () => {
    if (newHabit.trim() === "") return; //prevents empty habits
    const newHabitObj = { id: Date.now(), name: newHabit, completed: false };
    setHabits([...habits, newHabitObj]);
    setNewHabit(""); //clear input after adding
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3x1 font-bold mb-6">Current Habits</h1>

      {/*input field for new habit */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => {
            setNewHabit(e.target.value);
          }}
          placeholder="Enter new habit.."
          className="border p-2 rounded-md w-full text-black"
        />
        <button
          onClick={addHabit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>

      {/* habit list*/}
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
