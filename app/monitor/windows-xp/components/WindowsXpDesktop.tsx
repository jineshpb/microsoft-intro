"use client";

import { useEffect, useRef, useState } from "react";
import { useXpWindows } from "../hooks/useXpWindows";
import { playXpSound, playXpClickSound, unlockXpAudio } from "../utils/xpAudio";
import type { XpWindowId } from "../types";
import { XpDesktopIcons } from "./XpDesktopIcons";
import { XpTaskbar } from "./XpTaskbar";
import { XpWindowManager } from "./XpWindowManager";

export const WindowsXpDesktop = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const {
    openWindows,
    openWindow,
    closeWindow,
    focusWindow,
    moveWindow,
    relayoutForViewport,
  } = useXpWindows();

  useEffect(() => {
    const desktop = desktopRef.current;

    if (!desktop) {
      return;
    }

    const handleResize = () => {
      relayoutForViewport(desktop.clientWidth, desktop.clientHeight);
    };

    handleResize();

    const observer = new ResizeObserver(handleResize);
    observer.observe(desktop);

    return () => {
      observer.disconnect();
    };
  }, [relayoutForViewport]);

  const handleToggleStartMenu = () => {
    setIsStartMenuOpen((currentValue) => !currentValue);
  };

  const handleCloseStartMenu = () => {
    setIsStartMenuOpen(false);
  };

  const handleStartMenuOpenWindow = (id: XpWindowId) => {
    openWindow(id);
    setIsStartMenuOpen(false);
  };

  const handleMoveWindow = (id: XpWindowId, x: number, y: number) => {
    const desktop = desktopRef.current;

    if (!desktop) {
      moveWindow(id, x, y);
      return;
    }

    moveWindow(id, x, y, {
      width: desktop.clientWidth,
      height: desktop.clientHeight,
    });
  };

  const handleRootPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    unlockXpAudio();
    void playXpSound("startup", { once: true });

    if (
      event.target instanceof Element &&
      event.target.closest("[data-xp-no-click-sound]")
    ) {
      return;
    }

    playXpClickSound();
  };

  return (
    <div
      className="relative flex h-dvh w-full flex-col overflow-hidden font-[Tahoma,Arial,sans-serif]"
      onPointerDown={handleRootPointerDown}
    >
      <div
        ref={desktopRef}
        className="relative min-h-0 flex-1 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/monitor/wall-paper.jpg)" }}
      >
        <XpDesktopIcons onOpenWindow={openWindow} />
        <XpWindowManager
          openWindows={openWindows}
          onCloseWindow={closeWindow}
          onFocusWindow={focusWindow}
          onMoveWindow={handleMoveWindow}
          onOpenWindow={openWindow}
        />
      </div>

      <XpTaskbar
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={handleToggleStartMenu}
        onCloseStartMenu={handleCloseStartMenu}
        onOpenWindow={handleStartMenuOpenWindow}
        openWindows={openWindows}
        onFocusWindow={focusWindow}
      />
    </div>
  );
};
