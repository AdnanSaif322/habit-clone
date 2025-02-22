import React, { useState } from "react";

interface HabitProps {
  name: string;
  completed: boolean;
  onUpdate: (newName: string) => void;
  onDelete: () => void;
}
const Habit: React.FC<HabitProps> = ({
  name,
  completed,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleSave = () => {
    onUpdate(newName);
    setIsEditing(false);
  };

  return (
    <div className="flex item-center justify-between p-4 border rounded-lg shadow-sm bg-white">
      {isEditing ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-1 rounded-md w-full"
        />
      ) : (
        <span
          className={`text-lg ${
            completed ? "line-through text-gray-500" : "text-gray-900"
          }`}
        >
          {name}
        </span>
      )}
      <div className="flex item-center space-x-2">
        {isEditing ? (
          <button onClick={handleSave} className="text-green-500 text-sm">
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 text-sm"
            >
              Edit
            </button>
            <button onClick={onDelete} className="text-red-500">
              Delete
            </button>
          </>
        )}
      </div>
      <input type="checkbox" checked={completed} className="w-5 h-5" />
    </div>
  );
};

export default Habit;
