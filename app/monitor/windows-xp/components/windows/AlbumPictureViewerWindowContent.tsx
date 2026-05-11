"use client";

import Image from "next/image";
import type { XpAlbumPhoto } from "../../content/album";

type AlbumPictureViewerWindowContentProps = {
  photo?: XpAlbumPhoto;
};

const VIEWER_MENU_ITEMS = [
  "File",
  "Edit",
  "View",
  "Help",
] as const;

const VIEWER_TOOLBAR_ITEMS = [
  "Save",
  "Print",
  "Zoom",
  "Actual Size",
  "Next",
  "Previous",
] as const;

export const AlbumPictureViewerWindowContent = ({
  photo,
}: AlbumPictureViewerWindowContentProps) => {
  if (!photo) {
    return (
      <div className="flex h-full items-center justify-center bg-[#808080] p-4 text-center text-[12px] text-white">
        Select a picture from Album to view it here.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#808080]">
      <div className="flex items-center gap-3 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1 text-[11px] text-slate-800">
        {VIEWER_MENU_ITEMS.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1">
        {VIEWER_TOOLBAR_ITEMS.map((item) => (
          <button
            key={item}
            type="button"
            aria-label={item}
            className="rounded-sm border border-[#aca899] bg-gradient-to-b from-[#ffffff] to-[#d4d0c8] px-2 py-0.5 text-[10px] text-slate-800"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="relative min-h-0 flex-1 bg-[#808080] p-4">
        <div className="relative h-full w-full">
          <Image
            src={photo.src}
            alt={photo.label}
            fill
            className="object-contain"
            sizes="480px"
            priority
          />
        </div>
      </div>

      <div className="border-t border-[#aca899] bg-[#ece9d8] px-2 py-1 text-[11px] text-slate-700">
        {photo.filename}
      </div>
    </div>
  );
};
