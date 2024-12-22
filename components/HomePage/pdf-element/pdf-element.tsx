import React from "react";

const PDFElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 left-[9999999px] z-[-50] w-full h-full">
      {"pdf conten"}
      {children}
    </div>
  );
};

export default PDFElement;
