"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export const capForLevel = (level: number) => 20 + (level - 1) * 10;

interface GameState {
  xp: number;
  level: number;
  cap: number;
  sessions: number;
  focusMinutes: number;
  postureCheckins: number;
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

  const addPostureCheckin = () => setPostureCheckins((c) => c + 1);

  return (
    <GameContext.Provider
      value={{
        xp: state.xp,
        level: state.level,
        cap: capForLevel(state.level),
        sessions,
        focusMinutes,
        postureCheckins,
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
