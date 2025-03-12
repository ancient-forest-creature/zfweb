import React, { forwardRef, type HTMLAttributes } from "react";

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  url: string;
}

export const Img = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, url, ...props }, ref) => {
    return (
      //   <div className="bg-white text-black" {...props} ref={ref}>
      //     {id}
      //   </div>
      <div
        className="box-border flex items-center justify-center"
        {...props}
        ref={ref}
      >
        <img src={url} alt="test image" width="100" height="100" />
      </div>
    );
  },
);

Img.displayName = "Image";
