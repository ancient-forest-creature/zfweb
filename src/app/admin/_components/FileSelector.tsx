"use client";

import React from "react";
import { ImgBox, ShowImg } from "./ImgOptions";
import { useImageUpload } from "~/app/_context/ImgUploadContext";
import { useFile } from "~/app/_context/FileContext";

const FileSelector = ({ num }: { num: string }) => {
  const [filePath, setFilePath] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");
  const { imgUpload, setImgUpload } = useImageUpload();
  const { files, setFiles } = useFile();
  const fileNum = `file${num}`;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("file is ", file);
      setFiles({ ...files, [fileNum]: file });
      const value = URL.createObjectURL(file);
      setImgUpload({ ...imgUpload, [`path${num}`]: value });
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
        {/* <label htmlFor="file-selector" className="cursor-pointer"> */}
        {/* I had this div and the one below in separate components, but added them here for simplicity.  */}
        <div>
          {filePath ? (
            <ShowImg imgUrl={filePath} altTxt={fileName} />
          ) : (
            <ImgBox mediaType="Image" num={num} />
          )}
        </div>
      </label>
    </div>
  );
};

export default FileSelector;
