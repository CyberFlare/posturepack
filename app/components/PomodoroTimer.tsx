"use client";

import { useState, useEffect, useRef } from "react";

const DEFAULT_MINUTES = 25;

export default function PomodoroTimer() {
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_MINUTES * 60);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(DEFAULT_MINUTES));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 1;
  const dashOffset = circumference * (1 - progress);

  function handleTimerClick() {
    if (isRunning) return;
    setInputValue(String(Math.floor(totalSeconds / 60)));
    setIsEditing(true);
  }

  function confirmEdit() {
    const mins = parseInt(inputValue, 10);
    if (!isNaN(mins) && mins >= 1 && mins <= 999) {
      const newTotal = mins * 60;
      setTotalSeconds(newTotal);
      setSecondsLeft(newTotal);
    }
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") confirmEdit();
    if (e.key === "Escape") setIsEditing(false);
  }

  function toggleTimer() {
    if (secondsLeft === 0) return;
    setIsRunning((prev) => !prev);
  }

  function reset() {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
  }

  return (
    <div className="flex flex-col items-center">
      {/* Timer ring */}
      <div
        className={`relative flex items-center justify-center mb-6 ${!isRunning ? "cursor-pointer group" : "cursor-default"}`}
        style={{ width: 160, height: 160 }}
        onClick={!isRunning && !isEditing ? handleTimerClick : undefined}
        title={isRunning ? undefined : "Click to change duration"}
      >
        {/* SVG progress arc */}
        <svg
          className="absolute inset-0"
          width="160"
          height="160"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle cx="80" cy="80" r={radius} fill="none" stroke="#e2e2e2" strokeWidth="10" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#b1b2ff"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: isRunning ? "stroke-dashoffset 1s linear" : "none" }}
          />
        </svg>

        {/* Hard border ring */}
        <div className="absolute inset-0 rounded-full border-[8px] border-black pointer-events-none" />

        {/* Display */}
        {isEditing ? (
          <div
            className="flex items-baseline gap-0.5 z-10"
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
              className="font-display text-3xl font-black text-black bg-transparent border-b-[3px] border-black w-14 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="font-display text-lg font-black text-black/50">m</span>
          </div>
        ) : (
          <span className="font-display text-4xl font-black z-10 group-hover:text-[#b1b2ff] transition-colors duration-150 select-none">
            {timeDisplay}
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-3">
        <button
          onClick={toggleTimer}
          disabled={secondsLeft === 0}
          className="bg-[#b1b2ff] border-[3px] border-black px-5 py-1.5 font-black text-sm shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isRunning ? "PAUSE" : "START"}
        </button>
        <button
          onClick={reset}
          className="bg-white border-[3px] border-black px-5 py-1.5 font-black text-sm shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          RESET
        </button>
      </div>

      {!isRunning && !isEditing && (
        <p className="text-[10px] text-black/40 font-black uppercase tracking-widest">
          tap timer to set duration
        </p>
      )}
      {isRunning && (
        <p className="text-[10px] text-[#4a4b8c] font-black uppercase tracking-widest animate-pulse">
          focus mode active
        </p>
      )}
    </div>
  );
}
