"use client";

import { useState } from "react";
import { UploadButton } from "./UploadButton";
import { addProduct } from "./db_connect";
import { UploadBox } from "./UploadBox";
import { useContext } from "react";
import { ImgBox, ShowImg } from "./ImgOptions";
import { useProduct } from "~/app/_context/ProductContext";
import { useImageUpload } from "~/app/_context/ImgUploadContext";
//import { addProduct } from "~/server/db/operations";
// import { db } from "~/server/db";
// import { product as dbProduct } from "~/server/db/schema";

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
  //const {initTitle, initPrice, initDescription, onSubmitProp} = props;
  // const [product, setProduct] = useState<ProductType>({
  //   title: "",
  //   price: 0,
  //   description: "",
  //   imgKey1: "",
  //   imgUrl1: "",
  //   inventory: 0,
  // });
  const { product, setProduct } = useProduct();
  const { imgUpload, setImgUpload } = useImageUpload();

  // const mediaType = useContext(imageTypeContext);
  // const num = useContext(imageNumContext);

  const [errors, setErrors] = useState<ErrorType>();
  //const btnText = initTitle ? "Update" : "Create";
  //console.log("errors is: ", errors);
  const [clear, setClear] = useState(false);

  const onImageUpload = (
    key: string,
    url: string,
    mediaType?: string,
    num?: string,
  ) => {
    console.log("mediaType oIU", mediaType);
    console.log("num oIU", num);
    const setKey = `${mediaType}Key${num}`;
    const setUrl = `${mediaType}Url${num}`;
    console.log("setKey", setKey);
    console.log("setUrl", setUrl);
    setProduct({ ...product, [setKey]: key, [setUrl]: url });
    console.log("product", product);
  };

  // const onImageUpload = (key: string, url: string) => {
  //   setProduct({ ...product, imgKey1: key, imgUrl1: url });
  // };

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

  return (
    <div className="flex flex-col gap-4">
      {/* displays the first product image if it exists */}
      {/* {product.imgUrl1 ? (
        <div className="relative max-w-sm">
          <a href="#">
            <img src={product.imgUrl1} alt={"current image"} />
          </a>
        </div>
      ) : null} */}
      <div>
        {/* Upload button for testing purposes*/}
        {/* <UploadButton
          onUploadComplete={(key, url) => onImageUpload(key, url, "img", "1")}
          handleUploadErrors={handleErrors}
        />
        {errors ? <span style={{ color: "red" }}>{errors.message}</span> : null} */}
      </div>
      <div className="flex items-center justify-center gap-4 p-4">
        {/* setImgUpload({ mediaType: "image", num: "1" }); */}
        {/* <TestBox
          mediaType="img"
          num="1"
          onUploadCompleteAction={onImageUpload}
          handleUploadErrorsAction={handleErrors}
        />
        <TestBox
          mediaType="img"
          num="2"
          onUploadCompleteAction={onImageUpload}
          handleUploadErrorsAction={handleErrors}
        />
        <TestBox
          mediaType="img"
          num="3"
          onUploadCompleteAction={onImageUpload}
          handleUploadErrorsAction={handleErrors}
        /> */}
        {product.imgUrl1 ? (
          <ShowImg imgUrl={product.imgUrl1} altTxt="Product image 1" /> // and why this doesn't
        ) : (
          // <>{showImg(product.imgUrl1, "Product image 1")}</> // I don't understand why this works
          //
          // <imageTypeContext.Provider value="image">
          //   <imageNumContext.Provider value="1">
          //     <TestBox
          //       onUploadCompleteAction={onImageUpload}
          //       handleUploadErrorsAction={handleErrors}
          //     />
          //   </imageNumContext.Provider>
          // </imageTypeContext.Provider> */}
          (console.log("product", product),
          (
            <UploadBox
              mediaType="img"
              num="1"
              onUploadCompleteAction={onImageUpload}
              handleUploadErrorsAction={handleErrors}
            />
          ))
        )}

        {/* <TestBox
          mediaType="img"
          num="2"
          //onUploadCompleteAction={onImageUpload}
          handleUploadErrorsAction={handleErrors}
        /> */}
        {/* {product.imgUrl2 ? (
          <div>
            <img
              className="h-64 w-64 object-contain"
              src={product.imgUrl2}
              alt="image 2"
            />
          </div>
        ) : (
          <UploadBox
            mediaType="img"
            num="2"
            onUploadCompleteAction={onImageUpload}
            handleUploadErrorsAction={handleErrors}
          />
        )} */}

        {product.imgUrl3 ? (
          <div>
            <img
              className="h-64 w-64 object-contain"
              src={product.imgUrl3}
              alt="image 3"
            />
          </div>
        ) : (
          <UploadBox
            mediaType="img"
            num="3"
            onUploadCompleteAction={onImageUpload}
            handleUploadErrorsAction={handleErrors}
          />
        )}
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
