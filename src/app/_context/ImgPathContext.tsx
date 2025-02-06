"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface imgPathType {
  url1: string;
  key1: string;
  url2: string;
  key2: string;
  url3: string;
  key3: string;
}

interface imgPathContextType {
  imgPath: imgPathType;
  setImgPath: React.Dispatch<React.SetStateAction<imgPathType>>;
}

const ImgPathContext = createContext<imgPathContextType | undefined>(undefined);

export const ImgPathProvider = ({ children }: { children: ReactNode }) => {
  const [imgPath, setImgPath] = useState<imgPathType>({
    url1: "",
    key1: "",
    url2: "",
    key2: "",
    url3: "",
    key3: "",
  });

  return (
    <ImgPathContext.Provider value={{ imgPath, setImgPath }}>
      {children}
    </ImgPathContext.Provider>
  );
};

export const useImgPath = () => {
  const context = useContext(ImgPathContext);
  if (!context) {
    throw new Error("useImgPath must be used within a ImgPathProvider");
  }
  return context;
};
