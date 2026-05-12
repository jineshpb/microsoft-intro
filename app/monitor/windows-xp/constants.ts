export const XP_COLORS = {
  taskbar: "#245edb",
  taskbarDark: "#1a4fb8",
  startGreen: "#0f9d14",
  startGreenDark: "#28752a",
  startMenuLeft: "#ffffff",
  startMenuRight: "#d3e5fb",
  startMenuHeader: "#3381e3",
  startMenuHeaderDark: "#0e5ecd",

  startMenuFooter: "#4186ef",
  startMenuFooterDark: "#166bd6",
  startMenuBorder: "#234b7f",
  taskbarTray: "#1a4fb8",
} as const;

export const XP_DESKTOP_GRID = {
  columns: 10,
  rows: 8,
} as const;

export const XP_DESKTOP_ICONS = [
  {
    id: "recycle-bin",
    label: "Recycle Bin",
    icon: "/xp-icons/Recycle-Bin.png",
    column: 8,
    row: 3,
  },
  {
    id: "Career",
    label: "My Computer",
    icon: "/xp-icons/My-Computer.png",
    column: 3,
    row: 1,
  },
  {
    id: "internet-explorer",
    label: "Internet Explorer",
    icon: "/xp-icons/Internet Explorer 6.png",
    column: 5,
    row: 3,
  },
  {
    id: "minesweeper",
    label: "Minesweeper",
    icon: "/xp-icons/Minesweeper.png",
    column: 6,
    row: 5,
  },
  {
    id: "About me",
    label: "Jinesh.txt",
    icon: "/xp-icons/TXT.png",
    column: 3,
    row: 4,
  },
  {
    id: "aboutme-pdf",
    label: "aboutme.pdf",
    icon: "/xp-icons/pdf.png",
    column: 2,
    row: 5,
  },
  {
    id: "Images",
    label: "Album",
    icon: "/xp-icons/My Pictures.png",
    column: 1,
    row: 7,
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: "/xp-icons/URL.png",
    column: 4,
    row: 6,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "/xp-icons/URL.png",
    column: 5,
    row: 6,
  },
] as const;

export const XP_START_MENU_LEFT = [
  {
    label: "Internet Explorer",
    icon: "/xp-icons/Internet Explorer 6.png",
  },
  {
    label: "Outlook Express",
    icon: "/xp-icons/Outlook Express.png",
  },
  {
    label: "Windows Media Player",
    icon: "/xp-icons/Windows Media Player 9.png",
  },
  {
    label: "Windows Messenger",
    icon: "/xp-icons/Windows Messenger.png",
  },
  {
    label: "Notepad",
    icon: "/xp-icons/Notepad.png",
  },
  {
    label: "Minesweeper",
    icon: "/xp-icons/Minesweeper.png",
  },
  {
    label: "Tour Windows XP",
    icon: "/xp-icons/Tour XP.png",
  },
  {
    label: "Files and Settings Transfer Wizard",
    icon: "/xp-icons/File and Settings Transfer Wizard.png",
  },
] as const;

export const XP_START_MENU_RIGHT = [
  {
    label: "My Documents",
    icon: "/xp-icons/My Documents.png",
  },
  {
    label: "My Pictures",
    icon: "/xp-icons/My Pictures.png",
  },
  {
    label: "My Music",
    icon: "/xp-icons/My Music.png",
  },
  {
    label: "My Computer",
    icon: "/xp-icons/My-Computer.png",
  },
  {
    label: "Control Panel",
    icon: "/xp-icons/Control Panel.png",
  },
  {
    label: "Set Program Access and Defaults",
    icon: "/xp-icons/Default Programs.png",
  },
  {
    label: "Help and Support",
    icon: "/xp-icons/Help and Support.png",
  },
  {
    label: "Search",
    icon: "/xp-icons/Search.png",
  },
  {
    label: "Run...",
    icon: "/xp-icons/Run.png",
  },
] as const;

export const XP_EXPLORER_MENU_ITEMS = [
  { label: "File", icon: null },
  { label: "Edit", icon: null },
  { label: "View", icon: null },
  { label: "Favorites", icon: null },
  { label: "Tools", icon: null },
  { label: "Help", icon: null },
] as const;

export const XP_EXPLORER_NAVBAR_ITEMS = [
  {
    id: "back",
    label: "Back",
    icon: "Back.png",
    showLabel: true,
    kind: "button",
  },
  {
    id: "forward",
    label: "Forward",
    icon: "Forward.png",
    showLabel: false,
    kind: "button",
  },
  {
    id: "up",
    label: "Up",
    icon: "Folder Closed.png",
    showLabel: false,
    kind: "button",
  },
  { id: "separator-1", kind: "separator" },
  {
    id: "search",
    label: "Search",
    icon: "Search.png",
    showLabel: true,
    kind: "button",
  },
  {
    id: "folders",
    label: "Folders",
    icon: "My Documents.png",
    showLabel: true,
    kind: "button",
  },
  {
    id: "view",
    label: "View",
    icon: "Icon View.png",
    showLabel: true,
    kind: "button",
  },
] as const;

export const XP_NOTEPAD_MENU_ITEMS = [
  { label: "File", icon: null },
  { label: "Edit", icon: null },
  { label: "Format", icon: null },
  { label: "View", icon: null },
  { label: "Help", icon: null },
] as const;

export const XP_PICTURE_VIEWER_MENU_ITEMS = [
  { label: "File", icon: null },
  { label: "Edit", icon: null },
  { label: "View", icon: null },
  { label: "Help", icon: null },
] as const;

export const XP_PICTURE_VIEWER_NAVBAR_ITEMS = [
  { id: "save", label: "Save", icon: null, showLabel: true, kind: "button" },
  { id: "print", label: "Print", icon: null, showLabel: true, kind: "button" },
  { id: "zoom", label: "Zoom", icon: null, showLabel: true, kind: "button" },
  {
    id: "actual-size",
    label: "Actual Size",
    icon: null,
    showLabel: true,
    kind: "button",
  },
  { id: "next", label: "Next", icon: null, showLabel: true, kind: "button" },
  {
    id: "previous",
    label: "Previous",
    icon: null,
    showLabel: true,
    kind: "button",
  },
] as const;

export const getXpIconPath = (icon: string) => `/xp-icons/${icon}`;
