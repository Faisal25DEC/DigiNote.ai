"use client";
import Navbar from "@/components/Navbar/Navbar";
import dynamic from "next/dynamic";

import Hero from "@/components/Hero";

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentImageUrlAtom } from "@/store/atoms/atoms";
import axios from "axios";
const Editor = dynamic(() => import("@/components/Editor/Editor"), {
  ssr: false,
});
export default function Home() {
  const currentImageUrl = useRecoilValue(currentImageUrlAtom);
  const [content, setContent] = useState<string | null>(null);
  const [renderEditor, setRenderEditor] = useState(false);
  const getImageTranscription = async (url: string) => {
    console.log(url);
    const res = await axios.post("/api/transcribe", { imageUrl: url });
    return res.data.markdownString;
  };
  useEffect(() => {
    if (currentImageUrl) {
      const resopnse = getImageTranscription(currentImageUrl);
      resopnse.then((data) => {
        setContent(data);
        setRenderEditor(true);
      });
    }
  }, [currentImageUrl]);
  return (
    <>
      <div className="w-full h-screen">
        <Navbar />

        {renderEditor && (
          <div className=" h-full w-[95%] mx-auto rounded-md">
            <Editor
              editable={true}
              onChange={() => null}
              initialContent={content}
            />
          </div>
        )}

        {!renderEditor && (
          <div className="h-[calc(100vh-4rem)] flex justify-center items-center flex-col gap-4">
            <Hero />
          </div>
        )}
      </div>
    </>
  );
}
