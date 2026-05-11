"use client";

import Image from "next/image";
import { DESKTOP_ICON_WINDOW_MAP } from "../content/windows";
import { XP_DESKTOP_ICONS } from "../constants";
import type { XpWindowId } from "../types";

type XpDesktopIconsProps = {
  onOpenWindow: (id: XpWindowId) => void;
};

export const XpDesktopIcons = ({ onOpenWindow }: XpDesktopIconsProps) => {
  const handleIconDoubleClick = (iconId: string) => {
    const windowId = DESKTOP_ICON_WINDOW_MAP[iconId];

    if (!windowId) {
      return;
    }

    onOpenWindow(windowId);
  };

  const handleIconKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    iconId: string,
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    handleIconDoubleClick(iconId);
  };

  return (
    <div className="absolute left-3 top-3 z-10 flex flex-col gap-5">
      {XP_DESKTOP_ICONS.map((icon) => (
        <button
          key={icon.id}
          type="button"
          aria-label={`Open ${icon.label}`}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
          onKeyDown={(event) => handleIconKeyDown(event, icon.id)}
          className="flex w-20 flex-col items-center gap-1 border-0 bg-transparent p-0 text-center"
        >
          <Image src={icon.icon} alt="" width={40} height={40} aria-hidden="true" />
          <span className="text-[11px] leading-tight text-white [text-shadow:1px_1px_1px_rgba(0,0,0,0.9)]">
            {icon.label}
          </span>
        </button>
      ))}
    </div>
  );
};
