import { spaceGrotesk } from "@/app/layout";
import { GameProvider } from "./context/GameContext";
import MenuBar from "./components/MenuBar";
import Taskbar from "./components/Taskbar";
import SensorGate from "./components/SensorGate";
import RewardEngine from "./components/RewardEngine";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <SensorGate>
        <div className={`${spaceGrotesk.className} min-h-screen bg-[#f9f9f9] pixel-grid`}>
          <MenuBar />
          {children}
          <Taskbar />
          <RewardEngine />
        </div>
      </SensorGate>
    </GameProvider>
  );
}
