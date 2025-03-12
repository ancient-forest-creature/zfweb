"use client";

import React from "react";
import { ImgBox, ShowImg } from "./ImgOptions";
//import { useImageUpload } from "~/app/_context/ImgUploadContext";
import { useFile } from "~/app/_context/FileContext"; // Holds the entire file object to allow upload by product

const FileSelector = ({ num }: { num: string }) => {
  const [filePath, setFilePath] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");
  const { files, setFiles } = useFile();
  const fileNum = `file${num}`;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("file is ", file);
      setFiles({ ...files, [fileNum]: file });
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
        id={`file-selector-${num}`}
      />
      <label htmlFor={`file-selector-${num}`} className="cursor-pointer">
        <div>
          {files[fileNum] ? (
            <ShowImg
              imgUrl={URL.createObjectURL(files[fileNum])}
              altTxt={fileName}
            />
          ) : (
            <ImgBox mediaType="Image" num={num} />
          )}
        </div>{" "}
      </label>
    </div>
  );
};

export default FileSelector;
