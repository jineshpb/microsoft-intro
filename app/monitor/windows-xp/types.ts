import type { XpAlbumPhoto } from "./content/album";
import type { XpCareerStint } from "./content/career";

export type XpWindowId =
  | "about-me"
  | "aboutme-pdf"
  | "album"
  | "album-viewer"
  | "career"
  | "career-stint"
  | "internet-explorer"
  | "minesweeper"
  | "recycle-bin";

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
  careerStint?: XpCareerStint;
};

export type OpenXpWindowOptions = {
  title?: string;
  viewerPhoto?: XpAlbumPhoto;
  careerStint?: XpCareerStint;
};
