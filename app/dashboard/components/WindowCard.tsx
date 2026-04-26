import { ReactNode } from "react";

interface WindowCardProps {
  title: string;
  titleIcon?: ReactNode;
  titleBarColor?: string;
  bodyColor?: string;
  dotColors?: [string, string];
  children: ReactNode;
  className?: string;
}

export default function WindowCard({
  title,
  titleIcon,
  titleBarColor = "bg-[#d6d7ff]",
  bodyColor = "#f5f5ff",
  dotColors = ["#FF7DC4", "#97dbff"],
  children,
  className = "",
}: WindowCardProps) {
  return (
    <div
      className={`border-[3px] border-black window-shadow card-decoration relative flex flex-col ${className}`}
      style={{ background: bodyColor }}
    >
      <div
        className={`${titleBarColor} border-b-[3px] border-black px-3 py-2 flex justify-between items-center`}
      >
        <span className="font-bold text-black uppercase text-xs tracking-widest flex items-center gap-2">
          {titleIcon}
          {title}
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className="w-3.5 h-3.5 rounded-full border-2 border-black"
            style={{ background: dotColors[0] }}
          />
          <div
            className="w-3.5 h-3.5 rounded-full border-2 border-black"
            style={{ background: dotColors[1] }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
