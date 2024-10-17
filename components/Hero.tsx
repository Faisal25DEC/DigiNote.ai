import React from "react";
import Upload from "./upload/upload";


function Hero() {
  return (
    <div>
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl [@media(max-width:480px)]:text-[2rem]">
          Capture. Convert. Deliver.
        </h1>
        <p className="text-md pt-2 w-[80%]">
          Effortlessly transform handwritten notes into editable digital text,
          streamlining your workflow and boosting productivity.
        </p>
      </div>
      <Upload/>
    </div>
  );
}

export default Hero;
