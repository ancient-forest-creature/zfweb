"use client";

// global context for holding the local images for a product before upload/product creation. Currently, the product form only allows for 3 images to be uploaded. This context is used to hold the images before they are uploaded to the cloud storage and the urls are stored in the database.

//import React, { createContext, useState, useContext, ReactNode } from "react";

import { createContext, useContext, useState } from "react";

interface fileType {
  [key: string]: File | undefined; // Add this line to allow dynamic property access
}

const FileContext = createContext<
  | {
      files: fileType;
      setFiles: React.Dispatch<React.SetStateAction<fileType>>;
    }
  | undefined
>(undefined);

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
};

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<fileType>({});

  return (
    <FileContext.Provider value={{ files, setFiles }}>
      {children}
    </FileContext.Provider>
  );
};

// interface fileType {
//   file1: object | undefined;
//   file2?: object | undefined;
//   file3?: object | undefined;
// }

// interface fileContextType {
//   files: fileType;
//   setFiles: React.Dispatch<React.SetStateAction<fileType>>;
// }

// const fileContext = createContext<fileContextType | undefined>(undefined);

// export const FileProvider = ({ children }: { children: ReactNode }) => {
//   const [files, setFiles] = useState<fileType>({
//     file1: {},
//     file2: {},
//     file3: {},
//   });

//   return (
//     <fileContext.Provider value={{ files, setFiles }}>
//       {children}
//     </fileContext.Provider>
//   );
// };

// export const useFile = () => {
//   const context = useContext(fileContext);
//   if (!context) {
//     throw new Error("useFile must be used within a FileProvider");
//   }
//   return context;
// };
