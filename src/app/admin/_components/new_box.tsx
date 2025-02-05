"use client";

import { useRouter } from "next/navigation";
import { useProduct } from "~/app/_context/ProductContext";
import { useImageUpload } from "~/app/_context/ImgUploadContext";
//import { setMediaInfo } from "./setMediaInfo";
import { ImgBox, ShowImg } from "./img_options";
import { set } from "zod";

export function NewBox({ num }: { num: string }) {
  const instanceKey = `imgKey${num}`;
  const instanceUrl = `imgUrl${num}`;
  const router = useRouter();
  const { product, setProduct } = useProduct();
  const { imgUpload, setImgUpload } = useImageUpload();
  console.log("nb instance url", instanceUrl);
  console.log("nb instance key", instanceKey);

  //   const mediaText = localMedia === "img" ? "Image" : "Video";
  //   const urlHolder = `${localMedia}Url${localNum}`;
  //   const altTxt = `Product Image ${localNum}`;

  //   console.log("urlHolder ", urlHolder);

  return (
    <div>
      <label htmlFor="upload-box" className="cursor-pointer">
        <div className="box-border h-64 w-64 border-2 border-white">
          {num === "1" ? (
            imgUpload.path1 ? (
              <ShowImg imgUrl={imgUpload.path1} altTxt="Product Image 1" />
            ) : (
              <ImgBox mediaType="Image" num="1" />
            )
          ) : num === "2" ? (
            imgUpload.path2 ? (
              <ShowImg imgUrl={imgUpload.path2} altTxt="Product Image 2" />
            ) : (
              <ImgBox mediaType="Image" num="2" />
            )
          ) : num === "3" ? (
            imgUpload.path3 ? (
              <ShowImg imgUrl={imgUpload.path3} altTxt="Product Image 3" />
            ) : (
              <ImgBox mediaType="Image" num="3" />
            )
          ) : null}
          {/* {product[urlHolder as keyof typeof product] ? (
            <ShowImg
              imgUrl={
                (product[urlHolder as keyof typeof product] as string) || ""
              }
              altTxt={altTxt}
            />
          ) : (
            <ImgBox mediaType={mediaText} num={localNum ?? ""} />
          )}  */}
        </div>
      </label>
      <input id="upload-box" type="file" className="sr-only" />
    </div>
  );
}
