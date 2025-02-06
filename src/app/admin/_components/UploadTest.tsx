"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useImageUpload } from "~/app/_context/ImgUploadContext";
import { useImgPath } from "~/app/_context/ImgPathContext";
import { useFile } from "~/app/_context/FileContext";
import { set } from "zod";
import { ProductType } from "./__ProductForm";

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

export function UploadButton({
  handleUploadErrorsAction,
}: {
  handleUploadErrorsAction: (error: ErrorType) => void;
}) {
  const router = useRouter();
  const { imgUpload, setImgUpload } = useImageUpload();
  const { imgPath, setImgPath } = useImgPath();
  const { filePath, fileName, setFilePath, setFileName } = useFile();
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
      const message = error.message;
      console.error("Error uploading image", message);
      handleUploadErrorsAction({ message });
    },
    onClientUploadComplete(result) {
      console.log("result UT", result);
      if (result && result[0]) {
        setFilePath(result[0]);
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
      <label htmlFor="upload-button" className="cursor-pointer"></label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
