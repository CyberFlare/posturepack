"use client";

import { Zap } from "pixelarticons/react";
import { useGame } from "../context/GameContext";
import WindowCard from "./WindowCard";

export default function AnalyticsHub() {
  const { sessions, focusMinutes } = useGame();
  const hasData = sessions > 0;
  const hours = (focusMinutes / 60).toFixed(1);

  return (
    <WindowCard
      title="Analytics_Hub"
      titleIcon={<Zap className="w-4 h-4" />}
      titleBarColor="bg-[#bfe9ff]"
      bodyColor="#eaf6ff"
      className="h-full"
    >
      <div className="p-4 grid grid-cols-2 gap-4 h-full">
        <div className="retro-inset bg-white p-4 border-[3px] border-black flex flex-col justify-between">
          <p className="text-[9px] font-black uppercase text-black/50 tracking-widest">Focus Time</p>
          <p className={`text-5xl font-black leading-none ${!hasData && "text-black/20"}`}>
            {hasData ? `${hours}` : "--"}
          </p>
          <p className="text-[10px] font-black uppercase text-black/30 tracking-widest">hours</p>
        </div>
        <div className="retro-inset bg-white p-4 border-[3px] border-black flex flex-col justify-between">
          <p className="text-[9px] font-black uppercase text-black/50 tracking-widest">Sessions</p>
          <p className={`text-5xl font-black leading-none ${!hasData && "text-black/20"}`}>
            {hasData ? sessions : "--"}
          </p>
          <p className="text-[10px] font-black uppercase text-black/30 tracking-widest">completed</p>
        </div>
      </div>
    </WindowCard>
  );
}
