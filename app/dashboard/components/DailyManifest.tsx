"use client";

import { useRef, useState } from "react";
import { useGame } from "../context/GameContext";
import WindowCard from "./WindowCard";

interface Task {
  id: number;
  label: string;
  done: boolean;
}

const XP_PER_TASK = 5;

export default function DailyManifest() {
  const { addXp } = useGame();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const completing = !task.done;
    addXp(completing ? XP_PER_TASK : -XP_PER_TASK);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: completing } : t))
    );
    if (completing) {
      setTimeout(() => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    }
  };

  const startAdding = () => {
    setIsAdding(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const commitTask = () => {
    const label = draft.trim();
    if (label) {
      setTasks((prev) => [...prev, { id: Date.now(), label, done: false }]);
    }
    setDraft("");
    setIsAdding(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") commitTask();
    if (e.key === "Escape") {
      setDraft("");
      setIsAdding(false);
    }
  };

  return (
    <WindowCard
      title="Daily_Manifest"
      titleIcon="checklist"
      titleBarColor="bg-[#ffc2d1]"
      bodyColor="#fff5f8"
    >
      <ul className="p-4 space-y-3 overflow-y-auto max-h-44 custom-scrollbar">
        {/* Add task row — always pinned at top */}
        <li className="flex items-center gap-3">
          <div className="w-5 h-5 border-[3px] border-black bg-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[10px]">add</span>
          </div>
          {isAdding ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitTask}
              onKeyDown={handleKey}
              className="text-xs font-bold bg-transparent outline-none border-b-2 border-black flex-1 placeholder:opacity-40"
              placeholder="New task..."
            />
          ) : (
            <span
              onClick={startAdding}
              className="text-xs font-bold opacity-40 hover:opacity-70 transition-opacity cursor-pointer select-none italic"
            >
              Add a task...
            </span>
          )}
        </li>

        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggle(task.id)}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div
              className={`w-5 h-5 border-[3px] border-black flex items-center justify-center shrink-0 transition-colors ${task.done ? "bg-[#b4f4d8]" : "bg-white"}`}
            >
              {task.done && (
                <span
                  className="material-symbols-outlined text-[10px] font-black"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
              )}
            </div>
            <span
              className={`text-xs font-bold transition-opacity ${task.done ? "line-through opacity-40" : ""}`}
            >
              {task.label}
            </span>
          </li>
        ))}
      </ul>
    </WindowCard>
  );
}
