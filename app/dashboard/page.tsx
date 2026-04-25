import AnalyticsHub from "./components/AnalyticsHub";
import CompanionCard from "./components/CompanionCard";
import DailyManifest from "./components/DailyManifest";
import FocusTimer from "./components/FocusTimer";
import PostureLog from "./components/PostureLog";
import XpBar from "./components/XpBar";

export default function DashboardPage() {
  return (
    <main className="h-screen pt-[calc(0.5in+2rem)] pb-[calc(0.5in+3rem)] px-[0.5in] grid grid-cols-12 grid-rows-[1fr_auto] gap-6 w-full">
      {/* Left column: Companion + XP */}
      <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 h-full">
        <CompanionCard className="flex-1" />
        <XpBar />
      </div>

      {/* Right column: Focus Timer + Daily Manifest */}
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 h-full">
        <FocusTimer />
        <DailyManifest />
      </div>

      {/* Bottom row: Posture + Analytics */}
      <div className="col-span-12 md:col-span-6 h-full">
        <PostureLog />
      </div>
      <div className="col-span-12 md:col-span-6 h-full">
        <AnalyticsHub />
      </div>
    </main>
  );
}
