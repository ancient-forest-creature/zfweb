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
  imgKey1: string;
  imgUrl1: string;
  imgKey2?: string;
  imgUrl2?: string;
  imgKey3?: string;
  imgUrl3?: string;
  videoKey?: string;
  videoUrl?: string;
  sku?: string;
  inventory: number;
  category_id?: string;
};

export const ProductForm = () => {
  const { product, setProduct } = useProduct();
  const { imgUpload, setImgUpload } = useImageUpload();
  const { files } = useFile();
  const [errors, setErrors] = useState<ErrorType>();
  const [clear, setClear] = useState(false);
  const $ut = useUploadThing("imageUploader");
  const router = useRouter();

  // console.log("imgUpload", imgUpload);
  // console.log("imgUpload.path1", imgUpload.path1);

  const handleErrors = (error: ErrorType) => {
    setErrors(error);
  };

  function timeout(delay: number) {
    console.log("in timeout");
    return new Promise((result) => setTimeout(result, delay));
  }

  const clearForm = () => {
    setProduct({
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
    setImgUpload({ path1: "", path2: "", path3: "" });
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
    // if (result) {
    //   console.log("in handleImageUpload");
    //   const updatedProduct = { ...product };

    //   if (result[0]) {
    //     updatedProduct.imgKey1 = result[0].key;
    //     updatedProduct.imgUrl1 = result[0].url;
    //   }
    //   if (result[1]) {
    //     updatedProduct.imgKey2 = result[1].key;
    //     updatedProduct.imgUrl2 = result[1].url;
    //   }
    //   if (result[2]) {
    //     updatedProduct.imgKey3 = result[2].key;
    //     updatedProduct.imgUrl3 = result[2].url;
    //   }

    //   setProduct(updatedProduct);
    // }
    return result;
  };

  const handleUploadTest = async () => {
    console.log("handleUploadTest file", files);
    const selectedFiles = [files.file1, files.file2, files.file3].filter(
      (f): f is File => !!f,
    );
    console.log("selectedFiles", selectedFiles);
    const result = await $ut.startUpload(selectedFiles);
    console.log("uploaded files UT", result);
    // console.log("result[0]", result[0]);
    // console.log("result[1]", result[1]);
    // console.log("result[2]", result[2]);
    if (result) {
      const updatedProduct = { ...product };

      if (result[0]) {
        updatedProduct.imgKey1 = result[0].key;
        updatedProduct.imgUrl1 = result[0].url;
      }
      if (result[1]) {
        updatedProduct.imgKey2 = result[1].key;
        updatedProduct.imgUrl2 = result[1].url;
      }
      if (result[2]) {
        updatedProduct.imgKey3 = result[2].key;
        updatedProduct.imgUrl3 = result[2].url;
      }

      setProduct(updatedProduct);
    }
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
      console.log("urls", urls); // while (res != "go") {
      //   console.log("In while loop");
      //   await timeout(100);
      // }
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
      <div>
        <button onClick={handleUploadTest}>Upload Test</button>
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
            <label>img_Key_1: </label>
            <input
              className="text-black"
              type="text"
              value={product.imgKey1}
              readOnly
            />
            <br />
            {/* {errors.description ? (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          ) : null} */}
          </div>
          <div>
            <label>img_URL_1: </label>
            <input
              className="text-black"
              type="text"
              value={product.imgUrl1}
              readOnly
            />
            <br />
            {/* {errors.description ? (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          ) : null} */}
          </div>{" "}
          <div>
            <label>img_Key_2: </label>
            <input
              className="text-black"
              type="text"
              value={product.imgKey2}
              readOnly
            />
            <br />
            {/* {errors.description ? (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          ) : null} */}
          </div>
          <div>
            <label>img_URL_2: </label>
            <input
              className="text-black"
              type="text"
              value={product.imgUrl2}
              readOnly
            />
            <br />
            {/* {errors.description ? (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          ) : null} */}
          </div>{" "}
          <div>
            <label>img_Key_3: </label>
            <input
              className="text-black"
              type="text"
              value={product.imgKey3}
              readOnly
            />
            <br />
            {/* {errors.description ? (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          ) : null} */}
          </div>
          <div>
            <label>img_URL_3: </label>
            <input
              className="text-black"
              type="text"
              value={product.imgUrl3}
              readOnly
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
