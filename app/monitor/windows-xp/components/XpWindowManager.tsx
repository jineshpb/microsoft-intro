"use client";

import type { XpAlbumPhoto } from "../content/album";
import type { XpCareerStint } from "../content/career";
import type { OpenXpWindowOptions, XpOpenWindow, XpWindowId } from "../types";
import { XpWindow } from "./XpWindow";

type XpWindowManagerProps = {
  openWindows: XpOpenWindow[];
  onCloseWindow: (id: XpWindowId) => void;
  onFocusWindow: (id: XpWindowId) => void;
  onMoveWindow: (id: XpWindowId, x: number, y: number) => void;
  onOpenWindow: (id: XpWindowId, options?: OpenXpWindowOptions) => void;
};

export const XpWindowManager = ({
  openWindows,
  onCloseWindow,
  onFocusWindow,
  onMoveWindow,
  onOpenWindow,
}: XpWindowManagerProps) => {
  const handleOpenAlbumPhoto = (photo: XpAlbumPhoto) => {
    onOpenWindow("album-viewer", {
      viewerPhoto: photo,
      title: `${photo.filename} - Windows Picture and Fax Viewer`,
    });
  };

  const handleOpenCareerStint = (stint: XpCareerStint) => {
    onOpenWindow("career-stint", {
      careerStint: stint,
      title: `${stint.label} - ${stint.volumeName}`,
    });
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {openWindows.map((windowItem) => (
        <XpWindow
          key={windowItem.id}
          windowItem={windowItem}
          onClose={onCloseWindow}
          onFocus={onFocusWindow}
          onMove={onMoveWindow}
          onOpenAlbumPhoto={handleOpenAlbumPhoto}
          onOpenCareerStint={handleOpenCareerStint}
        />
      ))}
    </div>
  );
};
