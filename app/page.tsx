import Image from "next/image";
import Link from "next/link";
import { Trophy, Menu, Heart, HumanArmsUp } from "pixelarticons/react";
import { spaceGrotesk } from "@/app/layout";
import PomodoroTimer from "@/app/components/PomodoroTimer";

export default function Home() {
  return (
    <div className={`${spaceGrotesk.className} bg-[#f9f9f9] text-[#1a1c1c] pixel-grid min-h-screen`}>

      {/* ── Top App Bar ── */}
      <header className="bg-[#b1b2ff] fixed top-0 left-0 w-full z-50 border-b-[3px] border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center h-12 px-4 max-w-[1280px] mx-auto w-full">
          <div className="text-2xl font-black tracking-tighter text-black flex items-center gap-2 font-display">
            <span className="material-symbols-outlined text-black" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            POSTUREPACK
          </div>
          <nav className="hidden md:flex gap-8 items-center font-display font-bold uppercase tracking-tight">
    
            <Link
              href="/dashboard"
              className="bg-[#b4f4d8] border-[3px] border-black px-4 py-1 text-black font-button-text text-button-text shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all duration-75"
            >
              Start Your Journey
            </Link>
          </nav>
          <div className="md:hidden">
            <Menu className="w-9 h-9" />
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 pt-24 pb-20">

        {/* ── HERO Section ── */}
        <section className="mb-16">
          <div className="bg-white border-[3px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] overflow-hidden">
            {/* window chrome */}
            <div className="bg-[#d6d7ff] border-b-[3px] border-black px-4 py-2 flex justify-between items-center">
              <span className="font-window-title text-window-title font-bold uppercase tracking-widest text-[#4a4b8c]">POSTUREPACK.SYS</span>
              <div className="flex gap-2">
                <div className="w-4 h-4 border-2 border-black bg-white" />
                <div className="w-4 h-4 border-2 border-black bg-white" />
                <div className="w-4 h-4 border-2 border-black bg-[#ba1a1a]" />
              </div>
            </div>
            <div className="p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
              {/* copy */}
              <div className="flex-1 space-y-6">
                <h1 className="font-display text-display font-black text-black">
                  FOCUS BETTER WITH A{" "}
                  <span className="text-[#b1b2ff] italic">CUTE COMPANION.</span>
                </h1>
                <p className="text-xl font-body-bold text-[#464650] max-w-xl">
                  Unlock your productivity potential with POSTUREPACK. Gamify your workflow, track your posture, and level up your digital mascot as you conquer your daily goals.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/dashboard"
                    className="bg-[#b4f4d8] border-[3px] border-black px-8 py-4 font-button-text text-button-text font-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#9de4c5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    START YOUR JOURNEY
                  </Link>
                      <a 
                    href="https://youtu.be/XMmiTplPu_I"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white border-[3px] border-black px-8 py-4 font-button-text text-button-text font-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#eeeeee] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-center">
                    WATCH DEMO
                  </a>
                </div>
              </div>
              {/* hero image */}
              <div className="w-full md:w-1/2 relative">
                <div className="absolute -top-6 -right-6 bg-[#bfe9ff] border-[3px] border-black p-2 z-10 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                  <Heart className="w-11 h-11" />
                </div>
                <div className="bg-[#f3f3f4] border-[3px] border-black aspect-square overflow-hidden relative shadow-inner">
                  <Image
                    src="/favicon.ico"
                    alt="PosturePack Icon"
                    fill
                    className="object-contain p-4" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature Grid (FEATURES.SYS) ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

          {/* Focus Flow */}
          <div className="bg-white border-[3px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <div className="bg-[#b4f4d8] border-b-[3px] border-black px-4 py-2 flex justify-between items-center">
              <span className="font-window-title text-window-title font-bold uppercase text-[#2d4a3e]">FOCUS_FLOW.SYS</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 border-2 border-black bg-white" />
                <div className="w-3 h-3 border-2 border-black bg-white" />
              </div>
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <PomodoroTimer />
              <h3 className="font-display text-2xl font-black mb-2">POMODORO POWER</h3>
              <p className="text-[#464650] font-body-bold">Hyper-focused sessions monitored by your digital companion.</p>
            </div>
          </div>

          {/* Posture Guard */}
          <div className="bg-white border-[3px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <div className="bg-[#bfe9ff] border-b-[3px] border-black px-4 py-2 flex justify-between items-center">
              <span className="font-window-title text-window-title font-bold uppercase text-[#586a74]">POSTURE_GUARD.DLL</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 border-2 border-black bg-white" />
                <div className="w-3 h-3 border-2 border-black bg-white" />
              </div>
            </div>
            <div className="p-6 flex flex-col items-center text-center">
              <div className="mb-6 p-4 bg-[#eeeeee] border-[3px] border-black shadow-inner">
                <HumanArmsUp className="w-[66px] h-[66px] text-[#b1b2ff]" />
              </div>
              <div className="bg-[#b4f4d8] border-[3px] border-black px-4 py-1 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <span className="font-status-label text-status-label font-black uppercase">OPTIMAL ALIGNMENT</span>
              </div>
              <h3 className="font-display text-2xl font-black mb-2">LIVE TRACKING</h3>
              <p className="text-[#464650] font-body-bold">AI-powered spinal health checks to keep you standing tall.</p>
            </div>
          </div>

          {/* Level Up */}
          <div className="bg-white border-[3px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
            <div className="bg-[#d6d7ff] border-b-[3px] border-black px-4 py-2 flex justify-between items-center">
              <span className="font-window-title text-window-title font-bold uppercase text-[#4a4b8c]">LEVEL_UP.EXE</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 border-2 border-black bg-white" />
                <div className="w-3 h-3 border-2 border-black bg-white" />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white border-[3px] border-black flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-black" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
                </div>
                <div>
                  <p className="font-status-label text-status-label text-[#b1b2ff]">PLAYER: STRIVER_01</p>
                  <p className="font-display text-xl font-black">LEVEL 24</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-status-label text-status-label font-black">
                  <span>EXP PROGRESS</span>
                  <span>850 / 1000 XP</span>
                </div>
                <div className="h-8 w-full border-[3px] border-black bg-white p-1">
                  <div className="h-full bg-[#b1b2ff] relative overflow-hidden" style={{ width: "85%" }}>
                    <div className="absolute inset-0 xp-shine" />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center text-[#464650] font-body-bold">
                Unlock exclusive pixel cosmetics for your mascot as you level up.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-white w-full border-t-[3px] border-black mt-20">
        <div className="max-w-[1280px] mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8 font-display text-sm font-bold uppercase">
          <div className="font-black text-xl">BRONCOHACKS 2026</div>
          <div className="flex gap-8">
            <a className="text-black/60 hover:text-[#b1b2ff] transition-colors duration-200" href="https://github.com/CyberFlare/posturepack" target="_blank" rel="noopener noreferrer">Github</a>
            <a className="text-black/60 hover:text-[#b1b2ff] transition-colors duration-200" href="https://discord.gg/dbN6c9392M " target="_blank" rel="noopener noreferrer">Discord</a>
          </div>
          <div className="text-black">© 2026 POSTUREPACK</div>
        </div>
      </footer>

    </div>
  );
}
