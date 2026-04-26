"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import WindowCard from "./WindowCard";

type Mode = "pomodoro" | "short" | "long" | "custom";

const PRESET: Record<string, number> = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const MODE_LABELS: Record<string, string> = {
  pomodoro: "Pomodoro",
  short: "Short Break",
  long: "Long Break",
  custom: "Custom",
};

const RING_RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function FocusTimer() {
  const { addSession, addXp } = useGame();
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "pomodoro";
    return (localStorage.getItem("pp_timer_mode") as Mode) ?? "pomodoro";
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = (typeof window !== "undefined" ? localStorage.getItem("pp_timer_mode") as Mode : null) ?? "pomodoro";
    return DURATIONS[saved];
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("25");
  const inputRef = useRef<HTMLInputElement>(null);

  const switchMode = useCallback((next: Mode) => {
    localStorage.setItem("pp_timer_mode", next);
    setMode(next);
    setDuration(PRESET[next]);
    setTimeLeft(PRESET[next]);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    let expired = false;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          expired = true;
          return 0;
        }
        return prev - 1;
      });
      if (expired) {
        clearInterval(id);
        setIsRunning(false);
        addSession(duration / 60);
        addXp(5);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    if (isEditing) inputRef.current?.select();
  }, [isEditing]);

  function handleTimerClick() {
    if (isRunning) return;
    setInputValue(String(Math.floor(duration / 60)));
    setIsEditing(true);
  }

  function confirmEdit() {
    const mins = parseInt(inputValue, 10);
    if (!isNaN(mins) && mins >= 1 && mins <= 999) {
      const newDuration = mins * 60;
      setDuration(newDuration);
      setTimeLeft(newDuration);
      setMode("custom");
    }
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") confirmEdit();
    if (e.key === "Escape") setIsEditing(false);
  }

  const progress = duration > 0 ? timeLeft / duration : 1;

  return (
    <WindowCard
      title="Focus_Flow.sys"
      titleIcon="timer"
      titleBarColor="bg-[#d6d7ff]"
      bodyColor="#f5f5ff"
      className="flex-1"
    >
      <div className="p-4 flex flex-row flex-1 justify-center">
        {/* Circular timer display */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="relative w-52 h-52">
            {/* Border + fill */}
            <div className="absolute inset-0 rounded-full border-[4px] border-black bg-white shadow-[inset_6px_6px_0px_0px_rgba(0,0,0,0.05)]" />
            {/* SVG progress ring */}
            <svg
              className="absolute inset-0 -rotate-90"
              viewBox="0 0 208 208"
              width="208"
              height="208"
            >
              <circle
                cx="104" cy="104" r={RING_RADIUS}
                fill="none" stroke="#b1b2ff" strokeWidth="6" strokeOpacity="0.25"
              />
              <circle
                cx="104" cy="104" r={RING_RADIUS}
                fill="none" stroke="#b1b2ff" strokeWidth="6"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
                style={{ transition: isRunning ? "stroke-dashoffset 1s linear" : "none" }}
              />
            </svg>

            {/* Centered content — clickable when not running */}
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-full ${!isRunning ? "cursor-pointer group" : ""}`}
              onClick={!isRunning && !isEditing ? handleTimerClick : undefined}
              title={!isRunning ? "Click to set duration" : undefined}
            >
              <div className="text-center">
                {isEditing ? (
                  <div
                    className="flex items-baseline justify-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      ref={inputRef}
                      type="number"
                      min="1"
                      max="999"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={confirmEdit}
                      onKeyDown={handleKeyDown}
                      className="text-[40px] font-black leading-none tracking-tighter text-black bg-transparent border-b-[3px] border-black w-20 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-xl font-black text-black/50">m</span>
                  </div>
                ) : (
                  <div className="text-[44px] font-black leading-none mb-1 tracking-tighter text-black group-hover:text-[#b1b2ff] transition-colors duration-150">
                    {formatTime(timeLeft)}
                  </div>
                )}
                {!isEditing && (
                  <div className="text-[9px] font-black text-[#3a5a4d] uppercase tracking-[0.15em] bg-[#b4f4d8] px-1.5 py-0.5 border-2 border-black">
                    {MODE_LABELS[mode]}
                  </div>
                )}
                {isEditing && (
                  <div className="text-[9px] font-black text-black/40 uppercase tracking-widest mt-1">
                    enter to confirm
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-1/2 flex flex-col gap-3 justify-center p-4">
          {/* Mode buttons */}
          <div className="grid grid-cols-3 gap-2">
            {(["pomodoro", "short", "long"] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchPreset(m)}
                className={`border-[3px] border-black p-2 font-black uppercase text-[9px] button-shadow tracking-widest transition-colors ${
                  mode === m ? "bg-[#d6d7ff]" : "bg-white hover:bg-[#f3f3f4]"
                }`}
              >
                {m === "pomodoro" ? "Pomodoro" : m === "short" ? "Short Break" : "Long Break"}
              </button>
            ))}
          </div>

          {/* Play / Pause */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsRunning(true)}
              disabled={isRunning || timeLeft === 0}
              className="border-[3px] border-black py-3 font-black uppercase text-sm button-shadow tracking-tight transition-colors bg-[#b4f4d8] hover:bg-[#9de4c5] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-base">play_arrow</span>
              Play
            </button>
            <button
              onClick={() => setIsRunning(false)}
              disabled={!isRunning}
              className="border-[3px] border-black py-3 font-black uppercase text-sm button-shadow tracking-tight transition-colors bg-white hover:bg-[#f3f3f4] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-base">pause</span>
              Pause
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={() => { setTimeLeft(duration); setIsRunning(false); }}
            className="w-full border-[3px] border-black py-2 font-black uppercase text-[10px] button-shadow tracking-widest transition-colors bg-white hover:bg-[#f3f3f4] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            New Session
          </button>

          {!isRunning && (
            <p className="text-[9px] font-black text-black/30 uppercase tracking-widest text-center">
              tap timer to set duration
            </p>
          )}
        </div>
      </div>
    </WindowCard>
  );
}
