import type { XpAlbumPhoto } from "./content/album";

export type XpWindowId =
  | "about-me"
  | "album"
  | "album-viewer"
  | "internet-explorer";

export type XpWindowDefinition = {
  id: XpWindowId;
  title: string;
  icon: string;
  width: number;
  height: number;
  x: number;
  y: number;
};

export type XpOpenWindow = XpWindowDefinition & {
  zIndex: number;
  viewerPhoto?: XpAlbumPhoto;
};

export type OpenXpWindowOptions = {
  title?: string;
  viewerPhoto?: XpAlbumPhoto;
};
