"use client";

import Image from "next/image";
import { XpWindowChrome } from "../XpExplorerChrome";
import { ALBUM_PHOTOS, type XpAlbumPhoto } from "../../content/album";

type AlbumExplorerWindowContentProps = {
  onOpenPhoto: (photo: XpAlbumPhoto) => void;
};

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
    <XpWindowChrome
      addressPath="My Pictures \\ Album"
      bodyClassName="min-h-0 flex-1 overflow-y-auto bg-white p-3"
    >
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
    </XpWindowChrome>
  );
};
