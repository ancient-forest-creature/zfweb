"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useContext } from "react";
// import { useImageUpload } from "~/app/_context/ImgUploadContext";
import { useProduct } from "~/app/_context/ProductContext";
import { ImgBox, ShowImg } from "./img_options";
import { set } from "zod";

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

export type ErrorType = {
  message: string;
};

export function TestBox({
  mediaType,
  num,
  handleUploadErrorsAction,
}: {
  mediaType: string;
  num?: string;
  handleUploadErrorsAction: (error: ErrorType) => void;
}) {
  const router = useRouter();
  //const posthog = usePostHog();
  const { product, setProduct } = useProduct();
  const localMedia = mediaType;
  const localNum = num;
  //   const { imgUpload } = useImageUpload();

  //   console.log("product", product);
  //   console.log("mediaType tb entry", mediaType);
  //   console.log("num tb entry", num);
  console.log("localMedia", localMedia);
  console.log("localNum", localNum);
  //   console.log("imgUpload", imgUpload);

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
      console.log("result[0]", result[0]);
      if (result && result[0]) {
        const { key, url } = result[0];
        console.log("key oCUC", key);
        // const mediaType = useContext(imageTypeContext);
        // const num = useContext(imageNumContext);
        // console.log("mediaType after set", mediaType);
        // console.log("num after set", num);
        //onUploadCompleteAction(key, url, localMedia, localNum);
        const setKey = `${localMedia}Key${localNum}`;
        const setUrl = `${localMedia}Url${localNum}`;
        console.log("setKey oCUC", setKey);
        console.log("setUrl oCUC", setUrl);
        setProduct({ ...product, [setKey]: key, [setUrl]: url });
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

  const mediaText = localMedia === "img" ? "Image" : "Video";
  const urlHolder = `${localMedia}Url${localNum}`;
  const altTxt = `Product Image ${localNum}`;

  console.log("urlHolder ", urlHolder);

  return (
    <div>
      <label htmlFor="upload-box" className="cursor-pointer">
        <div className="h-64 w-64">
          {/* <ImgBox mediaType={mediaType} num={num ?? ""} /> */}
          {product[urlHolder as keyof typeof product] ? (
            <ShowImg
              imgUrl={
                (product[urlHolder as keyof typeof product] as string) || ""
              }
              altTxt={altTxt}
            />
          ) : (
            <ImgBox mediaType={mediaText} num={localNum ?? ""} />
          )}
        </div>
      </label>
      <input id="upload-box" type="file" className="sr-only" {...inputProps} />
    </div>
  );
}
