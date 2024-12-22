import { JSX, SVGProps } from "react";
import { useRecoilState } from "recoil";
import {
  currentImageUrlAtom,
  editorContentAtom,
  imageTranscriptionLoadingAtom,
  renderEditorAtom,
} from "@/store/atoms/home/editor";
import axios from "axios";

export default function Upload() {
  const [, setCurrentImageUrl] = useRecoilState(currentImageUrlAtom);
  const [, setContent] = useRecoilState(editorContentAtom);
  const [, setRenderEditor] = useRecoilState(renderEditorAtom);
  const [, setImageTranscriptionLoading] = useRecoilState(
    imageTranscriptionLoadingAtom
  );

  const getImageTranscription = async (url: string) => {
    console.log(url);
    setImageTranscriptionLoading(true);
    const res = await axios.post("/api/transcribe", { imageUrl: url });
    return res.data.markdownString;
  };

  const getImageTranscriptionHandler = async (url: string) => {
    if (url) {
      const resopnse = getImageTranscription(url);
      resopnse.then((data) => {
        setImageTranscriptionLoading(false);
        setContent(data);
        setRenderEditor(true);
      });
    }
  };

  const uploadFileHandler = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Url = reader.result as string;
      console.log(base64Url);
      getImageTranscriptionHandler(base64Url);
      setCurrentImageUrl(base64Url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center pt-5">
      <div className="flex flex-col justify-center space-y-4">
        <div className="group relative w-full max-w-md rounded-lg border-2 border-dashed border-muted-foreground p-8 text-center transition-colors hover:border-primary">
          <CloudUploadIcon className="mx-auto h-12 w-12 text-muted-foreground group-hover:text-primary" />
          <p className="mt-4 text-sm font-medium text-muted-foreground group-hover:text-primary">
            Drag and drop your image here, or click to select a file
          </p>
          <input
            type="file"
            onChange={(e) =>
              e.target.files && uploadFileHandler(e.target.files[0])
            }
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </div>
      </div>
    </div>
  );
}

function CloudUploadIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
