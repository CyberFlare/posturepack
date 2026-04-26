"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const capForLevel = (level: number) => 20 + (level - 1) * 10;

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

interface GameState {
  xp: number;
  level: number;
  cap: number;
  sessions: number;
  focusMinutes: number;
  postureCheckins: number;
  playerName: string;
  isPostureOptimal: boolean;
  addXp: (amount: number) => void;
  addSession: (minutes: number) => void;
  addPostureCheckin: () => void;
  setPlayerName: (name: string) => void;
  sensorConnected: boolean;
  distance: number | null;
  isGoodPosture: boolean;
}

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(() => load("pp_game", { level: 1, xp: 0 }));
  const [sessions, setSessions] = useState(() => load("pp_sessions", 0));
  const [focusMinutes, setFocusMinutes] = useState(() => load("pp_focus_minutes", 0));
  const [postureCheckins, setPostureCheckins] = useState(() => load("pp_posture_checkins", 0));
  const [playerName, setPlayerNameState] = useState<string>(() => load("pp_player_name", "PLAYER_1"));
  const [sensorConnected, setSensorConnected] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [isGoodPosture, setIsGoodPosture] = useState(true);

  // Persist game state
  useEffect(() => { localStorage.setItem("pp_game", JSON.stringify(state)); }, [state]);
  useEffect(() => { localStorage.setItem("pp_sessions", JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { localStorage.setItem("pp_focus_minutes", JSON.stringify(focusMinutes)); }, [focusMinutes]);
  useEffect(() => { localStorage.setItem("pp_posture_checkins", JSON.stringify(postureCheckins)); }, [postureCheckins]);
  useEffect(() => { localStorage.setItem("pp_player_name", JSON.stringify(playerName)); }, [playerName]);

  // WebSocket sensor connection
  useEffect(() => {
    let ws: WebSocket;
    let cancelled = false;

    function connect() {
      if (cancelled) return;
      ws = new WebSocket("ws://raspberrypi.local:8765");

      let heartbeat: ReturnType<typeof setTimeout>;
      const resetHeartbeat = () => {
        clearTimeout(heartbeat);
        heartbeat = setTimeout(() => ws.close(), 5000);
      };

      ws.onopen = () => setSensorConnected(true);
      ws.onmessage = (event) => {
        resetHeartbeat();
        const { distance: d } = JSON.parse(event.data);
        setDistance(d);
        setIsGoodPosture(d > 10 && d < 35);
      };
      ws.onclose = () => {
        clearTimeout(heartbeat);
        setSensorConnected(false);
        if (!cancelled) setTimeout(connect, 2000);
      };
      ws.onerror = () => {
        clearTimeout(heartbeat);
        setSensorConnected(false);
      };
    }

    connect();
    return () => {
      cancelled = true;
      ws?.close();
    };
  }, []);

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

  const setPlayerName = (name: string) => setPlayerNameState(name);

  return (
    <GameContext.Provider
      value={{
        xp: state.xp,
        level: state.level,
        cap: capForLevel(state.level),
        sessions,
        focusMinutes,
        postureCheckins,
        playerName,
        isPostureOptimal,
        addXp,
        addSession,
        addPostureCheckin,
        setPlayerName,
        sensorConnected,
        distance,
        isGoodPosture,
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
