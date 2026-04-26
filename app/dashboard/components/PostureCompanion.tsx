"use client";

import { motion, AnimatePresence } from "framer-motion";

/* ── Thresholds (exported so PostureLog can use them) ────── */
export const PERFECT_THRESHOLD  = 10;
export const SLOUCHED_THRESHOLD = 30;

export type PState = "perfect" | "slouched" | "sleeping";

export function getPostureState(d: number): PState {
  if (d < PERFECT_THRESHOLD)  return "perfect";
  if (d < SLOUCHED_THRESHOLD) return "slouched";
  return "sleeping";
}

/* ── Palette ─────────────────────────────────────────────── */
const SKIN    = "#fde0c0";
const HAIR    = "#9896c8";
const EAR_IN  = "#e0ccf0";
const HOODIE  = "#e8c890";
const CHAIR_C = "#7060b0";
const DESK_C  = "#c0b0e0";

const SPRING  = { type: "spring" as const, stiffness: 155, damping: 22 };

/* ── ZZZ bubble definitions ──────────────────────────────── */
const ZZZ = [
  { x: 122, baseY: 64, size: 10, delay: 0   },
  { x: 133, baseY: 50, size: 13, delay: 0.6 },
  { x: 143, baseY: 34, size: 16, delay: 1.2 },
];

interface Props { distance: number }

export default function PostureCompanion({ distance }: Props) {
  const pState     = getPostureState(distance);
  const isSlumped  = pState !== "perfect";
  const isSleeping = pState === "sleeping";

  /*
   * When slouching the UPPER BODY group drifts forward/down (toward the desk),
   * and the HEAD group gets an additional drop to simulate neck extension.
   * Both are driven by separate spring animations so they settle at slightly
   * different times, giving a natural sequential droop.
   */
  const bodyDelta = isSlumped ? { x: 6,  y: 4  } : { x: 0, y: 0 };
  const headDelta = isSlumped ? { x: 14, y: 16 } : { x: 0, y: 0 };

  return (
    <motion.div
      style={{ width: "100%", height: "100%" }}
      /* Perfect: gentle float. Sleeping: slow opacity pulse. */
      animate={
        isSleeping  ? { opacity: [0.55, 0.68, 0.55] } :
        !isSlumped   ? { y: [0, -5, 0] } :
        {}
      }
      transition={
        isSleeping ? { duration: 3.6, repeat: Infinity, ease: "easeInOut" } :
        !isSlumped  ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } :
        {}
      }
    >
      <svg
        viewBox="0 0 190 170"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{
          width: "100%",
          height: "100%",
          filter: isSleeping ? "grayscale(100%) brightness(0.75)" : "none",
          transition: "filter 0.4s ease",
        }}
      >
        {/* ── Gradients ── */}
        <defs>
          <linearGradient id="pcWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2a1c48" />
            <stop offset="100%" stopColor="#46337a" />
          </linearGradient>
          <linearGradient id="pcScreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#4848c8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2020a0" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* ── Room ── */}
        <rect width="190" height="170" fill="url(#pcWall)" />
        <rect y="152" width="190" height="18" fill="#1c1234" />
        <line x1="0" y1="152" x2="190" y2="152" stroke="#5040a0" strokeWidth="1" opacity="0.4" />

        {/* ── Monitor ── */}
        <rect x="14" y="78" width="52" height="57" rx="2" fill="#160e30" stroke="black" strokeWidth="2.5" />
        <rect x="17" y="81" width="46" height="47" rx="1" fill="#0a061e" />
        <rect x="17" y="81" width="46" height="47" rx="1" fill="url(#pcScreen)" />
        {/* Fake code lines on screen */}
        {[85, 91, 97, 103, 109, 115, 121].map((y, i) => (
          <rect key={i} x={20} y={y} width={i % 3 === 0 ? 30 : i % 3 === 1 ? 20 : 26}
            height={2.5} rx={0.5} fill="#8080f8" opacity={0.22 + (i % 3) * 0.07} />
        ))}
        {/* Monitor stand */}
        <rect x="34" y="135" width="12" height="6"  rx="1" fill="#1a1030" stroke="black" strokeWidth="1.5" />
        <rect x="27" y="141" width="26" height="4"  rx="1" fill="#1a1030" stroke="black" strokeWidth="1.5" />

        {/* ── Plant ── */}
        <rect x="154" y="122" width="24" height="16" rx="1" fill="#7a5898" stroke="black" strokeWidth="2" />
        <rect x="151" y="119" width="30" height="6"  rx="1" fill="#9068b0" stroke="black" strokeWidth="1.5" />
        <rect x="156" y="125" width="20" height="7"  fill="#3a2640" />
        <path d="M166 122 C158 110 153 97 158 84 C163 97 166 110 166 122 Z"
          fill="#436238" stroke="black" strokeWidth="1.5" />
        <path d="M166 118 C174 106 180 94 176 81 C170 93 166 108 166 118 Z"
          fill="#527248" stroke="black" strokeWidth="1.5" />
        <path d="M163 120 C156 110 154 99 159 89 C162 100 163 112 163 120 Z"
          fill="#365030" stroke="black" strokeWidth="1.2" />

        {/* ── Chair back (visible behind character) ── */}
        <rect x="74" y="90" width="42" height="44" rx="4" fill={CHAIR_C} stroke="black" strokeWidth="2.5" />
        <rect x="78" y="94" width="34" height="36" rx="3" fill="#8070c0" opacity="0.5" />
        <line x1="95" y1="96" x2="95" y2="128"
          stroke="black" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />

        {/* ── Character: lower body (static, behind desk) ── */}
        <rect x="83" y="128" width="24" height="14" rx="3" fill={HOODIE} />

        {/* ── Character: UPPER BODY (spring-shifts forward on slouch) ── */}
        <motion.g animate={bodyDelta} transition={SPRING}>
          {/* Torso / hoodie */}
          <path
            d="M 80 128 Q 77 117 78 105 Q 79 96 84 94
               Q 90 92 95 93 Q 101 92 107 94
               Q 113 96 114 105 Q 115 117 112 128 Z"
            fill={HOODIE} stroke="black" strokeWidth="2"
          />
          {/* Pocket hint */}
          <path d="M 85 115 Q 86 125 95 127 Q 104 125 105 115"
            stroke="#d4b070" strokeWidth="1.2" fill="none" opacity="0.55" strokeLinecap="round" />

          {/* Left arm → hand rests near left side of keyboard */}
          <path d="M 79 104 Q 66 114 60 131" stroke={HOODIE} strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M 79 104 Q 66 114 60 131" stroke="black"  strokeWidth="2"  fill="none" strokeLinecap="round" />
          {/* Right arm → hand rests near right side of keyboard */}
          <path d="M 112 104 Q 125 114 130 131" stroke={HOODIE} strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M 112 104 Q 125 114 130 131" stroke="black"  strokeWidth="2"  fill="none" strokeLinecap="round" />

          {/* Neck */}
          <rect x="90" y="83" width="12" height="13" rx="2" fill={SKIN} />
        </motion.g>

        {/* ── Character: HEAD (extra spring-drop simulates neck extension) ── */}
        <motion.g animate={headDelta} transition={SPRING}>
          {/* Cat ears behind hair */}
          <path d="M 80 71 L 74 52 L 91 68 Z" fill={HAIR} stroke="black" strokeWidth="1.8" />
          <path d="M 81 70 L 77 55 L 90 68 Z" fill={EAR_IN} opacity="0.75" />
          <path d="M 112 71 L 118 52 L 101 68 Z" fill={HAIR} stroke="black" strokeWidth="1.8" />
          <path d="M 111 70 L 115 55 L 102 68 Z" fill={EAR_IN} opacity="0.75" />

          {/* Head */}
          <ellipse cx="96" cy="72" rx="18" ry="17" fill={SKIN} stroke="black" strokeWidth="2" />

          {/* Hair: top dome */}
          <path
            d="M 78 69 Q 77 58 82 51 Q 88 43 96 43 Q 104 43 110 51
               Q 115 58 114 69 Q 110 62 105 60 Q 100 58 96 59
               Q 92 58 87 60 Q 82 62 78 69 Z"
            fill={HAIR} stroke="black" strokeWidth="1.8"
          />
          {/* Hair sides */}
          <path d="M 78 69 Q 74 75 75 85" stroke={HAIR} strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M 78 69 Q 74 75 75 85" stroke="black"  strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 114 69 Q 118 75 117 85" stroke={HAIR} strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M 114 69 Q 118 75 117 85" stroke="black"  strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Bangs */}
          <path d="M 80 67 Q 85 61 90 66 Q 94 61 99 65 Q 103 61 108 65 Q 112 61 114 66"
            stroke={HAIR} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M 80 67 Q 85 61 90 66 Q 94 61 99 65 Q 103 61 108 65 Q 112 61 114 66"
            stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Blush (always) */}
          <ellipse cx="82"  cy="78" rx="5" ry="3" fill="#ffb4c8" opacity="0.45" />
          <ellipse cx="110" cy="78" rx="5" ry="3" fill="#ffb4c8" opacity="0.45" />

          {/* ── Eyes (state-dependent) ── */}
          <AnimatePresence mode="wait">
            {pState === "perfect" ? (
              <motion.g key="eye-p"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}>
                <circle cx="88"  cy="72" r="4.5" fill="black" />
                <circle cx="104" cy="72" r="4.5" fill="black" />
                <circle cx="89.5"  cy="70.5" r="1.6" fill="white" />
                <circle cx="105.5" cy="70.5" r="1.6" fill="white" />
                {/* Upper lashes */}
                <path d="M 83.5 68.5 Q 88 65 92.5 68.5" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M 99.5 68.5 Q 104 65 108.5 68.5" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </motion.g>
            ) : isSleeping ? (
              <motion.g key="eye-s"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}>
                {/* Fully closed arcs */}
                <path d="M 83 72 Q 88 67 93 72" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 99 72 Q 104 67 109 72" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </motion.g>
            ) : (
              <motion.g key="eye-w"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}>
                <circle cx="88"  cy="72" r="4" fill="black" />
                <circle cx="104" cy="72" r="4" fill="black" />
                <circle cx="89"  cy="71" r="1.4" fill="white" />
                <circle cx="105" cy="71" r="1.4" fill="white" />
                {/* Droopy upper lids */}
                <path d="M 83.5 69 Q 88 73.5 92.5 69" stroke={SKIN}    strokeWidth="4"   fill="none" strokeLinecap="round" />
                <path d="M 83.5 69 Q 88 73.5 92.5 69" stroke="black" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M 99.5 69 Q 104 73.5 108.5 69" stroke={SKIN}    strokeWidth="4"   fill="none" strokeLinecap="round" />
                <path d="M 99.5 69 Q 104 73.5 108.5 69" stroke="black" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── Mouth (state-dependent) ── */}
          <AnimatePresence mode="wait">
            {pState === "perfect" ? (
              <motion.path key="mth-p" d="M 88 81 Q 96 88 104 81"
                stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} />
            ) : isSleeping ? (
              <motion.ellipse key="mth-s" cx="96" cy="82" rx="4.5" ry="2.5"
                fill="black" opacity="0.45"
                initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} />
            ) : (
              <motion.path key="mth-w" d="M 88 83 Q 96 80 104 83"
                stroke="black" strokeWidth="2" fill="none" strokeLinecap="round"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }} />
            )}
          </AnimatePresence>
        </motion.g>
        {/* end HEAD GROUP */}

        {/* ── Desk surface (drawn over character lower body) ── */}
        <rect x="14" y="132" width="162" height="14" rx="1" fill={DESK_C} stroke="black" strokeWidth="2.5" />
        {/* Desk top-edge highlight */}
        <rect x="14" y="132" width="162" height="4" rx="1" fill="white" opacity="0.2" />
        {/* Desk legs */}
        <rect x="18"  y="146" width="9" height="20" fill="#a898c8" stroke="black" strokeWidth="2" />
        <rect x="163" y="146" width="9" height="20" fill="#a898c8" stroke="black" strokeWidth="2" />

        {/* ── Keyboard (on desk, drawn on top) ── */}
        <rect x="73" y="133.5" width="86" height="11" rx="2" fill="#d8d0f4" stroke="black" strokeWidth="2" />
        {[136.5, 141].map((y, ri) => (
          Array.from({ length: 7 }).map((_, i) => (
            <rect key={`k${ri}-${i}`} x={76 + i * 11} y={y} width={8} height={2.5} rx={0.5}
              fill="#b0a8d4" opacity="0.65" />
          ))
        ))}

        {/* ── Hands (drawn after desk so they sit ON the surface) ── */}
        <motion.g animate={bodyDelta} transition={SPRING}>
          <ellipse cx="58"  cy="133" rx="7" ry="4" fill={SKIN} stroke="black" strokeWidth="1.5" />
          <ellipse cx="132" cy="133" rx="7" ry="4" fill={SKIN} stroke="black" strokeWidth="1.5" />
        </motion.g>

        {/* ── Perfect: soft room glow ── */}
        <AnimatePresence>
          {pState === "perfect" && (
            <motion.ellipse key="aura"
              cx="96" cy="105" rx="58" ry="50" fill="#b1b2ff"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.06, 0.14, 0.06] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* ── Perfect: sparkles ── */}
        <AnimatePresence>
          {pState === "perfect" && (
            <motion.g key="sparkles"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.45, 1, 0.45] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, repeat: Infinity }}>
              <text x="2"   y="48" fontSize="12">✨</text>
              <text x="158" y="36" fontSize="10">⭐</text>
              <text x="150" y="72" fontSize="9">✦</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── Slouch: sweat drop ── */}
        <AnimatePresence>
          {pState === "slouched" && (
            <motion.g key="sweat">
              <motion.g
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: [0, 10] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.5, ease: "easeIn" }}>
                <ellipse cx="122" cy="58" rx="3.5" ry="5" fill="#97dbff" opacity="0.9" />
                <path d="M 122 53 Q 124.5 56 122 58" stroke="#97dbff" strokeWidth="1.5" fill="none" />
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>

        {/* ── Sleeping: floating Zzz ── */}
        <AnimatePresence>
          {isSleeping && (
            <motion.g key="zzz"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {ZZZ.map(({ x, baseY, size, delay }, i) => (
                <motion.text key={i} x={x} fontSize={size}
                  fontWeight="900" fill="#9898c8" fontFamily="serif"
                  animate={{ opacity: [0, 0.85, 0], y: [baseY, baseY - 13] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeOut" }}>
                  Z
                </motion.text>
              ))}
            </motion.g>
          )}
        </AnimatePresence>

      </svg>
    </motion.div>
  );
}
