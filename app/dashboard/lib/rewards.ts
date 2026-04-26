export type RewardType = "theme" | "evolution" | "overlay";

export interface RewardEntry {
  type: RewardType;
  name: string;
  description: string;
  detail: string;
}

export const REWARDS_MANIFEST: Record<number, RewardEntry> = {
  5: {
    type: "evolution",
    name: "Evolution I — Arcane Hat",
    description: "Mochi Mage has evolved!",
    detail: "Wizard hat unlocked for your companion",
  },
  10: {
    type: "evolution",
    name: "Evolution II — Wizard's Cape",
    description: "Mochi Mage grows more powerful!",
    detail: "A flowing wizard cape adorns Mochi Mage",
  },
  15: {
    type: "evolution",
    name: "Evolution III — Arcane Staff",
    description: "Mochi Mage channels the arcane!",
    detail: "Magic staff + pulsing aura unlocked",
  },
  20: {
    type: "evolution",
    name: "Evolution IV — Grand Arcanist",
    description: "Mochi Mage achieves true mastery!",
    detail: "Grimoires orbit your legendary companion",
  },
  25: {
    type: "evolution",
    name: "Evolution V — Ascendant",
    description: "Mochi Mage has transcended all limits!",
    detail: "Prismatic aura + magical flight unlocked",
  },
};

export const MILESTONE_LEVELS = Object.keys(REWARDS_MANIFEST).map(Number);

// Only accent tokens are swapped — background and foreground are never
// touched so body text always stays black and backgrounds stay readable.
const DEFAULT_PALETTE = {
  "--color-primary": "#b1b2ff",
  "--color-secondary-container": "#b4f4d8",
  "--color-primary-container": "#d6d7ff",
  "--color-surface-tint": "#b1b2ff",
  "--color-on-primary": "#ffffff",
} as const;

// Neon Nights palette — accent colors only
const NEON_PALETTE = {
  "--color-primary": "#c084fc",
  "--color-secondary-container": "#67e8f9",
  "--color-primary-container": "#7c3aed",
  "--color-surface-tint": "#c084fc",
  "--color-on-primary": "#1a0030",
} as const;

export function applyTheme(level: number): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const palette = level >= 5 ? NEON_PALETTE : DEFAULT_PALETTE;

  for (const [prop, value] of Object.entries(palette)) {
    root.style.setProperty(prop, value);
  }

  if (level >= 15) {
    document.body.classList.add("crt-mode");
  } else {
    document.body.classList.remove("crt-mode");
  }
}
