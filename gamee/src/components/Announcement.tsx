"use client";
import {useState} from "react";
import {X, Calendar} from "lucide-react";

interface AnnouncementBarProps {
  message: string;
  day: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function AnnouncementBar({
  message,
  day,
  backgroundColor = "bg-primary",
  textColor = "text-primary-foreground",
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={`${backgroundColor} ${textColor} px-4 py-3 text-center relative`}
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-bold">Day: {day} </span>
        </div>
        <p className="text-sm font-medium mr-4">{message}</p>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-primary-foreground/10 transition-colors duration-200"
        aria-label="Close announcement"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
