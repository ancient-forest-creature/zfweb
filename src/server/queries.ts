import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { product } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const getProducts = async () => {
  const products = await db.query.product.findMany({
    orderBy: (model: any, { asc }) => asc(model.id),
  });
  return products;
};
