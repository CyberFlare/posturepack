"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Wifi, BatteryFull } from "pixelarticons/react";

const NAV_ITEMS = ["BroncoHacks 2026", "MLH"];

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
        <Image src="/favicon.ico" alt="logo" width={22} height={22} style={{ imageRendering: "pixelated" }} />
        <div className="flex gap-4 text-xs font-black uppercase tracking-wider">
          <span className="px-2">DASHBOARD</span>
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
        <Wifi className="w-4 h-4" />
        <BatteryFull className="w-4 h-4" />
        <span>{time}</span>
      </div>
    </header>
  );
}
