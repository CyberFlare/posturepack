"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";
import { getPostureState } from "./PostureCompanion";

const SLOUCH_COOLDOWN_MS = 5 * 60 * 1000;

export default function SlouchBanner() {
  const { distance } = useGame();
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastShownRef = useRef(0);

  useEffect(() => {
    if (distance === null) return;
    if (getPostureState(distance) !== "slouched") return;
    const now = Date.now();
    if (now - lastShownRef.current < SLOUCH_COOLDOWN_MS) return;
    lastShownRef.current = now;
    setVisible(true);
  }, [distance]);

  useEffect(() => {
    if (visible) {
      const audio = new Audio("/sounds/alert.mp3");
      audio.loop = true;
      audio.play().catch(() => {});
      audioRef.current = audio;
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    }
    return () => { audioRef.current?.pause(); };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="fixed bottom-14 left-4 z-[300] w-72 border-[3px] border-black bg-white"
          style={{ boxShadow: "4px 4px 0 #000" }}
        >
          <div className="bg-[#ffdad6] border-b-[3px] border-black px-3 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff4040] animate-pulse" />
              <span className="font-black text-[10px] uppercase tracking-widest">Posture Alert</span>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="w-5 h-5 border-[2px] border-black bg-white flex items-center justify-center text-[10px] font-black hover:bg-black hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="px-3 py-2.5">
            <p className="text-[11px] font-black uppercase tracking-wide text-black">
              You&apos;re slouching — sit up straight!
            </p>
            <p className="text-[9px] font-bold text-black/40 uppercase tracking-widest mt-1">
              Posture check triggered
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
