import { spaceGrotesk } from "@/app/layout";
import { GameProvider } from "./context/GameContext";
import MenuBar from "./components/MenuBar";
import Taskbar from "./components/Taskbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <div className={`${spaceGrotesk.className} min-h-screen`} style={{ backgroundImage: "url('/pixelBG.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <MenuBar />
        {children}
        <Taskbar />
      </div>
    </GameProvider>
  );
}
