import "server-only";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { utapi } from "./uploadthing";
import { product as dbproduct } from "./db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const getProducts = async () => {
  const products = await db.query.product.findMany({
    orderBy: (model: any, { asc }) => asc(model.id),
  });
  return products;
};

export async function getProductById(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const product = await db.query.product.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!product) throw new Error("Product Not found");

  return product;
}

export async function deleteProduct(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized"); //technically this doesn't need to be here I don't think, but I'm leaving it.

  // the code below is to setup the deleteFiles off UploadThing. If you were just deleting off the db, you wouldn't need this.
  const product = await db.query.product.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!product) throw new Error("Product Not found");
  //if (product.userId !== user.userId) throw new Error("Unauthorized");

  await db.delete(dbproduct).where(eq(dbproduct.id, id));

  // .delete(product)
  //   .where(eq(db.product.id, id));

  await utapi.deleteFiles(product.imgKey);

  // analyticsServerClient.capture({
  //   distinctId: user.userId,
  //   event: "Product Deleted",
  //   properties: {
  //     productId: id,
  //     productName: product.name,
  //   },
  // });

  //revalidatePath("/"); // part of the demo, just left it in as a reminder.
  redirect("/");
}
