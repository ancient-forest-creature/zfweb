"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface FileContextType {
  filePath: string | null;
  fileName: string | null;
  setFilePath: React.Dispatch<React.SetStateAction<string | null>>;
  setFileName: React.Dispatch<React.SetStateAction<string | null>>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <FileContext.Provider
      value={{ filePath, fileName, setFilePath, setFileName }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
};
