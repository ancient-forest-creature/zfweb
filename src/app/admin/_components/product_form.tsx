"use client";

import { useState } from "react";
import { UploadButton } from "./upload-button";

type ErrorType = {
  message: string;
};

type Errors = {
  title?: ErrorType;
  price?: ErrorType;
  description?: ErrorType;
};

export type ProductType = {
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
  const [product, setProduct] = useState<ProductType>({
    title: "",
    price: 0,
    description: "",
    imgKey1: "",
    imgUrl1: "",
    inventory: 0,
  });
  //const btnText = initTitle ? "Update" : "Create";
  //console.log("errors is: ", errors)
  const [clear, setClear] = useState(false);

  const onImageUpload = (key: string, url: string) => {
    setProduct({ ...product, imgKey1: key, imgUrl1: url });
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     onSubmitProp({title, price, description}).then((res) => {
  //         console.log(res);
  //         setClear(true);
  //     }).catch((err) => {
  //         console.log(err);
  //         setClear(false);
  //     })
  //     console.log("errors hs is: ", errors)
  //     console.log("object.keys(errors) is: ", Object.keys(errors).length)
  //     if (clear === true) {
  //         setTitle("");
  //         setPrice(0);
  //         setDescription("");
  //     }
  //     //props.setSubmitted(true);
  // };

  return (
    <div>
      <UploadButton onUploadComplete={onImageUpload} />
      <form>
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
