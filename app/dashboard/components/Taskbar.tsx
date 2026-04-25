export default function Taskbar() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t-[3px] border-black px-6 flex items-center z-50">
      <div className="flex items-center gap-4">
        <button className="bg-[#d6d7ff] border-[3px] border-black px-6 py-1 flex items-center gap-3 font-black button-shadow text-sm uppercase tracking-wider">
          <span className="material-symbols-outlined text-xl">apps</span>
          Start
        </button>
        <div className="h-7 w-[3px] bg-black mx-2" />
        <div className="flex gap-2">
          <div className="bg-white border-[3px] border-black px-4 py-1 text-xs font-black flex items-center gap-2 shadow-[inset_2px_2px_0px_0px_white]">
            <span className="material-symbols-outlined text-xs">terminal</span>
            console.log
          </div>
          <div className="bg-white/40 border-[3px] border-black/20 px-4 py-1 text-xs font-black flex items-center gap-2 opacity-50">
            <span className="material-symbols-outlined text-xs">mail</span>
            Inbox (2)
          </div>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-5 text-xs font-black uppercase">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-lg">wifi</span>
          <span className="material-symbols-outlined text-lg">volume_up</span>
        </div>
        <div className="bg-[#b4f4d8] border-[3px] border-black px-4 py-1 shadow-[inset_2px_2px_0px_0px_white]">
          LVL 42 PLAYER_1
        </div>
      </div>
    </footer>
  );
}
