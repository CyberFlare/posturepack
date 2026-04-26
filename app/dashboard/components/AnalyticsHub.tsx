"use client";

import { useGame } from "../context/GameContext";
import WindowCard from "./WindowCard";

export default function AnalyticsHub() {
  const { sessions, focusMinutes } = useGame();
  const hasData = sessions > 0;
  const hours = (focusMinutes / 60).toFixed(1);

  return (
    <WindowCard
      title="Analytics_Hub"
      titleIcon="rocket_launch"
      titleBarColor="bg-[#bfe9ff]"
      bodyColor="#eaf6ff"
      className="h-full"
    >
      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="retro-inset bg-white p-2 border-[3px] border-black">
          <p className="text-[9px] font-black uppercase text-black/50">Focus Time</p>
          <p className={`text-xl font-black ${!hasData && "text-black/20"}`}>
            {hasData ? `${hours}h` : "--"}
          </p>
        </div>
        <div className="retro-inset bg-white p-2 border-[3px] border-black">
          <p className="text-[9px] font-black uppercase text-black/50">Sessions</p>
          <p className={`text-xl font-black ${!hasData && "text-black/20"}`}>
            {hasData ? sessions : "--"}
          </p>
        </div>
        <div className="col-span-2">
          <button className="w-full bg-[#d6d7ff] border-[3px] border-black py-2 text-center text-[10px] font-black uppercase tracking-widest button-shadow">
            View Full Report
          </button>
        </div>
      </div>
    </WindowCard>
  );
}
