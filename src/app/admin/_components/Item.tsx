import React, { forwardRef, type HTMLAttributes } from "react";

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, ...props }, ref) => {
    return (
      //   <div className="bg-white text-black" {...props} ref={ref}>
      //     {id}
      //   </div>
      <div
        className="box-border flex h-16 w-16 items-center justify-center border-2 border-white bg-gray-400 p-4 hover:bg-gray-500"
        {...props}
        ref={ref}
      >
        <h1 className="text-2xl font-bold tracking-tight text-white">{id}</h1>
      </div>
    );
  },
);

Item.displayName = "Item";
