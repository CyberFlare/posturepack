"use client";

import { useCallback, useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import WindowCard from "./WindowCard";

type Mode = "pomodoro" | "short" | "long";

const DURATIONS: Record<Mode, number> = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const MODE_LABELS: Record<Mode, string> = {
  pomodoro: "Pomodoro",
  short: "Short Break",
  long: "Long Break",
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
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.pomodoro);
  const [isRunning, setIsRunning] = useState(false);

  const switchMode = useCallback((next: Mode) => {
    setMode(next);
    setTimeLeft(DURATIONS[next]);
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
        addSession(DURATIONS[mode] / 60);
        addXp(5);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

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
            {/* Black border circle + white fill */}
            <div className="absolute inset-0 rounded-full border-[4px] border-black bg-white shadow-[inset_6px_6px_0px_0px_rgba(0,0,0,0.05)]" />
            {/* SVG progress ring */}
            <svg
              className="absolute inset-0 -rotate-90"
              viewBox="0 0 208 208"
              width="208"
              height="208"
            >
              {/* Track */}
              <circle
                cx="104"
                cy="104"
                r={RING_RADIUS}
                fill="none"
                stroke="#b1b2ff"
                strokeWidth="6"
                strokeOpacity="0.25"
              />
              {/* Progress arc */}
              <circle
                cx="104"
                cy="104"
                r={RING_RADIUS}
                fill="none"
                stroke="#b1b2ff"
                strokeWidth="6"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - timeLeft / DURATIONS[mode])}
                style={{ transition: isRunning ? "stroke-dashoffset 1s linear" : "none" }}
              />
            </svg>
            {/* Centered text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[44px] font-black leading-none mb-1 tracking-tighter text-black">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-[9px] font-black text-[#3a5a4d] uppercase tracking-[0.15em] bg-[#b4f4d8] px-1.5 py-0.5 border-2 border-black">
                  {MODE_LABELS[mode]}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-1/2 flex flex-col gap-3 justify-center p-4">
          {/* Mode buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => switchMode("pomodoro")}
              className={`border-[3px] border-black p-2 font-black uppercase text-[9px] button-shadow tracking-widest transition-colors ${mode === "pomodoro" ? "bg-[#d6d7ff]" : "bg-white hover:bg-surface-container-low"}`}
            >
              Pomodoro
            </button>
            <button
              onClick={() => switchMode("short")}
              className={`border-[3px] border-black p-2 font-black uppercase text-[9px] button-shadow tracking-widest transition-colors ${mode === "short" ? "bg-[#d6d7ff]" : "bg-white hover:bg-surface-container-low"}`}
            >
              Short Break
            </button>
            <button
              onClick={() => switchMode("long")}
              className={`border-[3px] border-black p-2 font-black uppercase text-[9px] button-shadow tracking-widest transition-colors ${mode === "long" ? "bg-[#d6d7ff]" : "bg-white hover:bg-surface-container-low"}`}
            >
              Long Break
            </button>
          </div>
          {/* Play / Pause */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setIsRunning(true)}
              disabled={isRunning}
              className="border-[3px] border-black py-3 font-black uppercase text-sm button-shadow tracking-tight transition-colors bg-[#b4f4d8] hover:bg-[#9de4c5] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-base">play_arrow</span>
              Play
            </button>
            <button
              onClick={() => setIsRunning(false)}
              disabled={!isRunning}
              className="border-[3px] border-black py-3 font-black uppercase text-sm button-shadow tracking-tight transition-colors bg-white hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-base">pause</span>
              Pause
            </button>
          </div>
          {/* New Session / Reset */}
          <button
            onClick={() => switchMode(mode)}
            className="w-full border-[3px] border-black py-2 font-black uppercase text-[10px] button-shadow tracking-widest transition-colors bg-white hover:bg-surface-container-low flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            New Session
          </button>
        </div>
      </div>
    </WindowCard>
  );
}
