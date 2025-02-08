"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ProductType {
  title: string;
  price: number;
  description: string;
  imgKey1?: string;
  imgUrl1?: string;
  inventory: number;
  imgKey2?: string;
  imgUrl2?: string;
  imgKey3?: string;
  imgUrl3?: string;
}

interface ProductContextType {
  product: ProductType;
  setProduct: React.Dispatch<React.SetStateAction<ProductType>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductType>({
    title: "",
    price: 0,
    description: "",
    imgKey1: "",
    imgUrl1: "",
    imgKey2: "",
    imgUrl2: "",
    imgKey3: "",
    imgUrl3: "",
    inventory: 0,
  });

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
