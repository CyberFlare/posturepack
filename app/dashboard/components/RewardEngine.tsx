"use client";

import { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import { MILESTONE_LEVELS, REWARDS_MANIFEST, RewardEntry, applyTheme } from "../lib/rewards";
import NotificationToast from "./NotificationToast";

export default function RewardEngine() {
  const { level } = useGame();
  const prevLevelRef = useRef(level);

  const [pendingReward, setPendingReward] = useState<RewardEntry | null>(null);
  const [pendingLevel, setPendingLevel] = useState<number | null>(null);

  // Apply initial theme on mount
  useEffect(() => {
    applyTheme(level);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  // Detect level-ups, fire reward + re-theme
  useEffect(() => {
    if (level !== prevLevelRef.current) {
      applyTheme(level);

      if (MILESTONE_LEVELS.includes(level)) {
        setPendingReward(REWARDS_MANIFEST[level]);
        setPendingLevel(level);
      }

      prevLevelRef.current = level;
    }
  }, [level]);

  // Auto-dismiss toast after 3 s
  useEffect(() => {
    if (!pendingReward) return;
    const t = setTimeout(() => {
      setPendingReward(null);
      setPendingLevel(null);
    }, 7000);
    return () => clearTimeout(t);
  }, [pendingReward]);

  const dismiss = () => {
    setPendingReward(null);
    setPendingLevel(null);
  };

  return (
    <>
      {/* CRT scanline overlay — toggled via .crt-mode on <body> in globals.css */}
      <NotificationToast reward={pendingReward} level={pendingLevel} onDismiss={dismiss} />
    </>
  );
}
