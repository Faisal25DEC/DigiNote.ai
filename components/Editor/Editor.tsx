"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";
import { uploadFile } from "@/services/file/file.service";
import { Button } from "../ui/button";
import useDownloadPdf from "@/hooks/useDownloadPdf/useDownloadPdf";
import { currentPdfHtmlAtom } from "@/store/atoms/home/editor";
import { useSetRecoilState } from "recoil";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const setCurrentPdfHtml = useSetRecoilState(currentPdfHtmlAtom);

  const handleUpload = async (file: File) => {
    try {
      const res = await uploadFile(file);
      return res.url;
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const editor = useCreateBlockNote({
    uploadFile: handleUpload,
  });

  const { downloadPdf } = useDownloadPdf();

  useEffect(() => {
    if (!initialContent) return;
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(
        initialContent as string
      );
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [editor, initialContent]);
  if (!editor) {
    return <div>Loading editor...</div>;
  }

  const onEditorChange = async () => {
    const markdown = await editor.blocksToHTMLLossy(editor.document);
    console.log(markdown);
    onChange(markdown);
  };

  const onDownloadPdf = async () => {
    const markdown = await editor.blocksToHTMLLossy(editor.document);
    setCurrentPdfHtml(markdown);
    setTimeout(() => {
      downloadPdf({ pdfDomElementId: "pdf-element" });
    }, 2000);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <Button onClick={onDownloadPdf} className="w-fit" variant={"outline"}>
        Download PDF
      </Button>

      <BlockNoteView
        style={{ height: "calc(70vh-300px)", width: "100%" }}
        editable={editable}
        onChange={onEditorChange}
        editor={editor}
        theme={"light"}
      />
    </div>
  );
};

export default Editor;
