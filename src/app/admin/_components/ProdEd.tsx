"use client";

import { useState } from "react";
import { addProduct } from "./db_connect";
import { useProduct } from "~/app/_context/ProductContext";
import { useImageUpload } from "~/app/_context/ImgUploadContext";
import FileSelector from "./FileSelector";
import { useFile } from "~/app/_context/FileContext";
import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";

export type ErrorType = {
  message: string;
};

type Errors = {
  title?: ErrorType;
  price?: ErrorType;
  description?: ErrorType;
};

export type ProductType = {
  [key: string]: any;
  title: string;
  description: string;
  price: number;
  sku?: string;
  inventory: number;
  category_id?: string;
};

export const ProductForm = () => {
  const { product, setProduct } = useProduct();
  const { imgUpload, setImgUpload } = useImageUpload();
  const { files, setFiles } = useFile();
  const [errors, setErrors] = useState<ErrorType>();
  const [clear, setClear] = useState(false);
  const $ut = useUploadThing("imageUploader");
  const router = useRouter();

  // console.log("imgUpload", imgUpload);
  // console.log("imgUpload.path1", imgUpload.path1);

  const handleErrors = (error: ErrorType) => {
    setErrors(error);
  };

  const clearForm = () => {
    setProduct({
      title: "",
      price: 0,
      description: "",
      inventory: 0,
    });
    setImgUpload({ path1: "", path2: "", path3: "" });
    setFiles({ file1: undefined, file2: undefined, file3: undefined });
    setClear(true);
    router.refresh();
  };

  const handleImageUpload = async () => {
    console.log("handleUploadTest file", files);
    const selectedFiles = [files.file1, files.file2, files.file3].filter(
      (f): f is File => !!f,
    );
    console.log("selectedFiles", selectedFiles);
    const result = await $ut.startUpload(selectedFiles);
    console.log("uploaded files UT", result);
    return result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await handleImageUpload(); // the problem here appears to be the set issue. Just pass res with everything else to add product and set there.
      const urls = res
        ? [res[0]?.url, res[1]?.url, res[2]?.url].filter(
            (url): url is string => url !== undefined && url.length > 0,
          )
        : [];
      const keys = res
        ? [res[0]?.key, res[1]?.key, res[2]?.key].filter(
            (key): key is string => key !== undefined && key.length > 0,
          )
        : [];
      console.log("urls", urls);
      console.log("res", res);
      console.log("product", product);
      const newProduct = await addProduct(product, urls, keys);
      console.log("Product added:", newProduct);
    } catch (err: any) {
      console.error("Error adding product:", err);
      handleErrors(err);
    }
    clearForm();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4 p-4">
        <FileSelector num="1" />
        <FileSelector num="2" />
        <FileSelector num="3" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <label>Title: </label>
            <input
              className="text-black"
              type="text"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
            <br />
            {/* {errors.title ? (
            <span style={{ color: "red" }}>{errors.title.message}</span>
          ) : null} */}
          </div>
          <div>
            <label>Price: </label>
            <input
              className="text-black"
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />
            <br />
            {/* {errors.price ? (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          ) : null} */}
          </div>
          <div>
            <label>Description: </label>
            <input
              className="text-black"
              type="text"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
            <br />
            {/* {errors.description ? (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          ) : null} */}
          </div>
          <div>
            <label>Inventory: </label>
            <input
              className="text-black"
              type="number"
              value={product.inventory}
              onChange={(e) =>
                setProduct({
                  ...product,
                  inventory: Number(e.target.value),
                })
              }
            />
            <br />
            {/* {errors.price ? (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          ) : null} */}
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

import { deleteProduct, getProductById } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";

export default async function FullPageProductEdit(props: { id: number }) {
  const idAsNumber = Number(props.id);
  if (isNaN(props.id)) throw new Error("Invalid Photo ID");
  const product = await getProductById(props.id);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex h-auto w-auto flex-shrink items-center justify-center">
        <img
          src={product.imgUrl[0]}
          alt={`Product ${product.id}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex w-48 flex-shrink-0 flex-col border-x border-white">
        <div className="border-b border-white p-2 text-center text-lg">
          {product.title}
        </div>

        <div className="flex flex-col p-2">
          <span>Description:</span>
          <span>{product.description}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Price:</span>
          <span>{product.price}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Inventory:</span>
          <span>{product.inventory}</span>
        </div>
        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(product.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="p-2">
          <form
            action={async () => {
              "use server";
              await deleteProduct(idAsNumber);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
