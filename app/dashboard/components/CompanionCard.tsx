"use client";

import { Smile } from "pixelarticons/react";
import WindowCard from "./WindowCard";
import MochiMage from "./MochiMage";
import { useGame } from "../context/GameContext";
import { getPostureState } from "./PostureCompanion";

const STATUS_LABELS: Record<string, string> = {
  optimal: "POSTURE OPTIMAL ✨",
  slumped: "SIT UP, MAGE! 😔",
};

export default function CompanionCard({ className }: { className?: string }) {
  const { level, distance } = useGame();

  const isAwake = getPostureState(distance ?? 0) === "perfect";
  const statusKey = isAwake ? "optimal" : "slumped";

  return (
    <WindowCard
      title="Companion.exe"
      titleIcon={<Smile className="w-5 h-5" />}
      bodyColor="#f5f5ff"
      className={className}
    >
      <div className="p-3 flex flex-row items-center gap-4 h-full">
        {/* Mage display area */}
        <div className="w-2/5 aspect-square border-[3px] border-black bg-[#b4f4d8] relative flex-shrink-0"
          style={{ boxShadow: "4px 4px 0 #000", overflow: "visible" }}>
          <MochiMage level={level} isAwake={isAwake} />
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h2 className="text-xl font-black text-black uppercase tracking-tighter">
            Mochi Mage
          </h2>

          <p
            className={`text-[10px] font-black mt-1 px-2 py-0.5 border-2 border-black inline-block w-fit transition-colors duration-500 ${
              isAwake
                ? "bg-[#b4f4d8] text-[#3a5a4d]"
                : "bg-[#ffc2d1] text-[#7a1a30]"
            }`}
          >
            {STATUS_LABELS[statusKey]}
          </p>

          {/* Level badge */}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[9px] font-black uppercase text-black/50 tracking-wider">
              LVL
            </span>
            <span
              className="text-[22px] font-black leading-none text-black border-b-[3px] border-black"
            >
              {level}
            </span>
          </div>

          {/* Evolution hint */}
          {level < 25 && (
            <p className="text-[9px] font-black text-black/40 uppercase tracking-wider">
              {level < 5
                ? "HAT AT LVL 5"
                : level < 10
                ? "CAPE AT LVL 10"
                : level < 15
                ? "STAFF AT LVL 15"
                : level < 20
                ? "GRIMOIRES AT LVL 20"
                : "ASCEND AT LVL 25"}
            </p>
          )}
          {level >= 25 && (
            <p className="text-[9px] font-black text-[#ff006e] uppercase tracking-wider">
              ASCENDANT ✦
            </p>
          )}
        </div>
      </div>
    </WindowCard>
  );
}
