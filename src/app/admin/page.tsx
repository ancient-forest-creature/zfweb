import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ProductProvider } from "../_context/ProductContext";
import { ImgUploadProvider } from "../_context/ImgUploadContext";
import { ProductForm } from "./_components/ProductForm";
import { FileProvider } from "../_context/FileContext";
import { ProductInventory } from "./_components/ProductInventory";

export default function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <FileProvider>
          <ProductProvider>
            <div className="flex w-full flex-col items-center justify-center gap-16">
              <h1 className="text-4xl font-bold">Admin Page</h1>
              <ImgUploadProvider>
                <ProductForm />
                <ProductInventory />
              </ImgUploadProvider>
            </div>
          </ProductProvider>
        </FileProvider>
      </SignedIn>
    </main>
  );
}
