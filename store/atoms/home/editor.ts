import { atom } from "recoil";

export const renderEditorAtom = atom<boolean>({
  key: "renderEditorAtom",
  default: false,
});

export const editorContentAtom = atom<string | null>({
  key: "editorContentAtom",
  default: null,
});

export const currentImageUrlAtom = atom<string | null>({
  key: "currentImageUrlAtom",
  default: null,
});

export const currentPdfHtmlAtom = atom<string | null>({
  key: "currentPdfHtmlAtom",
  default: null,
});

export const imageTranscriptionLoadingAtom = atom<boolean>({
  key: "imageTranscriptionLoadingAtom",
  default: false,
});
