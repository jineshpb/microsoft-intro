"use client";

import Image from "next/image";
import { useState } from "react";
import { playXpSound } from "../utils/xpAudio";
import type { XpAlbumPhoto } from "../content/album";
import type { XpCareerStint } from "../content/career";
import type { XpOpenWindow, XpWindowId } from "../types";
import { AboutMePdfWindowContent } from "./windows/AboutMePdfWindowContent";
import { AboutMeWindowContent } from "./windows/AboutMeWindowContent";
import { AlbumExplorerWindowContent } from "./windows/AlbumExplorerWindowContent";
import { AlbumPictureViewerWindowContent } from "./windows/AlbumPictureViewerWindowContent";
import { CareerStintWindowContent } from "./windows/CareerStintWindowContent";
import { InternetExplorerWindowContent } from "./windows/InternetExplorerWindowContent";
import { MinesweeperWindowContent } from "./windows/MinesweeperWindowContent";
import { MyComputerWindowContent } from "./windows/MyComputerWindowContent";
import { RecycleBinWindowContent } from "./windows/RecycleBinWindowContent";
import { XpAssistantNote } from "./XpAssistantNote";

type XpWindowProps = {
  windowItem: XpOpenWindow;
  onClose: (id: XpWindowId) => void;
  onFocus: (id: XpWindowId) => void;
  onMove: (id: XpWindowId, x: number, y: number) => void;
  onOpenAlbumPhoto: (photo: XpAlbumPhoto) => void;
  onOpenCareerStint: (stint: XpCareerStint) => void;
};

const renderWindowContent = (
  windowItem: XpOpenWindow,
  onOpenAlbumPhoto: (photo: XpAlbumPhoto) => void,
  onOpenCareerStint: (stint: XpCareerStint) => void,
) => {
  if (windowItem.id === "about-me") {
    return <AboutMeWindowContent />;
  }

  if (windowItem.id === "aboutme-pdf") {
    return <AboutMePdfWindowContent />;
  }

  if (windowItem.id === "album") {
    return <AlbumExplorerWindowContent onOpenPhoto={onOpenAlbumPhoto} />;
  }

  if (windowItem.id === "album-viewer") {
    return <AlbumPictureViewerWindowContent photo={windowItem.viewerPhoto} />;
  }

  if (windowItem.id === "career") {
    return <MyComputerWindowContent onOpenStint={onOpenCareerStint} />;
  }

  if (windowItem.id === "career-stint") {
    return <CareerStintWindowContent stint={windowItem.careerStint} />;
  }

  if (windowItem.id === "minesweeper") {
    return <MinesweeperWindowContent />;
  }

  if (windowItem.id === "recycle-bin") {
    return <RecycleBinWindowContent />;
  }

  return <InternetExplorerWindowContent />;
};

export const XpWindow = ({
  windowItem,
  onClose,
  onFocus,
  onMove,
  onOpenAlbumPhoto,
  onOpenCareerStint,
}: XpWindowProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleClose = () => {
    void playXpSound("minimize", { overlap: true });
    onClose(windowItem.id);
  };

  const handleFocus = () => {
    onFocus(windowItem.id);
  };

  const handleCloseKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleClose();
  };

  const handleTitlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (event.button !== 0) {
      return;
    }

    handleFocus();
    event.preventDefault();

    const pointerId = event.pointerId;
    const startX = event.clientX;
    const startY = event.clientY;
    const originX = windowItem.x;
    const originY = windowItem.y;
    const titleBar = event.currentTarget;

    setIsDragging(true);
    titleBar.setPointerCapture(pointerId);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== pointerId) {
        return;
      }

      onMove(
        windowItem.id,
        originX + (moveEvent.clientX - startX),
        originY + (moveEvent.clientY - startY),
      );
    };

    const handlePointerEnd = (endEvent: PointerEvent) => {
      if (endEvent.pointerId !== pointerId) {
        return;
      }

      setIsDragging(false);
      titleBar.releasePointerCapture(pointerId);
      titleBar.removeEventListener("pointermove", handlePointerMove);
      titleBar.removeEventListener("pointerup", handlePointerEnd);
      titleBar.removeEventListener("pointercancel", handlePointerEnd);
    };

    titleBar.addEventListener("pointermove", handlePointerMove);
    titleBar.addEventListener("pointerup", handlePointerEnd);
    titleBar.addEventListener("pointercancel", handlePointerEnd);
  };

  return (
    <div
      className="pointer-events-auto absolute"
      style={{
        left: windowItem.x,
        top: windowItem.y,
        width: windowItem.width,
        zIndex: windowItem.zIndex,
      }}
      onMouseDown={handleFocus}
    >
      <section
        aria-label={windowItem.title}
        className="flex flex-col overflow-hidden rounded-t-lg border border-[#0a5ec7] bg-[#ece9d8] shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
        style={{
          width: windowItem.width,
          height: windowItem.height,
        }}
      >
        <header
          className={`flex select-none items-center justify-between bg-gradient-to-b from-[#3a8fe7] to-[#1c5fb8] px-2 py-1 text-white ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          <div
            className="flex min-w-0 flex-1 items-center gap-2"
            onPointerDown={handleTitlePointerDown}
          >
            <Image
              src={windowItem.icon}
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            <span className="truncate text-[12px] font-semibold">
              {windowItem.title}
            </span>
          </div>
          <button
            type="button"
            aria-label={`Close ${windowItem.title}`}
            data-xp-no-click-sound
            onClick={handleClose}
            onKeyDown={handleCloseKeyDown}
            className="flex h-5 w-5 shrink-0 cursor-default items-center justify-center rounded-sm border border-[#8f2f2f] bg-gradient-to-b from-[#f4a6a6] to-[#d94b4b] text-[11px] font-bold leading-none text-white"
          >
            X
          </button>
        </header>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-[#0a5ec7]">
          {renderWindowContent(
            windowItem,
            onOpenAlbumPhoto,
            onOpenCareerStint,
          )}
        </div>
      </section>
      {windowItem.id === "internet-explorer" ? <XpAssistantNote /> : null}
    </div>
  );
};
