"use client";

import { useGame } from "../context/GameContext";
import WindowCard from "./WindowCard";

export default function XpBar() {
  const { xp, level, cap } = useGame();
  const progress = Math.round((xp / cap) * 100);

  return (
    <WindowCard title="Progression_Monitor" titleBarColor="bg-[#bfe9ff]">
      <div className="p-4 space-y-3">
        <div className="flex justify-between font-black text-xs uppercase">
          <span>Lvl {level}</span>
          <span>XP: {xp}/{cap}</span>
        </div>
        <div className="h-6 w-full border-[3px] border-black bg-surface-container-low p-1">
          <div
            className="h-full bg-[#d6d7ff] border-r-[3px] border-black relative transition-all duration-500"
            style={{ width: `${progress}%` }}
          >
            {progress > 0 && (
              <div className="absolute inset-0 bg-white/30 h-1/2" />
            )}
          </div>
        </div>
      </div>
    </WindowCard>
  );
}