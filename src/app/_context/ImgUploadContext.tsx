"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface imgUploadType {
  mediaType: string;
  num: string;
}

interface imgUploadContextType {
  imgUpload: imgUploadType;
  setImgUpload: React.Dispatch<React.SetStateAction<imgUploadType>>;
}

const ImgUploadContext = createContext<imgUploadContextType | undefined>(
  undefined,
);

export const ImgUploadProvider = ({ children }: { children: ReactNode }) => {
  const [imgUpload, setImgUpload] = useState<imgUploadType>({
    mediaType: "",
    num: "",
  });

  return (
    <ImgUploadContext.Provider value={{ imgUpload, setImgUpload }}>
      {children}
    </ImgUploadContext.Provider>
  );
};

export const useImageUpload = () => {
  const context = useContext(ImgUploadContext);
  if (!context) {
    throw new Error("useImageUpload must be used within a ImgUploadProvider");
  }
  return context;
};
