import Image from "next/image";
import WindowCard from "./WindowCard";

export default function CompanionCard({ className }: { className?: string }) {
  return (
    <WindowCard
      title="Companion.exe"
      titleIcon="face"
      bodyColor="#f5f5ff"
      className={className}
    >
      <div className="p-3 flex flex-row items-center gap-4">
        <div className="w-2/5 aspect-square border-[3px] border-black bg-[#b4f4d8] relative overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiPd9nOEWkGITWn7TSCBzwd_UWfKt--3W3tzAq8Ko8GRuMvF9cZizveuSHwFqiSVa35qWy_mROw7Kz0d4Uz7Lajw0JEWknBz40M15jihdqGfnTC8vx0sVSsnOX4TemqqNZn-EKOrpXU_Abr6ATmHguu93hsjesrftQZ8IRxVd1SoViTfTnTg8oGehReY9fsORXve1oXyTtYEQUuCxzvQ6DyZ38OdTUo0kd2jIBtaWatJlMubwdsMaCTuUKb6SJK923A__y3yVbNvOd"
            alt="Mochi Mage companion"
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-black uppercase tracking-tighter">
            Mochi Mage
          </h2>
          <p className="text-[10px] font-bold text-[#3a5a4d] mt-1 bg-[#b4f4d8] px-2 py-0.5 border-2 border-black inline-block">
            STATUS: STUDYING HARD ✨
          </p>
        </div>
      </div>
    </WindowCard>
  );
}
