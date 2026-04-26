"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";

export const capForLevel = (level: number) => 20 + (level - 1) * 10;

// How long (ms) a posture check-in counts as "optimal"
const POSTURE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

interface GameState {
  xp: number;
  level: number;
  cap: number;
  sessions: number;
  focusMinutes: number;
  postureCheckins: number;
  isPostureOptimal: boolean;
  addXp: (amount: number) => void;
  addSession: (minutes: number) => void;
  addPostureCheckin: () => void;
}

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ level: 1, xp: 0 });
  const [sessions, setSessions] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [postureCheckins, setPostureCheckins] = useState(0);
  const [isPostureOptimal, setIsPostureOptimal] = useState(false);
  const postureResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addXp = (amount: number) => {
    setState((prev) => {
      let { level, xp } = prev;
      xp = Math.max(0, xp + amount);
      let cap = capForLevel(level);
      while (xp >= cap) {
        xp -= cap;
        level += 1;
        cap = capForLevel(level);
      }
      return { level, xp };
    });
  };

  const addSession = (minutes: number) => {
    setSessions((s) => s + 1);
    setFocusMinutes((m) => m + minutes);
  };

  const addPostureCheckin = () => {
    setPostureCheckins((c) => c + 1);
    setIsPostureOptimal(true);

    // Clear any existing reset timer and start a fresh one
    if (postureResetRef.current) clearTimeout(postureResetRef.current);
    postureResetRef.current = setTimeout(
      () => setIsPostureOptimal(false),
      POSTURE_WINDOW_MS
    );
  };

  return (
    <GameContext.Provider
      value={{
        xp: state.xp,
        level: state.level,
        cap: capForLevel(state.level),
        sessions,
        focusMinutes,
        postureCheckins,
        isPostureOptimal,
        addXp,
        addSession,
        addPostureCheckin,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
