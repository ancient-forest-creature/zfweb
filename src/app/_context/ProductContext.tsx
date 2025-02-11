"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ProductType {
  title: string;
  price: number;
  description: string;
  inventory: number;
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
