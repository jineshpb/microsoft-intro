"use client";

import { useState } from "react";
import { useXpWindows } from "../hooks/useXpWindows";
import { XpDesktopIcons } from "./XpDesktopIcons";
import { XpTaskbar } from "./XpTaskbar";
import { XpWindowManager } from "./XpWindowManager";

export const WindowsXpDesktop = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { openWindows, openWindow, closeWindow, focusWindow, moveWindow } =
    useXpWindows();

  const handleToggleStartMenu = () => {
    setIsStartMenuOpen((currentValue) => !currentValue);
  };

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden font-[Tahoma,Arial,sans-serif]">
      <div
        className="relative min-h-0 flex-1 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/monitor/wall-paper.jpg)" }}
      >
        <XpDesktopIcons onOpenWindow={openWindow} />
        <XpWindowManager
          openWindows={openWindows}
          onCloseWindow={closeWindow}
          onFocusWindow={focusWindow}
          onMoveWindow={moveWindow}
          onOpenWindow={openWindow}
        />
      </div>

      <XpTaskbar
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={handleToggleStartMenu}
        openWindows={openWindows}
        onFocusWindow={focusWindow}
      />
    </div>
  );
};
