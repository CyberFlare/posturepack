"use client";

import { useRef } from "react";
import { useGame } from "../context/GameContext";

export default function SensorGate({ children }: { children: React.ReactNode }) {
  const { sensorConnected, level, xp, cap } = useGame();
  const everConnected = useRef(false);
  if (sensorConnected) everConnected.current = true;

  const isReconnecting = !sensorConnected && everConnected.current;

  if (!sensorConnected) {
    return (
      <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-[#fdf8ff]">
        <div className="bg-white border-[3px] border-black window-shadow p-8 flex flex-col items-center gap-5 w-80">
          {/* Title bar */}
          <div
            className={`${isReconnecting ? "bg-[#ffdad6]" : "bg-[#d6d7ff]"} border-b-[3px] border-black -mx-8 -mt-8 px-6 py-2 w-[calc(100%+4rem)] mb-2`}
          >
            <span className="font-black text-xs uppercase tracking-widest">PosturePack OS</span>
          </div>

          <span className="material-symbols-outlined text-5xl animate-pulse">
            {isReconnecting ? "wifi_off" : "sensors"}
          </span>

          <div className="text-center">
            <p className="font-black text-sm uppercase tracking-widest mb-1">
              {isReconnecting ? "Connection Lost" : "Connecting to sensor..."}
            </p>
            <p className="text-[11px] text-black/50 font-bold uppercase tracking-wide">
              {isReconnecting
                ? "Reconnecting to Raspberry Pi..."
                : "Make sure your Raspberry Pi is on and running"}
            </p>
          </div>

          {/* State preserved badge — only shown on reconnect */}
          {isReconnecting && (
            <div className="w-full border-[3px] border-black bg-[#b4f4d8] p-3 flex flex-col gap-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-1">
                Progress saved
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase">LVL {level}</span>
                <span className="text-[10px] font-black text-black/50">
                  {xp} / {cap} XP
                </span>
              </div>
              {/* Mini XP bar */}
              <div className="w-full h-2 border-2 border-black bg-white">
                <div
                  className="h-full bg-[#3a5a4d] transition-all duration-500"
                  style={{ width: `${Math.round((xp / cap) * 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-black border border-black animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
