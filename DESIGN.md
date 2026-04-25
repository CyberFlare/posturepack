---
name: PixelPals Neo-Retro
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#464650'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#777681'
  outline-variant: '#c7c5d2'
  surface-tint: '#56579d'
  primary: '#56579d'
  on-primary: '#ffffff'
  primary-container: '#b1b2ff'
  on-primary-container: '#414286'
  inverse-primary: '#c1c1ff'
  secondary: '#2b6953'
  on-secondary: '#ffffff'
  secondary-container: '#b0f0d4'
  on-secondary-container: '#326f59'
  tertiary: '#3b6476'
  on-tertiary: '#ffffff'
  tertiary-container: '#96bfd4'
  on-tertiary-container: '#244e60'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1dfff'
  primary-fixed-dim: '#c1c1ff'
  on-primary-fixed: '#100f57'
  on-primary-fixed-variant: '#3e3f83'
  secondary-fixed: '#b0f0d4'
  secondary-fixed-dim: '#95d3b9'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#0c513c'
  tertiary-fixed: '#bfe9ff'
  tertiary-fixed-dim: '#a3cce2'
  on-tertiary-fixed: '#001f2a'
  on-tertiary-fixed-variant: '#214c5d'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-timer:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '900'
    lineHeight: '1'
    letterSpacing: -0.05em
  window-title:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.5'
    letterSpacing: 0.1em
  body-bold:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.4'
  micro-label:
    fontFamily: Space Grotesk
    fontSize: 9px
    fontWeight: '900'
    lineHeight: '1'
spacing:
  pixel-unit: 4px
  window-padding: 8px
  margin: 24px
  gutter: 16px
  header-height: 32px
  taskbar-height: 48px
---

## Brand & Style
The brand personality is a playful, nostalgic fusion of 90s computing aesthetics and modern "kawaii" pastel culture. It targets a Gen-Z audience seeking "cozy productivity" through a "gamified OS" interface. 

The design style is **Neo-Brutalist Retro**. It rejects modern softness in favor of hard-edged 3px black borders, high-contrast structural lines, and intentional pixel-art influences. The UI evokes the tactile reliability of early GUI operating systems (Windows 95/classic Mac OS) but softens the emotional impact with a vibrant, candy-coated color palette and whimsical decorative elements like sparkles and hearts.

## Colors
The palette is built on a foundation of "Digital Pastels" grounded by absolute black (#000000) for structural integrity.

- **Primary (Lavender #b1b2ff):** Used for active window headers and primary action highlights.
- **Secondary (Mint #b4f4d8):** Reserved for "success" states, start buttons, and positive progress tracking.
- **Tertiary (Sky #bfe9ff):** Used for utility panels and informational containers.
- **Accent (Blush #ffc2d1):** Highlights "special" features, multipliers, or emotional rewards.
- **Base:** Backgrounds use a very light lilac (#fdf8ff) with a polka-dot grid pattern (#e6e6fa) to reinforce the "canvas" feel.

## Typography
The system uses a two-font pairing to balance technical precision with modern friendliness.

- **Space Grotesk:** The workhorse for the "OS" layer. Used for all headers, buttons, navigation, and technical readouts. It should almost always be set in Bold or Black (700-900 weight) and often utilizes uppercase with increased tracking for a "command line" aesthetic.
- **Be Vietnam Pro:** Used for content-heavy areas and list items where readability is paramount. It provides a softer, human touch against the rigid grid of the interface.

## Layout & Spacing
The layout follows a **Rigid Grid** philosophy, emulating a desktop window manager. 

- **Grid:** A 12-column fluid grid system with 24px gutters.
- **Margins:** 24px outer margins for the main canvas, with a fixed top "Menu Bar" (32px) and bottom "Taskbar" (48px).
- **Rhythm:** All spacing units are multiples of 4px. Component internal padding typically defaults to 16px (p-4).
- **Structure:** Content is housed in "Window Containers" that stack vertically or sit side-by-side. Layout priority is given to the "Focus" area (span 7) vs "Utility" area (span 5).

## Elevation & Depth
Depth is not communicated through light and shadow (Z-axis), but through **Hard Offsets** and **Structural Layering**.

- **Window Shadows:** Objects utilize a 6px x 6px solid black offset (`#000000`). This is a "shadow" in name only; it is a solid geometric block.
- **Button Offsets:** Interactive elements use a smaller 3px x 3px solid black offset.
- **Inset Depth:** For passive "read-only" fields (like status bars or input wells), a 3px inset shadow with low opacity (15%) is used to simulate a "pressed into the screen" effect.
- **Active State:** Clicking an element should result in a `translate(2px, 2px)` movement and the removal of its shadow, simulating physical displacement.

## Shapes
The shape language is strictly **Geometric and Sharp**. 
- **Corners:** 0px radius for all windows, cards, and buttons. 
- **Exceptions:** Icons and specific decorative elements (like progress bar ends) may use a circular "Full" radius (9999px) to provide visual contrast, but structural components must remain square.
- **Borders:** A consistent 3px solid black border is required for all primary containers. Secondary elements (like small tags or internal boxes) use a 2px border.

## Components

- **Windows:** The core container. Must feature a header bar (accent color) with a 3px bottom border, a title on the left, and minimize/close "buttons" (square boxes) on the right.
- **Buttons:** 3px black border, solid background color, and a 3px solid shadow. Text must be uppercase Space Grotesk.
- **Checkboxes:** Custom 20x20px squares with 3px borders. "Checked" state uses a material symbol heart icon in the primary color.
- **Progress Bars:** A "well" with a 3px border and inset shadow. The "fill" is a solid block of color with a 3px right-side border to show progress increment.
- **Taskbar:** A fixed bottom strip featuring a "Start" button (primary color + shadow) and a tray for open applications and system stats.
- **Decorative Elements:** "Mascot Icons" (emojis in 32x32 white boxes) should be pinned to the top-right corners of windows to add brand personality.