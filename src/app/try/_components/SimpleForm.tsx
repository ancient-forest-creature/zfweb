"use client";

import FileSelector from "./file_selector";

export const SimpleForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4 p-4">
        <FileSelector num="1" />
        <FileSelector num="2" />
        <FileSelector num="3" />
      </div>
    </div>
  );
};

//export default SimpleForm;
