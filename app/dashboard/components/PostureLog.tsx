"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";
import WindowCard from "./WindowCard";
import PostureCompanion, {
  PERFECT_THRESHOLD,
  SLOUCHED_THRESHOLD,
  getPostureState,
  type PState,
} from "./PostureCompanion";

const XP_PER_CHECKIN = 5;
const MAX_BARS = 6;

const STATE_META: Record<PState, { label: string; color: string; dot: string; bg: string }> = {
  perfect:  { label: "PERFECT",    color: "text-[#3a5a4d]", dot: "bg-[#56cc9d] animate-pulse", bg: "bg-[#b4f4d8]" },
  slouched: { label: "SLOUCHING",  color: "text-[#7a3a00]", dot: "bg-[#ffa040] animate-pulse", bg: "bg-[#ffe0a0]" },
  sleeping: { label: "AFK / IDLE", color: "text-[#555]",    dot: "bg-[#c0c0d0]",               bg: "bg-[#e0e0ec]" },
};

/* Segmented track: three equal zones coloured per state */
const TRACK_ZONES = [
  { label: "Perfect",   color: "#b4f4d8" },
  { label: "Slouching", color: "#ffe0a0" },
  { label: "AFK",       color: "#d0d0e8" },
] as const;

export default function PostureLog() {
  const { addXp, addPostureCheckin, postureCheckins } = useGame();
  const [distance, setDistance] = useState(0);
  const [flash, setFlash]       = useState(false);

  const pState = getPostureState(distance);
  const meta   = STATE_META[pState];

  const handleCheckin = () => {
    addXp(XP_PER_CHECKIN);
    addPostureCheckin();
    setDistance(0);
    setFlash(true);
    setTimeout(() => setFlash(false), 3000);
  };

  const filledBars = Math.min(postureCheckins, MAX_BARS);
  const emptyBars  = MAX_BARS - filledBars;

  return (
    <WindowCard
      title="Posture_Log"
      titleIcon="accessibility_new"
      titleBarColor="bg-[#b4f4d8]"
      bodyColor="#f0fff8"
      className="h-full"
    >
      <div className="p-4 flex flex-col gap-3 h-full">

        {/* ── Scene + status row ── */}
        <div className="flex gap-3 items-stretch">

          {/* PostureCompanion desk scene */}
          <div
            className="w-40 flex-shrink-0 border-[3px] border-black overflow-hidden relative"
            style={{ boxShadow: "4px 4px 0 #000", height: 128, background: "#2a1c48" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={pState}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1,  scale: 1    }}
                exit={{    opacity: 0,  scale: 0.96 }}
                transition={{ duration: 0.22 }}
                style={{ width: "100%", height: "100%" }}
              >
                <PostureCompanion distance={distance} />
              </motion.div>
            </AnimatePresence>

            {/* State badge overlay */}
            <div className={`absolute bottom-0 left-0 right-0 ${meta.bg} border-t-[2px] border-black py-0.5 flex items-center justify-center gap-1.5`}
              style={{ transition: "background 0.3s ease" }}>
              <div className={`w-2 h-2 rounded-full border border-black flex-shrink-0 ${meta.dot}`} />
              <span className={`text-[8px] font-black uppercase tracking-widest ${meta.color}`}
                style={{ transition: "color 0.3s ease" }}>
                {meta.label}
              </span>
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col justify-between flex-1 min-w-0 gap-2">
            {/* Distance readout */}
            <div className="border-[3px] border-black bg-white px-2 py-1.5 flex-1 flex flex-col justify-center"
              style={{ boxShadow: "inset 2px 2px 0 rgba(0,0,0,0.07)" }}>
              <p className="text-[8px] font-black uppercase text-black/40 tracking-widest mb-0.5">
                Distance
              </p>
              <p className="text-2xl font-black leading-none text-black">
                {String(distance).padStart(3, "0")}
                <span className="text-[9px] text-black/30 ml-1">/ 99</span>
              </p>
            </div>

            {/* Threshold legend */}
            <div className="border-[2px] border-black bg-white px-2 py-1.5"
              style={{ boxShadow: "inset 2px 2px 0 rgba(0,0,0,0.05)" }}>
              {[
                { label: `< ${PERFECT_THRESHOLD}`,  tag: "Perfect",   dot: "bg-[#56cc9d]" },
                { label: `< ${SLOUCHED_THRESHOLD}`, tag: "Slouching", dot: "bg-[#ffa040]" },
                { label: `≥ ${SLOUCHED_THRESHOLD}`, tag: "AFK",       dot: "bg-[#c0c0d0]" },
              ].map(({ label, tag, dot }) => (
                <div key={tag} className="flex items-center gap-1.5 mb-0.5 last:mb-0">
                  <div className={`w-1.5 h-1.5 rounded-full border border-black flex-shrink-0 ${dot}`} />
                  <span className="text-[8px] font-black text-black/50 uppercase tracking-wide">
                    {label} — {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Distance meter ── */}
        <div className="border-[3px] border-black bg-white p-2.5"
          style={{ boxShadow: "3px 3px 0 #000" }}>
          <p className="text-[8px] font-black uppercase text-black/50 tracking-widest mb-1.5">
            Distance Meter
          </p>

          {/* Segmented colour track */}
          <div className="relative h-4 flex border-[2px] border-black overflow-hidden mb-1">
            {TRACK_ZONES.map(({ color }, i) => (
              <div key={i} className="flex-1 h-full"
                style={{
                  background: color,
                  borderRight: i < 2 ? "2px solid black" : undefined,
                }} />
            ))}
            {/* Sliding indicator */}
            <div
              className="absolute top-0 bottom-0 w-[3px] bg-black"
              style={{ left: `${distance}%`, transform: "translateX(-50%)", boxShadow: "1px 0 0 white" }}
            />
          </div>

          {/* Zone labels */}
          <div className="flex justify-between text-[7.5px] font-black uppercase text-black/35 tracking-wide mb-1.5">
            {TRACK_ZONES.map(({ label }) => <span key={label}>{label}</span>)}
          </div>

          {/* Range slider */}
          <input
            type="range" min="0" max="99"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full h-1.5 cursor-pointer accent-black"
          />
        </div>

        {/* ── Hourly breakdown ── */}
        <div>
          <p className="text-[8px] font-black uppercase text-black/50 tracking-widest mb-1">
            Hourly Breakdown
          </p>
          <div className="flex items-end gap-1 h-7">
            {Array.from({ length: filledBars }).map((_, i) => (
              <div key={i} className="flex-1 bg-[#3a5a4d] border-2 border-black h-full" />
            ))}
            {Array.from({ length: emptyBars }).map((_, i) => (
              <div key={i} className="flex-1 bg-[#e8e8e8] border-2 border-black/20 h-full" />
            ))}
          </div>
        </div>

        {/* ── Log button ── */}
        <button
          onClick={handleCheckin}
          className={`w-full border-[3px] border-black py-2 text-[10px] font-black uppercase tracking-widest button-shadow transition-colors ${
            flash ? "bg-[#b4f4d8]" : "bg-white hover:bg-[#f0fff8]"
          }`}
        >
          {flash ? `+${XP_PER_CHECKIN} XP — snapping to optimal!` : "Log Good Posture"}
        </button>

      </div>
    </WindowCard>
  );
}
