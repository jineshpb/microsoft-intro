"use client";

import Image from "next/image";
import { ALBUM_PHOTOS, type XpAlbumPhoto } from "../../content/album";

type AlbumExplorerWindowContentProps = {
  onOpenPhoto: (photo: XpAlbumPhoto) => void;
};

const EXPLORER_MENU_ITEMS = [
  "File",
  "Edit",
  "View",
  "Favorites",
  "Tools",
  "Help",
] as const;

const EXPLORER_TOOLBAR_ITEMS = ["Back", "Forward", "Up", "Search", "Folders"] as const;

export const AlbumExplorerWindowContent = ({
  onOpenPhoto,
}: AlbumExplorerWindowContentProps) => {
  const handleOpenPhoto = (photo: XpAlbumPhoto) => {
    onOpenPhoto(photo);
  };

  const handlePhotoKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    photo: XpAlbumPhoto,
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    handleOpenPhoto(photo);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-3 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1 text-[11px] text-slate-800">
        {EXPLORER_MENU_ITEMS.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1">
        {EXPLORER_TOOLBAR_ITEMS.map((item) => (
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

      <div className="flex items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1 text-[11px] text-slate-800">
        <span>Address</span>
        <div className="min-w-0 flex-1 rounded-sm border border-[#7f9db9] bg-white px-2 py-0.5">
          My Pictures \ Album
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-white p-3">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {ALBUM_PHOTOS.map((photo) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`Open ${photo.label}`}
              onClick={() => handleOpenPhoto(photo)}
              onKeyDown={(event) => handlePhotoKeyDown(event, photo)}
              className="flex flex-col items-center gap-1 border-0 bg-transparent p-1 text-center"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-sm border border-[#7f9db9] bg-[#ece9d8]">
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <span className="max-w-[88px] truncate text-[11px] text-slate-800">
                {photo.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
