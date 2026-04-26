"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGame } from "../context/GameContext";

const GITHUB_URL = "https://github.com/CyberFlare/posturepack";

export default function Taskbar() {
  const { level, playerName, setPlayerName } = useGame();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const openPopup = () => {
    setDraft(playerName);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const commit = () => {
    const trimmed = draft.trim();
    if (trimmed) setPlayerName(trimmed.toUpperCase());
    setEditing(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") setEditing(false);
  };

  return (
    <>
      {/* Name edit popup */}
      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" onClick={() => setEditing(false)} />
          <div className="relative bg-white border-[3px] border-black window-shadow p-6 flex flex-col gap-4 w-72">
            <div className="bg-[#b4f4d8] border-b-[3px] border-black -mx-6 -mt-6 px-4 py-2 mb-2">
              <span className="font-black text-xs uppercase tracking-widest">Edit Player Name</span>
            </div>
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKey}
              maxLength={16}
              className="border-[3px] border-black px-3 py-2 font-black text-sm uppercase tracking-wider outline-none w-full"
              placeholder="PLAYER_1"
            />
            <div className="flex gap-3">
              <button
                onClick={commit}
                className="flex-1 bg-[#b4f4d8] border-[3px] border-black py-2 font-black text-xs uppercase tracking-widest button-shadow"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-white border-[3px] border-black py-2 font-black text-xs uppercase tracking-widest button-shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t-[3px] border-black px-6 flex items-center z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="bg-[#d6d7ff] border-[3px] border-black px-6 py-1 flex items-center gap-3 font-black button-shadow text-sm uppercase tracking-wider hover:bg-[#c5c6ff] transition-colors">
            <span className="material-symbols-outlined text-xl">home</span>
            Home
          </Link>
          <div className="h-7 w-[3px] bg-black mx-2" />
          <div className="flex gap-2">
            <Link href="/about" className="bg-white border-[3px] border-black px-4 py-1 text-xs font-black flex items-center gap-2 shadow-[inset_2px_2px_0px_0px_white] hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-xs">group</span>
              About
            </Link>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="bg-white border-[3px] border-black px-4 py-1 text-xs font-black flex items-center gap-2 shadow-[inset_2px_2px_0px_0px_white] hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-xs">terminal</span>
              Github
            </a>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-5 text-xs font-black uppercase">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">star</span>
            <span className="material-symbols-outlined text-lg">volume_up</span>
          </div>
          <button
            onClick={openPopup}
            className="bg-[#b4f4d8] border-[3px] border-black px-4 py-1 shadow-[inset_2px_2px_0px_0px_white] button-shadow hover:bg-[#9de4c5] transition-colors"
          >
            LVL {level} {playerName}
          </button>
        </div>
      </footer>
    </>
  );
}
