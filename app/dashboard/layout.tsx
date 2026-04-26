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
        <div className={`${spaceGrotesk.className} min-h-screen`} style={{ backgroundImage: "url('/pixelBG.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          <MenuBar />
          {children}
          <Taskbar />
        </div>
      </SensorGate>
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
