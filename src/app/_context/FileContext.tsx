"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface fileType {
  file1: object;
  file2?: object;
  file3?: object;
}

interface fileContextType {
  files: fileType;
  setFiles: React.Dispatch<React.SetStateAction<fileType>>;
}

const fileContext = createContext<fileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<fileType>({
    file1: {},
    file2: {},
    file3: {},
  });

  return (
    <fileContext.Provider value={{ files, setFiles }}>
      {children}
    </fileContext.Provider>
  );
};

export const useFile = () => {
  const context = useContext(fileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
};

// interface FileContextType {
//   filePath: any | null;
//   fileName: string | null;
//   setFilePath: React.Dispatch<React.SetStateAction<any | null>>;
//   setFileName: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const FileContext = createContext<FileContextType | undefined>(undefined);

// export const FileProvider = ({ children }: { children: ReactNode }) => {
//   const [filePath, setFilePath] = useState<any | null>(null);
//   const [fileName, setFileName] = useState<string | null>(null);

//   return (
//     <FileContext.Provider
//       value={{ filePath, fileName, setFilePath, setFileName }}
//     >
//       {children}
//     </FileContext.Provider>
//   );
// };

// export const useFile = () => {
//   const context = useContext(FileContext);
//   if (!context) {
//     throw new Error("useFile must be used within a FileProvider");
//   }
//   return context;
// };
