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
  // const urls = [
  //   product.imgUrl1,
  //   product.imgUrl2,
  //   product.imgUrl3,
  //   product.videoUrl,
  // ].filter((url): url is string => url !== undefined && url.length > 0);

  // const keys = [
  //   product.imgKey1,
  //   product.imgKey2,
  //   product.imgKey3,
  //   product.videoKey,
  // ].filter((key): key is string => key !== undefined && key.length > 0);

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
