export const ALBUM_PHOTOS = [
  {
    id: "fam",
    filename: "2026 — me with my boy, “Toto,” and my better half.",
    label: "fam",
    src: "/album/fam.jpg",
  },
  {
    id: "guenther",
    filename:
      "December 2025, last race of the season, transiting through Abu Dhabi. Guenther Steiner was no longer in charge of Haas F1 Team, but he was still in the paddock and heading home. Really chill guy.",
    label: "guenther",
    src: "/album/guenther.jpg",
  },
  {
    id: "kerala",
    filename:
      "Kerala. Home — where my heart is. Behind me are the lush tea estates of Munnar.",
    label: "kerala",
    src: "/album/kerala.jpg",
  },
  {
    id: "post",
    filename:
      "2019, Dallas–Fort Worth transit lounge — Post Malone and his crew had just walked in.",
    label: "post",
    src: "/album/post.jpg",
  },
  {
    id: "rides",
    filename:
      "I used to ride motorcycles — not anymore. Me and my buddy at Ladakh; we rode all the way from south to north.",
    label: "rides",
    src: "/album/rides-2.jpg",
  },
  {
    id: "times",
    filename:
      "2025, Times Square — it was magical. (I was traveling for work.)",
    label: "times",
    src: "/album/times.jpg",
  },
  {
    id: "wmt",
    filename:
      "At the mothership — the lobby and home office of Walmart in Bentonville.",
    label: "wmt",
    src: "/album/wmt.jpg",
  },
] as const;

export type XpAlbumPhoto = (typeof ALBUM_PHOTOS)[number];
