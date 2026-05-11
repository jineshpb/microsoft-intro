export const ALBUM_PHOTOS = [
  {
    id: "fam",
    filename: "fam.jpg",
    label: "fam",
    src: "/album/fam.jpg",
  },
  {
    id: "guenther",
    filename: "guenther.jpg",
    label: "guenther",
    src: "/album/guenther.jpg",
  },
  {
    id: "kerala",
    filename: "kerala.jpg",
    label: "kerala",
    src: "/album/kerala.jpg",
  },
  {
    id: "post",
    filename: "post.jpg",
    label: "post",
    src: "/album/post.jpg",
  },
  {
    id: "rides",
    filename: "rides.jpg",
    label: "rides",
    src: "/album/rides.jpg",
  },
  {
    id: "times",
    filename: "times.jpg",
    label: "times",
    src: "/album/times.jpg",
  },
  {
    id: "wmt",
    filename: "wmt.jpg",
    label: "wmt",
    src: "/album/wmt.jpg",
  },
] as const;

export type XpAlbumPhoto = (typeof ALBUM_PHOTOS)[number];
