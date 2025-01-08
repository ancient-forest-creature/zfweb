"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
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

function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
      />
    </svg>
  );
}

function LoadingSpinnerSVG() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <path
        className="spinner_7mtw"
        d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
      />
    </svg>
  );
}

// const makeUploadToast = () => {
//   return toast(
//     <div className="flex items-center gap-2 text-white">
//       <LoadingSpinnerSVG />
//       <span className="text-lg">Uploading...</span>
//     </div>,
//     {
//       duration: 100000,
//       id: "upload-begin",
//     },
//   );
// };

// window.makeToast = makeUploadToast;

// type setProductProps = {
//   title: string;
//   description: string;
//   price: number;
//   imgKey1: string;
//   imgUrl1: string;
//   imgKey2?: string;
//   imgUrl2?: string;
//   imgKey3?: string;
//   imgUrl3?: string;
//   videoKey?: string;
//   videoUrl?: string;
//   sku?: string;
//   inventory: number;
//   category_id?: string;
// };

export function UploadButton({
  onUploadComplete,
}: {
  onUploadComplete: (key: string, url: string) => void;
}) {
  const router = useRouter();
  //const posthog = usePostHog();

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
    },
    onClientUploadComplete(result) {
      if (result && result[0]) {
        const { key, url } = result[0];
        onUploadComplete(key, url);
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
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
