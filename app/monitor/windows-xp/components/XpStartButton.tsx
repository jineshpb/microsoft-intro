"use client";

import Image from "next/image";

type XpStartButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export const XpStartButton = ({ isOpen, onToggle }: XpStartButtonProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onToggle();
  };

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label="Start"
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={`flex h-10 min-w-[84px] items-center gap-2 rounded-r-full rounded-l-[18px] border border-[#1f5f1f] px-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ${
        isOpen
          ? "bg-gradient-to-b from-[#4f9f4f] to-[#2f6b2f]"
          : "bg-gradient-to-b from-[#5cb85c] to-[#3c873c]"
      }`}
    >
      {/* <XpWindowsLogo /> */}
      <Image
        src="/monitor/xp-logo.png"
        alt="Windows Logo"
        width={20}
        height={20}
      />
      <span className="text-lg font-bold italic text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
        start
      </span>
    </button>
  );
};
