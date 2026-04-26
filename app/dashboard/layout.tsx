import { spaceGrotesk } from "@/app/layout";
import { GameProvider } from "./context/GameContext";
import MenuBar from "./components/MenuBar";
import Taskbar from "./components/Taskbar";
import RewardEngine from "./components/RewardEngine";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <div className={`${spaceGrotesk.className} min-h-screen bg-[#f9f9f9] pixel-grid`}>
        <MenuBar />
        {children}
        <Taskbar />
        {/* Reward engine: theme controller + level-up toast portal */}
        <RewardEngine />
      </div>
    </GameProvider>
  );
}
