"use client";

import { useEffect } from "react";
import { unlockAudio } from "@/app/utils/sound";

export default function AudioUnlocker() {
  useEffect(() => {
    const unlock = () => { unlockAudio(); window.removeEventListener("click", unlock); };
    window.addEventListener("click", unlock);
    return () => window.removeEventListener("click", unlock);
  }, []);
  return null;
}
