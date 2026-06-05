"use client";

import { useEffect, useState } from "react";

function WindowsLogo() {
  return (
    <svg
      className="taskbar-start-logo"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="6" height="6" fill="#ff0000" />
      <rect x="9" y="1" width="6" height="6" fill="#00ff00" />
      <rect x="1" y="9" width="6" height="6" fill="#0000ff" />
      <rect x="9" y="9" width="6" height="6" fill="#ffff00" />
      <rect x="7" y="1" width="2" height="6" fill="#c00000" />
      <rect x="7" y="9" width="2" height="6" fill="#0000c0" />
    </svg>
  );
}

function formatTime(): string {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  const min = m < 10 ? `0${m}` : `${m}`;
  return `${h12}:${min} ${ampm}`;
}

export default function Taskbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(formatTime());
    const id = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win-taskbar" role="toolbar" aria-label="Desktop taskbar">
      <button
        className="taskbar-start"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Start — scroll to top"
      >
        <WindowsLogo />
        Start
      </button>

      <div className="taskbar-tray">
        <div className="taskbar-clock" aria-label="Current time" aria-live="polite">
          🕒 {time}
        </div>
      </div>
    </div>
  );
}
