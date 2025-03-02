import React, { useState } from "react";
import HabitGrid from "./HabitGrid";

interface HabitProps {
  name: string;
  completed: boolean;
  completions: { [date: string]: boolean };
  onUpdate: (newName: string) => void;
  onDelete: () => void;
  onToggleDay: (dateStr: string) => void;
}

export default function Habit({
  name,
  completed,
  completions,
  onUpdate,
  onDelete,
  onToggleDay,
}: HabitProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <div className="flex items-center justify-between">
        <div
          onClick={() => setIsEditing(true)}
          className={`cursor-pointer ${
            completed ? "line-through text-gray-400" : ""
          }`}
        >
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => {
                onUpdate(editName);
                setIsEditing(false);
              }}
              className="border p-1 rounded"
            />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <button onClick={onDelete} className="text-red-600 text-sm">
          Delete
        </button>
      </div>
      {/* Habit Grid */}
      <HabitGrid completions={completions} onToggleDay={onToggleDay} />
    </div>
  );
}
