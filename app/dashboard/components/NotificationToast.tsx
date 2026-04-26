"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RewardEntry } from "../lib/rewards";

interface NotificationToastProps {
  reward: RewardEntry | null;
  level: number | null;
  onDismiss: () => void;
}

const TYPE_ICONS: Record<string, string> = {
  theme: "🎨",
  evolution: "⚡",
  overlay: "📺",
};

export default function NotificationToast({ reward, level, onDismiss }: NotificationToastProps) {
  return (
    <AnimatePresence>
      {reward && level !== null && (
        <motion.div
          key={`toast-${level}`}
          initial={{ y: -120, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -140, opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          style={{ position: "fixed", top: 52, left: "50%", translateX: "-50%", zIndex: 9990, pointerEvents: "auto" }}
          className="w-[380px] max-w-[90vw]"
        >
          {/* Window chrome: title bar */}
          <div className="border-[4px] border-black" style={{ boxShadow: "6px 6px 0px 0px #000" }}>
            <div className="bg-[#ffd700] border-b-[4px] border-black px-3 py-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* traffic-light dots */}
                <span className="w-3 h-3 rounded-full bg-[#ff5f57] border-[1.5px] border-black inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e] border-[1.5px] border-black inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#28c840] border-[1.5px] border-black inline-block" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-black">
                SYSTEM_NOTIFICATION.EXE
              </p>
              <button
                onClick={onDismiss}
                className="w-5 h-5 border-[2px] border-black bg-white flex items-center justify-center text-[10px] font-black hover:bg-black hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Window body */}
            <div className="bg-white px-4 py-3 font-mono">
              {/* scan-line shimmer row */}
              <div className="border-b-[2px] border-black mb-3 pb-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-black">
                  C:\POSTUREPACK\SYSTEM&gt;
                </p>
                <p className="text-[11px] font-black text-black mt-0.5">
                  [SYSTEM_NOTIFICATION]: NEW_STUFF_UNLOCKED.EXE
                </p>
              </div>

              {/* reward content */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 border-[3px] border-black bg-[#b1b2ff] flex items-center justify-center text-xl flex-shrink-0"
                  style={{ boxShadow: "2px 2px 0 #000" }}>
                  {TYPE_ICONS[reward.type] ?? "🎁"}
                </div>
                <div>
                  <p className="text-[10px] font-black text-black uppercase tracking-wider">
                    LVL_{level} REWARD
                  </p>
                  <p className="text-[13px] font-black text-black leading-tight mt-0.5">
                    {reward.name}
                  </p>
                  <p className="text-[10px] text-black mt-0.5">
                    {reward.detail}
                  </p>
                </div>
              </div>

              {/* footer bar */}
              <div className="mt-3 pt-2 border-t-[2px] border-black flex items-center justify-between">
                <p className="text-[9px] font-black text-black uppercase tracking-wider">
                  AUTO_CLOSE_IN_7S...
                </p>
                <button
                  onClick={onDismiss}
                  className="px-3 py-1 border-[3px] border-black bg-[#b4f4d8] text-[10px] font-black uppercase tracking-widest hover:bg-[#3a5a4d] hover:text-white transition-colors"
                  style={{ boxShadow: "2px 2px 0 #000" }}
                >
                  [ OK ]
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
