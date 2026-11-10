"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div
      data-testid="notification"
      className={`fixed bottom-4 right-4 z-50 text-white px-4 py-2 rounded shadow-md text-sm ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}
