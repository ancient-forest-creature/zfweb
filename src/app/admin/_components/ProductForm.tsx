"use client";

import { useState } from "react";
import { addProduct } from "./db_connect";
import { useProduct } from "~/app/_context/ProductContext";
import { useImageUpload } from "~/app/_context/ImgUploadContext";
import FileSelector from "./FileSelector";
import { tryUT } from "./UploadTest";
import { useFile } from "~/app/_context/FileContext";
import { useUploadThing } from "~/utils/uploadthing";

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
  const { file } = useFile();
  const [errors, setErrors] = useState<ErrorType>();
  const [clear, setClear] = useState(false);
  const $ut = useUploadThing("imageUploader");
  //const { filePath, fileName, setFilePath, setFileName } = useFile();
  //   const onImageUpload = (
  //     key: string,
  //     url: string,
  //     mediaType?: string,
  //     num?: string,
  //   ) => {
  //     console.log("mediaType oIU", mediaType);
  //     console.log("num oIU", num);
  //     const setKey = `${mediaType}Key${num}`;
  //     const setUrl = `${mediaType}Url${num}`;
  //     console.log("setKey", setKey);
  //     console.log("setUrl", setUrl);
  //     setProduct({ ...product, [setKey]: key, [setUrl]: url });
  //     console.log("product", product);
  //   };

  // console.log("filePath", filePath);

  console.log("imgUpload", imgUpload);
  console.log("imgUpload.path1", imgUpload.path1);

  const handleErrors = (error: ErrorType) => {
    setErrors(error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newProduct = await addProduct(product);
      console.log("Product added:", newProduct);
    } catch (err: any) {
      console.error("Error adding product:", err);
      handleErrors(err);
    }
  };

  const handleUploadTest = async () => {
    console.log("handleUploadTest file", file);
    const selectedFiles = [file.file1, file.file2, file.file3].filter(
      (f): f is File => !!f,
    );
    console.log("selectedFiles", selectedFiles);
    const result = await $ut.startUpload(selectedFiles);
    console.log("uploaded files UT", result);
  };

  // const handleUploadTest = async () => {
  //   const selectedFiles = Array.isArray(file)
  //     ? file.filter((file): file is File => !!file)
  //     : [];
  //   await tryUT(selectedFiles);
  // };

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
                setProduct({ ...product, inventory: Number(e.target.value) })
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
// export default ProductForm;
