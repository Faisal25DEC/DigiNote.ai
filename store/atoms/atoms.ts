import { atom } from "recoil";

export const currentImageUrlAtom = atom<string | null>({
  key: "currentImageUrlAtom",
  default: null,
});
