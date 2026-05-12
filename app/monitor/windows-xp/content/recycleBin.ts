const RECYCLE_BIN_IMAGE_ICON = "/xp-icons/Whistler - IE Refresh.png";

export const RECYCLE_BIN_ITEMS = [
  {
    id: "jinesh-txt",
    label: "Jinesh.txt",
    icon: "/xp-icons/TXT.png",
  },
  {
    id: "aboutme-pdf",
    label: "aboutme.pdf",
    icon: "/xp-icons/pdf.png",
  },
  {
    id: "fam",
    label: "fam.jpg",
    icon: RECYCLE_BIN_IMAGE_ICON,
  },
  {
    id: "kerala",
    label: "kerala.jpg",
    icon: RECYCLE_BIN_IMAGE_ICON,
  },
  {
    id: "rides",
    label: "rides-2.jpg",
    icon: RECYCLE_BIN_IMAGE_ICON,
  },
] as const;

export type XpRecycleBinItem = (typeof RECYCLE_BIN_ITEMS)[number];
