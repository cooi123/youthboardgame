"use client";
import {useState} from "react";
import {X, Calendar} from "lucide-react";
import {Announcement} from "@/types/index";
import {Textarea, Input} from "@nextui-org/input";

interface AnnouncementBarProps {
  announcement: Announcement;
  backgroundColor?: string;
  textColor?: string;
  viewOnly?: boolean;
  setAnnouncement: (value: Announcement) => void;
}

export default function AnnouncementBar({
  announcement: {day, message},
  setAnnouncement,
  backgroundColor = "bg-primary",
  textColor = "text-primary-foreground",
  viewOnly = true,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Local state to handle the edits before submitting
  const [editDay, setEditDay] = useState(day);
  const [editMessage, setEditMessage] = useState(message);

  // Handle submission
  const handleSubmit = () => {
    setAnnouncement({
      day: editDay,
      message: editMessage,
    });
  };

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
          {!viewOnly ? (
            // Editable input for day
            <Input
              type="text"
              value={editDay}
              onChange={(e) => setEditDay(e.target.value)}
              className="text-sm font-bold border border-gray-300 rounded p-1"
            />
          ) : (
            // Static display for day in view-only mode
            <span className="text-sm font-bold">Day: {day} </span>
          )}
        </div>

        {!viewOnly ? (
          // Editable textarea for non-view only mode
          <Textarea
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            className="text-sm font-medium mr-4 p-2 border border-gray-300 rounded"
            rows={2}
          />
        ) : (
          // Display the message as static text when in view-only mode
          <p className="text-sm font-medium mr-4">{message}</p>
        )}

        {/* Submit button appears only if not view-only */}
        {!viewOnly && (
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        )}
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
