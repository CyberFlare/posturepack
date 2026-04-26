const cache: Record<string, HTMLAudioElement> = {};

export function playSound(file: string): void {
  if (typeof window === "undefined") return;
  try {
    if (!cache[file]) {
      cache[file] = new Audio(`/sounds/${file}`);
    }
    const audio = cache[file];
    audio.currentTime = 0;
    audio.play().catch((e) => console.warn(`[sound] ${file}:`, e));
  } catch (e) {
    console.warn("[sound] error:", e);
  }
}

// Call once on any user interaction to satisfy the browser autoplay policy
export function unlockAudio(): void {
  Object.values(cache).forEach((a) => {
    a.play().then(() => a.pause()).catch(() => {});
  });
}
