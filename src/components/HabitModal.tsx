import React, { ReactNode } from "react";

interface HabitModalProps {
  habitName: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function HabitModal({
  habitName,
  isOpen,
  onClose,
  children,
}: HabitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{habitName} Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
