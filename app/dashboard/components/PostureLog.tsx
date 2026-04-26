"use client";

import { useState } from "react";
import { useGame } from "../context/GameContext";
import WindowCard from "./WindowCard";

const XP_PER_CHECKIN = 5;
const MAX_BARS = 6;

export default function PostureLog() {
  const { addXp, addPostureCheckin, postureCheckins } = useGame();
  const [flash, setFlash] = useState(false);

  const handleCheckin = () => {
    addXp(XP_PER_CHECKIN);
    addPostureCheckin();
    setFlash(true);
    setTimeout(() => setFlash(false), 3000);
  };

  const filledBars = Math.min(postureCheckins, MAX_BARS);
  const emptyBars = MAX_BARS - filledBars;

  return (
    <WindowCard
      title="Posture_Log"
      titleIcon="accessibility_new"
      titleBarColor="bg-[#b4f4d8]"
      bodyColor="#f0fff8"
      className="h-full"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`text-2xl font-black tracking-tighter ${postureCheckins > 0 ? "text-[#3a5a4d]" : "text-black/30"}`}>
            {postureCheckins > 0 ? "OPTIMAL" : "NO DATA"}
          </div>
          <div className={`w-3 h-3 rounded-full border-2 border-black ${postureCheckins > 0 ? "bg-[#56cc9d] animate-pulse" : "bg-black/10"}`} />
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase text-black/60 tracking-wider">
            Hourly Breakdown
          </p>
          <div className="flex items-end gap-1 h-12">
            {Array.from({ length: filledBars }).map((_, i) => (
              <div key={i} className="flex-1 bg-[#3a5a4d] border-2 border-black h-full" />
            ))}
            {Array.from({ length: emptyBars }).map((_, i) => (
              <div key={i} className="flex-1 bg-surface-container-low border-2 border-black/20 h-full" />
            ))}
          </div>
        </div>
        <button
          onClick={handleCheckin}
          className={`mt-4 w-full border-[3px] border-black py-1.5 text-[10px] font-black uppercase tracking-widest button-shadow transition-colors ${flash ? "bg-[#b4f4d8]" : "bg-white hover:bg-surface-container-low"}`}
        >
          {flash ? `+${XP_PER_CHECKIN} XP earned!` : "Log Good Posture"}
        </button>
      </div>
    </WindowCard>
  );
}
