"use client";
import { createPdf } from "@/lib/pdf/createPdf";
import { useState } from "react";

const useDownloadPdf = () => {
  const [downloading, setDownloading] = useState(false);

  const downloadPdf = async ({
    pdfDomElementId,
    filename,
  }: {
    pdfDomElementId: string;
    filename?: string;
  }) => {
    setDownloading(true);
    try {
      const doc = await createPdf({ pdfDomElementId, filename });
      doc?.save(filename || "untitled.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  return {
    downloadPdf,
    downloading,
  };
};

export default useDownloadPdf;
