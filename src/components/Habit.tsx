import React, { useState } from "react";

interface HabitProps {
  name: string;
  completed: boolean;
  onUpdate: (newName: string) => void;
  onDelete: () => void;
  onToggleComplete: () => void;
}
const Habit: React.FC<HabitProps> = ({
  name,
  completed,
  onUpdate,
  onDelete,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);

  return (
    <div className="flex item-center justify-between p-4 border rounded-lg shadow-sm bg-white">
      {/*Checkbox to Mark as complete */}
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggleComplete}
        className="mr-2"
      />

      {/*Editable Habit Name */}
      {isEditing ? (
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={() => {
            onUpdate(editName);
            setIsEditing(false);
          }}
          className="border p-1 rounded-md w-full"
        />
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`cursor-pointer ${
            completed ? "line-through text-black-500" : ""
          }`}
        >
          {name}
        </span>
      )}

      {/*Delete Button */}
      <button
        onClick={onDelete}
        className="bg-red-600 text-white px-2 py-1 rounded-md ml-2"
      >
        Delete
      </button>
    </div>
  );
};

export default Habit;
