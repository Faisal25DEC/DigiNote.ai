"use client";
import Navbar from "@/components/Navbar/Navbar";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import { useRecoilValue } from "recoil";
import {
  editorContentAtom,
  imageTranscriptionLoadingAtom,
  renderEditorAtom,
  currentPdfHtmlAtom,
} from "@/store/atoms/home/editor";
import { Loader } from "lucide-react";
import PDFElement from "@/components/HomePage/pdf-element/pdf-element";
const Editor = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});
export default function Home() {
  const content = useRecoilValue(editorContentAtom);
  const renderEditor = useRecoilValue(renderEditorAtom);
  const currentPdfHtml = useRecoilValue(currentPdfHtmlAtom);
  const imageTranscriptionLoading = useRecoilValue(
    imageTranscriptionLoadingAtom
  );

  return (
    <>
      <div className="w-full h-screen">
        <Navbar />
        {imageTranscriptionLoading && (
          <div className="h-screen w-full bg-black/50 absolute top-0 left-0 flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        )}
        {renderEditor && (
          <div className=" h-full w-[95%] mx-auto rounded-md">
            <Editor
              editable={true}
              onChange={() => null}
              initialContent={content || ""}
            />
          </div>
        )}

        {!renderEditor && (
          <div className="h-[calc(100vh-4rem)] flex justify-center items-center flex-col gap-4">
            <Hero />
          </div>
        )}
      </div>
      <PDFElement>
        <div
          id="pdf-element"
          dangerouslySetInnerHTML={{ __html: currentPdfHtml || "" }}
        />
      </PDFElement>
    </>
  );
}
