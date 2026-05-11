"use client";

import Image from "next/image";
import {
  XP_PICTURE_VIEWER_MENU_ITEMS,
  XP_PICTURE_VIEWER_NAVBAR_ITEMS,
} from "../../constants";
import type { XpAlbumPhoto } from "../../content/album";
import {
  XpExplorerMenuBar,
  XpExplorerNavBar,
  XpWindowContainer,
} from "../XpExplorerChrome";

type AlbumPictureViewerWindowContentProps = {
  photo?: XpAlbumPhoto;
};

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
    <XpWindowContainer className="bg-[#808080]">
      <XpExplorerMenuBar items={XP_PICTURE_VIEWER_MENU_ITEMS} />
      <XpExplorerNavBar items={XP_PICTURE_VIEWER_NAVBAR_ITEMS} />
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
    </XpWindowContainer>
  );
};
