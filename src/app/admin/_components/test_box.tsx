"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useImageUpload } from "~/app/_context/ImgUploadContext";
import { useProduct } from "~/app/_context/ProductContext";
import { ImgBox, ShowImg } from "./img_options";
import { set } from "zod";
import { ProductType } from "./product_form";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.routeConfig?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

// const ImgBox = ({ type, num }: { type: string; num: string }) => {
//   return (
//     <div className="box-border flex h-64 w-64 items-center justify-center border-4 border-white p-4">
//       <h1 className="text-2xl font-bold tracking-tight text-white">
//         {type} {num}
//       </h1>
//     </div>
//   );
// };

//const CompLoader = () => <ImgBox mediaType="image" num="1" />;

export type ErrorType = {
  message: string;
};

export function TestBox({
  mediaType,
  num,
  onUploadCompleteAction,
  handleUploadErrorsAction,
}: {
  mediaType: string;
  num?: string;
  onUploadCompleteAction: (
    key: string,
    url: string,
    mediaType?: string,
    num?: string,
  ) => void;
  handleUploadErrorsAction: (error: ErrorType) => void;
}) {
  const router = useRouter();
  //const posthog = usePostHog();
  const { product } = useProduct();
  const { imgUpload } = useImageUpload();

  console.log("product", product);
  console.log("imgUpload", imgUpload);

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      //   posthog.capture("upload_begin");
      //   toast(
      //     <div className="flex items-center gap-2 text-white">
      //       <LoadingSpinnerSVG />
      //       <span className="text-lg">Uploading...</span>
      //     </div>,
      //     {
      //       duration: 100000,
      //       id: "upload-begin",
      //     },
      //   );
    },
    onUploadError(error) {
      //   posthog.capture("upload_error", { error });
      //   toast.dismiss("upload-begin");
      //   toast.error(`Error uploading image - ${error.message}`);
      const message = error.message;
      console.error("Error uploading image", message);
      handleUploadErrorsAction({ message });
    },
    onClientUploadComplete(result) {
      console.log("oCUC result", result);
      if (result && result[0]) {
        const { key, url } = result[0];
        // const mediaType = useContext(imageTypeContext);
        // const num = useContext(imageNumContext);
        // console.log("mediaType after set", mediaType);
        // console.log("num after set", num);
        onUploadCompleteAction(key, url, mediaType, num);
      }

      //   toast.dismiss("upload-begin");
      //   toast("Image uploaded successfully", {
      //     id: "upload-success",
      //     duration: 3000,
      //     action: {
      //       label: "Dismiss",
      //       onClick: () => toast.dismiss("upload-success"),
      //     },
      //   });
      router.refresh();
    },
  });

  return (
    <div>
      <label htmlFor="upload-box" className="cursor-pointer">
        <div className="h-64 w-64">
          {/* <ImgBox mediaType={mediaType} num={num ?? ""} /> */}
          {product.imgUrl1 ? (
            <ShowImg imgUrl={product.imgKey1} altTxt={"Product Image"} />
          ) : (
            <ImgBox mediaType={mediaType} num={num ?? ""} />
          )}
        </div>
      </label>
      <input id="upload-box" type="file" className="sr-only" {...inputProps} />
    </div>
  );
}
