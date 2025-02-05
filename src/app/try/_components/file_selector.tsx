"use client";

import React from "react";
import { ImgBox, ShowImg } from "./img_options";

const FileSelector = ({ num }: { num: string }) => {
  const [filePath, setFilePath] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("file is ", file);
      const value = URL.createObjectURL(file);
      setFilePath(value);
      setFileName(file.name);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        // id="file-selector"
        id={`file-selector-${num}`}
      />
      <label htmlFor={`file-selector-${num}`} className="cursor-pointer">
        {/* <label htmlFor="file-selector" className="cursor-pointer"> */}
        {/* I had this div and the one below in separate components, but added them here for simplicity.  */}
        <div>
          {filePath ? (
            <div>
              <img
                className="h-64 w-64 object-contain"
                src={filePath}
                alt={fileName}
              />
            </div>
          ) : (
            <div className="box-border flex h-64 w-64 items-center justify-center border-4 border-white p-4">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Image {num}
              </h1>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default FileSelector;
