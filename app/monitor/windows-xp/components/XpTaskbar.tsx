"use client";

import Image from "next/image";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { XP_COLORS } from "../constants";
import type { XpOpenWindow, XpWindowId } from "../types";
import { XpStartButton } from "./XpStartButton";
import { XpStartMenu } from "./XpStartMenu";
import { XpSystemTray } from "./XpSystemTray";

type XpTaskbarProps = {
  isStartMenuOpen: boolean;
  onToggleStartMenu: () => void;
  openWindows: XpOpenWindow[];
  onFocusWindow: (id: XpWindowId) => void;
};

export const XpTaskbar = ({
  isStartMenuOpen,
  onToggleStartMenu,
  openWindows,
  onFocusWindow,
}: XpTaskbarProps) => {
  const handleTaskbarButtonClick = (id: XpWindowId) => {
    onFocusWindow(id);
  };

  const handleTaskbarButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: XpWindowId,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleTaskbarButtonClick(id);
  };

  return (
    <footer
      className="relative z-50 flex h-10 items-stretch border-t border-[#4f86df] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
      style={{ backgroundColor: XP_COLORS.taskbar }}
    >
      <XpStartMenu isOpen={isStartMenuOpen} />
      <XpStartButton isOpen={isStartMenuOpen} onToggle={onToggleStartMenu} />

      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto px-2">
        {openWindows.map((windowItem) => (
          <button
            key={windowItem.id}
            type="button"
            aria-label={`Focus ${windowItem.title}`}
            onClick={() => handleTaskbarButtonClick(windowItem.id)}
            onKeyDown={(event) =>
              handleTaskbarButtonKeyDown(event, windowItem.id)
            }
            className="flex h-7 min-w-[120px] max-w-[220px] items-center gap-2 rounded-sm border border-[#2f63b8] bg-gradient-to-b from-[#4f86df] to-[#245edb] px-2 text-left text-[11px] leading-7 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
          >
            <Image
              src={windowItem.icon}
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
            <span className="truncate">{windowItem.title}</span>
          </button>
        ))}
      </div>

      <div className="relative flex items-center gap-2">
        <div
          className="absolute -left-4 flex h-7 w-7 items-center justify-center rounded-full border border-[#163e7f] bg-gradient-to-br from-[#89aade] to-[#245edb]"
          aria-hidden="true"
        >
          <MdKeyboardArrowLeft className="h-5 w-5 text-white" />
        </div>
        <XpSystemTray />
      </div>
    </footer>
  );
};
