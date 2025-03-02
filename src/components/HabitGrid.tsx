import React from "react";

interface HabitGridProps {
  completions: { [date: string]: boolean };
  onToggleDay: (dateStr: string) => void;
}

export default function HabitGrid({
  completions,
  onToggleDay,
}: HabitGridProps) {
  //Generate a list for the past 30 days
  const daysArray = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i)); //creates a 30-day window
    return date;
  });

  return (
    <div className="flex space-x-1">
      {daysArray.map((day) => {
        const dateStr = day.toISOString().split("T")[0]; //format:YYY-MM-DD
        const isComplete = completions[dateStr] ?? false;
        return (
          <div
            key={dateStr}
            onClick={() => onToggleDay(dateStr)}
            className={`w-4 h-4 rounded cursor-pointer transition-colors duration-200 ${
              isComplete ? "bg-green-400" : "bg-gray-300 hover:bg-gray-400"
            }`}
            title={dateStr}
          />
        );
      })}
    </div>
  );
}
