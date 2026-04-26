"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MochiMageProps {
  level: number;
  isAwake: boolean;
}

const hasHat      = (l: number) => l >= 5;
const hasCape     = (l: number) => l >= 10;
const hasStaff    = (l: number) => l >= 15;
const hasGrimoire = (l: number) => l >= 20;
const hasFlying   = (l: number) => l >= 25;

/** Generate x/y keyframe arrays tracing one full clockwise orbit. */
function orbitPath(cx: number, cy: number, r: number, startDeg: number, steps = 60) {
  const xs: number[] = [];
  const ys: number[] = [];
  const base = (startDeg * Math.PI) / 180;
  for (let i = 0; i <= steps; i++) {
    const a = base + (i / steps) * 2 * Math.PI;
    xs.push(+(cx + r * Math.sin(a)).toFixed(2));
    ys.push(+(cy - r * Math.cos(a)).toFixed(2));
  }
  return { x: xs, y: ys };
}

const GRIMOIRES = [
  { startAngle: 0,   duration: 9,  color: "#5c1a00", radius: 56 },
  { startAngle: 120, duration: 13, color: "#003020", radius: 60 },
  { startAngle: 240, duration: 7,  color: "#15002e", radius: 52 },
] as const;

const PRISMA_RINGS = [
  { rx: 68, ry: 62, color: "#ff006e", delay: 0   },
  { rx: 62, ry: 56, color: "#8338ec", delay: 0.3 },
  { rx: 56, ry: 50, color: "#3a86ff", delay: 0.6 },
  { rx: 50, ry: 44, color: "#06d6a0", delay: 0.9 },
  { rx: 44, ry: 38, color: "#ffd60a", delay: 1.2 },
] as const;

const PARTICLES = [
  { cx: 52, cy: 150, r: 2.2, color: "#c084fc", delay: 0    },
  { cx: 68, cy: 154, r: 1.8, color: "#ffd700", delay: 0.25 },
  { cx: 60, cy: 157, r: 2.8, color: "#67e8f9", delay: 0.5  },
  { cx: 46, cy: 152, r: 1.5, color: "#ff2d78", delay: 0.75 },
  { cx: 74, cy: 151, r: 2.0, color: "#e0b0ff", delay: 0.1  },
  { cx: 57, cy: 155, r: 1.6, color: "#06d6a0", delay: 0.6  },
] as const;

function GrimoireSVG({ color }: { color: string }) {
  return (
    <g>
      {/* cover */}
      <rect x="-9" y="-11" width="18" height="22" fill={color} stroke="black" strokeWidth="1.5" rx="1.5" />
      {/* spine */}
      <rect x="-9" y="-11" width="5" height="22" fill="rgba(0,0,0,0.4)" rx="1.5" />
      {/* pages edge */}
      <rect x="8.5" y="-10" width="2" height="20" fill="#f5f0dc" opacity="0.9" />
      {/* cover border */}
      <rect x="-3" y="-9" width="11" height="18" fill="none" stroke="#d4a017" strokeWidth="0.9" rx="0.5" />
      {/* medallion */}
      <circle cx="2.5" cy="-1" r="4" fill="none" stroke="#d4a017" strokeWidth="1" />
      <circle cx="2.5" cy="-1" r="1.8" fill="#d4a017" />
      {/* runes */}
      <text x="2.5" y="9" textAnchor="middle" fontSize="5" fill="#d4a017" opacity="0.9" fontFamily="serif">ᚱᚢᚾ</text>
    </g>
  );
}

export default function MochiMage({ level, isAwake }: MochiMageProps) {
  const slumped     = !isAwake;
  const intelligent = hasGrimoire(level);
  const flying      = hasFlying(level);

  const floatAnim  = flying ? { y: [0, -26, -12, -26, 0] } : { y: [0, -7, 0] };
  const floatTrans = flying
    ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
    : { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <motion.div
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
      animate={slumped ? { rotate: 7, y: 6 } : { rotate: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      <motion.div
        style={{ width: "100%", height: "100%" }}
        animate={slumped ? { y: 0 } : floatAnim}
        transition={slumped ? {} : floatTrans}
      >
        <svg
          viewBox="0 0 130 160"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
          style={{
            width: "100%",
            height: "100%",
            filter: slumped ? "brightness(0.65) saturate(0.45)" : "none",
            transition: "filter 0.6s ease",
          }}
        >
          {/* ══════════════════════════════
              LVL 25 — Prismatic aura rings
              ══════════════════════════════ */}
          <AnimatePresence>
            {flying && PRISMA_RINGS.map(({ rx, ry, color, delay }, i) => (
              <motion.ellipse
                key={`prisma-${i}`}
                cx="60" cy="100" rx={rx} ry={ry}
                fill={color} stroke={color} strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.25, 0.06, 0.25, 0], scale: [0.85, 1.1, 1, 1.1, 0.85] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
              />
            ))}
          </AnimatePresence>

          {/* ══════════════════════
              LVL 15 — Staff aura
              ══════════════════════ */}
          <AnimatePresence>
            {hasStaff(level) && !flying && (
              <motion.ellipse
                key="staff-aura"
                cx="60" cy="100" rx="54" ry="50"
                fill="#c084fc"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.15, 0.28, 0.15], scale: [1, 1.06, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          {/* ══════════════════
              LVL 25 — Wings
              ══════════════════ */}
          <AnimatePresence>
            {flying && (
              <motion.g
                key="wings"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 110, damping: 14 }}
                style={{ transformOrigin: "60px 100px" }}
              >
                {/* Wing flap group */}
                <motion.g
                  animate={{ scaleY: [1, 1.2, 0.86, 1.2, 1], scaleX: [1, 0.95, 1.05, 0.95, 1] }}
                  transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "60px 95px" }}
                >
                  {/* ─── Right wing ─── */}
                  {/* outer blade (darkest) */}
                  <path d="M 65 96 C 90 78 120 50 118 36 C 108 52 92 70 72 89 Z"
                    fill="#3b0070" stroke="black" strokeWidth="2" />
                  {/* mid blade */}
                  <path d="M 64 96 C 87 80 116 54 114 40 C 104 56 89 74 69 91 Z"
                    fill="#7c3aed" />
                  {/* inner bright */}
                  <path d="M 63 98 C 84 82 112 58 110 46 C 100 62 86 78 66 93 Z"
                    fill="#ddb4fe" opacity="0.92" />
                  {/* edge shimmer */}
                  <path d="M 65 96 C 90 78 120 50 118 36"
                    stroke="white" strokeWidth="1.2" fill="none" opacity="0.55" strokeLinecap="round" />

                  {/* ─── Left wing ─── */}
                  <path d="M 55 96 C 30 78 0 50 2 36 C 12 52 28 70 48 89 Z"
                    fill="#3b0070" stroke="black" strokeWidth="2" />
                  <path d="M 56 96 C 33 80 4 54 6 40 C 16 56 31 74 51 91 Z"
                    fill="#7c3aed" />
                  <path d="M 57 98 C 36 82 8 58 10 46 C 20 62 34 78 54 93 Z"
                    fill="#ddb4fe" opacity="0.92" />
                  <path d="M 55 96 C 30 78 0 50 2 36"
                    stroke="white" strokeWidth="1.2" fill="none" opacity="0.55" strokeLinecap="round" />
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>

          {/* ═══════════════════════════════════════
              LVL 10 — Cape (two open panels, behind body)
              ═══════════════════════════════════════ */}
          <AnimatePresence>
            {hasCape(level) && (
              <motion.g
                key="cape"
                initial={{ opacity: 0, scaleX: 0.15 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 110, damping: 18 }}
                style={{ transformOrigin: "60px 90px" }}
              >
                {/* ── Left outer panel ── */}
                <path
                  d="M 36 87 C 14 93 2 110 2 155 L 26 155 C 28 132 38 115 48 109 Q 54 114 60 116 L 56 94 Q 46 91 36 87 Z"
                  fill="#4a0080" stroke="black" strokeWidth="2.5"
                />
                {/* left inner lining */}
                <path
                  d="M 36 87 L 56 94 L 60 116 Q 50 114 44 112 C 36 122 26 140 22 155 L 4 155 C 4 110 16 93 36 87 Z"
                  fill="#9333ea" opacity="0.72"
                />
                {/* left fabric crease */}
                <path d="M 12 118 Q 24 138 22 155"
                  stroke="#1e0050" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round" />
                {/* left star */}
                <text x="7" y="142" fontSize="11" fill="#a855f7" opacity="0.6">✦</text>

                {/* ── Right outer panel ── */}
                <path
                  d="M 84 87 C 106 93 118 110 118 155 L 94 155 C 92 132 82 115 72 109 Q 66 114 60 116 L 64 94 Q 74 91 84 87 Z"
                  fill="#4a0080" stroke="black" strokeWidth="2.5"
                />
                {/* right inner lining */}
                <path
                  d="M 84 87 L 64 94 L 60 116 Q 70 114 76 112 C 84 122 94 140 98 155 L 116 155 C 116 110 104 93 84 87 Z"
                  fill="#9333ea" opacity="0.72"
                />
                {/* right fabric crease */}
                <path d="M 108 118 Q 96 138 98 155"
                  stroke="#1e0050" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinecap="round" />
                {/* right star */}
                <text x="103" y="142" fontSize="11" fill="#a855f7" opacity="0.6">✦</text>

                {/* ── Gold clasp ── */}
                <circle cx="60" cy="89" r="6.5" fill="#ffd700" stroke="black" strokeWidth="2" />
                <circle cx="60" cy="89" r="3.5" fill="#ff8c00" />
                <circle cx="60" cy="89" r="1.4" fill="#ffd700" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* ═══════════════════
              LVL 15 — Staff
              ═══════════════════ */}
          <AnimatePresence>
            {hasStaff(level) && (
              <motion.g
                key="staff"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <line x1="97" y1="148" x2="113" y2="28" stroke="#4a1080" strokeWidth="4" strokeLinecap="round" />
                <line x1="97" y1="148" x2="113" y2="28" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" opacity="0.6" />
                <circle cx="114" cy="22" r="11" fill="#7c3aed" stroke="black" strokeWidth="2" />
                <circle cx="114" cy="22" r="6"  fill="#e0b0ff" />
                <circle cx="111" cy="19" r="2.5" fill="white" opacity="0.75" />
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: flying ? 2.5 : 5, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "114px 22px" }}
                >
                  <circle cx="114" cy="10" r="2" fill="#ffd700" />
                  <circle cx="126" cy="22" r="2" fill="#ffd700" />
                  <circle cx="114" cy="34" r="2" fill="#ffd700" />
                  <circle cx="102" cy="22" r="2" fill="#ffd700" />
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>

          {/* ═══════ Robe ═══════ */}
          <path d="M 28 118 Q 18 148 24 153 L 96 153 Q 102 148 92 118 Z"
            fill="#b1b2ff" stroke="black" strokeWidth="2.5" />
          <path d="M 42 120 Q 46 140 44 152"
            stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />

          {/* ═══════ Collar ═══════ */}
          <path d="M 38 112 Q 60 120 82 112 L 76 122 Q 60 128 44 122 Z"
            fill="#d6d7ff" stroke="black" strokeWidth="1.5" />

          {/* ═══════ Mochi body ═══════ */}
          <ellipse cx="60" cy="100" rx="40" ry="38" fill="#fde8ff" stroke="black" strokeWidth="2.5" />

          {/* Cheeks */}
          <circle cx="37" cy="105" r="9" fill="#ffb4c8" opacity="0.45" />
          <circle cx="83" cy="105" r="9" fill="#ffb4c8" opacity="0.45" />

          {/* ═══════ Eyes ═══════ */}
          {slumped ? (
            <>
              <path d="M 44 91 Q 50 87 56 91" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 64 91 Q 70 87 76 91" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="50" cy="93" r="5" fill="black" />
              <circle cx="70" cy="93" r="5" fill="black" />
              <circle cx="52" cy="91" r="1.8" fill="white" />
              <circle cx="72" cy="91" r="1.8" fill="white" />
            </>
          )}

          {/* ═══ LVL 20 — Glasses ═══ */}
          {intelligent && !slumped && (
            <g>
              <circle cx="50" cy="93" r="7.5" fill="none" stroke="#1a0030" strokeWidth="1.8" />
              <circle cx="70" cy="93" r="7.5" fill="none" stroke="#1a0030" strokeWidth="1.8" />
              <line x1="57.5" y1="93" x2="62.5" y2="93" stroke="#1a0030" strokeWidth="1.8" />
              <line x1="42.5" y1="90.5" x2="37"   y2="88.5" stroke="#1a0030" strokeWidth="1.5" />
              <line x1="77.5" y1="90.5" x2="83"   y2="88.5" stroke="#1a0030" strokeWidth="1.5" />
              <circle cx="50" cy="93" r="7" fill="#c084fc" opacity="0.12" />
              <circle cx="70" cy="93" r="7" fill="#c084fc" opacity="0.12" />
            </g>
          )}

          {/* ═══════ Mouth ═══════ */}
          {slumped ? (
            <path d="M 50 110 Q 60 105 70 110" stroke="black" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          ) : intelligent ? (
            <path d="M 50 110 Q 63 117 72 108" stroke="black" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 50 110 Q 60 117 70 110" stroke="black" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          )}

          {/* Idle sparkles (levels 1–14) */}
          {!slumped && !hasStaff(level) && (
            <motion.g
              animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "60px 100px" }}
            >
              <text x="8"  y="72"  fontSize="13" opacity="0.85">✨</text>
              <text x="97" y="65"  fontSize="10" opacity="0.7">⭐</text>
              <text x="5"  y="120" fontSize="9"  opacity="0.6">★</text>
            </motion.g>
          )}

          {/* ═══ LVL 5 — Wizard Hat ═══ */}
          <AnimatePresence>
            {hasHat(level) && (
              <motion.g
                key="hat"
                initial={{ opacity: 0, y: -20, scale: 0.7 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <ellipse cx="60" cy="64" rx="28" ry="7" fill="#4a0080" stroke="black" strokeWidth="2.5" />
                <path d="M 35 64 L 60 16 L 85 64 Z" fill="#6c1fff" stroke="black" strokeWidth="2.5" />
                <path d="M 35 64 L 85 64 L 82 70 L 38 70 Z" fill="#ffd700" stroke="black" strokeWidth="1.5" />
                <path d="M 50 64 L 49 70" stroke="black" strokeWidth="1" opacity="0.3" />
                <path d="M 60 64 L 60 70" stroke="black" strokeWidth="1" opacity="0.3" />
                <path d="M 70 64 L 71 70" stroke="black" strokeWidth="1" opacity="0.3" />
                <motion.polygon
                  points="60,18 62.5,25 70,25 64,30 66.5,37 60,32 53.5,37 56,30 50,25 57.5,25"
                  fill="#ffd700" stroke="black" strokeWidth="1.2"
                  animate={flying ? { opacity: [0.8, 1, 0.8], scale: [1, 1.25, 1] } : {}}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{ transformOrigin: "60px 28px" }}
                />
                <path d="M 74 38 Q 80 32 74 26 Q 82 28 82 38 Z" fill="#c084fc" opacity="0.7" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* ═══════════════════════════════
              LVL 25 — Particle trail (magic wake)
              ═══════════════════════════════ */}
          <AnimatePresence>
            {flying && (
              <motion.g key="particles">
                {PARTICLES.map(({ cx, cy, r, color, delay }, i) => (
                  <motion.circle
                    key={`p-${i}`}
                    cx={cx} cy={cy} r={r}
                    fill={color}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                    animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity, delay, ease: "easeOut" }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* ═══════════════════════════════════════════
              LVL 20 — Orbiting Grimoires (x/y keyframes)
              ═══════════════════════════════════════════ */}
          <AnimatePresence>
            {hasGrimoire(level) && GRIMOIRES.map(({ startAngle, duration, color, radius }, i) => {
              const orbit = orbitPath(60, 100, radius, startAngle);
              const speed = flying ? duration * 0.55 : duration;
              return (
                <motion.g
                  key={`grimoire-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: orbit.x, y: orbit.y }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.5, delay: i * 0.2 },
                    x: { duration: speed, repeat: Infinity, ease: "linear" },
                    y: { duration: speed, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <GrimoireSVG color={color} />
                </motion.g>
              );
            })}
          </AnimatePresence>

        </svg>
      </motion.div>
    </motion.div>
  );
}
