import type { XpWindowDefinition, XpWindowId } from "../types";

export const DESKTOP_ICON_WINDOW_MAP: Record<string, XpWindowId | undefined> = {
  "About me": "about-me",
  Images: "album",
  "internet-explorer": "internet-explorer",
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
  "internet-explorer": {
    id: "internet-explorer",
    title: "Internet Explorer",
    icon: "/xp-icons/Internet Explorer 6.png",
    width: 640,
    height: 420,
    x: 180,
    y: 28,
  },
};

export const DEFAULT_OPEN_WINDOWS: XpWindowId[] = ["internet-explorer"];
