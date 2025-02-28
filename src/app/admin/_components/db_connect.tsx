"use server";

import { db } from "~/server/db";
import { product as dbProduct } from "~/server/db/schema";
import { ProductType } from "./ProductForm";
import { object } from "zod";

export const addProduct = async (
  product: ProductType,
  urls: string[] | undefined,
  keys: string[] | undefined,
) => {
  const result: { returnId: number }[] = await db
    .insert(dbProduct)
    .values({
      title: product.title,
      price: product.price,
      description: product.description,
      imgKey: keys ?? [],
      imgUrl: urls ?? [],
      inventory: product.inventory,
    })
    .returning({ returnId: dbProduct.id });

  return JSON.stringify(result);
};
