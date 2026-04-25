"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = ["FILE", "EDIT", "VIEW", "SYSTEM"];

export default function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="bg-white border-b-2 border-black flex justify-between items-center h-8 px-4 w-full z-50 fixed top-0">
      <div className="flex items-center gap-4">
        <div className="w-5 h-5 bg-[#b1b2ff] border-2 border-black flex items-center justify-center">
          <span
            className="material-symbols-outlined text-xs text-black"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </span>
        </div>
        <div className="flex gap-4 text-xs font-black uppercase tracking-wider">
          <span className="px-2">PIXEL_PALS OS</span>
          {NAV_ITEMS.map((item) => (
            <span
              key={item}
              className="cursor-pointer hover:bg-black hover:text-white px-2 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs font-bold">
        <span className="material-symbols-outlined text-sm">wifi</span>
        <span className="material-symbols-outlined text-sm">battery_full</span>
        <span>{time}</span>
      </div>
    </header>
  );
}
