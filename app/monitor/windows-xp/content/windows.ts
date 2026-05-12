import type { XpWindowDefinition, XpWindowId } from "../types";

const IE_STREAM_VIDEO_WIDTH = 320;
const IE_STREAM_VIDEO_HEIGHT = Math.round((IE_STREAM_VIDEO_WIDTH * 9) / 16);
const IE_STREAM_WINDOW_CHROME_HEIGHT = 104;

export const DESKTOP_ICON_WINDOW_MAP: Record<string, XpWindowId | undefined> = {
  "About me": "about-me",
  "aboutme-pdf": "aboutme-pdf",
  Career: "career",
  Images: "album",
  "internet-explorer": "internet-explorer",
  minesweeper: "minesweeper",
  "recycle-bin": "recycle-bin",
};

export const DESKTOP_ICON_LINK_MAP: Record<string, string> = {
  portfolio: "https://jineshb.me",
  linkedin: "https://www.linkedin.com/in/jineshpb/",
};

export const START_MENU_WINDOW_MAP: Record<string, XpWindowId | undefined> = {
  "Internet Explorer": "internet-explorer",
  Notepad: "about-me",
  Minesweeper: "minesweeper",
  "My Pictures": "album",
  "My Computer": "career",
};

export const XP_WINDOW_DEFINITIONS: Record<XpWindowId, XpWindowDefinition> = {
  "about-me": {
    id: "about-me",
    title: "Jinesh.txt - Notepad",
    icon: "/xp-icons/TXT.png",
    width: 420,
    height: 320,
    x: 48,
    y: 40,
  },
  "aboutme-pdf": {
    id: "aboutme-pdf",
    title: "aboutme.pdf - Adobe Reader",
    icon: "/xp-icons/My Documents.png",
    width: 490,
    height: 400,
    x: 100,
    y: 48,
  },
  album: {
    id: "album",
    title: "Album",
    icon: "/xp-icons/My Pictures.png",
    width: 560,
    height: 420,
    x: 96,
    y: 72,
  },
  "album-viewer": {
    id: "album-viewer",
    title: "Windows Picture and Fax Viewer",
    icon: "/xp-icons/My Pictures.png",
    width: 520,
    height: 420,
    x: 132,
    y: 48,
  },
  career: {
    id: "career",
    title: "My Computer",
    icon: "/xp-icons/My-Computer.png",
    width: 560,
    height: 420,
    x: 72,
    y: 56,
  },
  "career-stint": {
    id: "career-stint",
    title: "Local Disk",
    icon: "/xp-icons/My-Computer.png",
    width: 480,
    height: 360,
    x: 120,
    y: 64,
  },
  "internet-explorer": {
    id: "internet-explorer",
    title: "Internet Explorer",
    icon: "/xp-icons/Internet Explorer 6.png",
    width: IE_STREAM_VIDEO_WIDTH,
    height: IE_STREAM_VIDEO_HEIGHT + IE_STREAM_WINDOW_CHROME_HEIGHT,
    x: 528,
    y: 16,
  },
  minesweeper: {
    id: "minesweeper",
    title: "Minesweeper",
    icon: "/xp-icons/Minesweeper.png",
    width: 240,
    height: 382,
    x: 220,
    y: 72,
  },
  "recycle-bin": {
    id: "recycle-bin",
    title: "Recycle Bin",
    icon: "/xp-icons/Recycle-Bin.png",
    width: 520,
    height: 420,
    x: 88,
    y: 64,
  },
};

export const DEFAULT_OPEN_WINDOWS: XpWindowId[] = ["aboutme-pdf"];
