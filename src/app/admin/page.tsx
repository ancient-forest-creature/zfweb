import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ProductForm } from "./_components/product_form";

export default function HomePage() {
  return (
    <main>
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <div className="flex w-full items-center justify-center gap-16">
          <h1 className="text-4xl font-bold">Admin Page</h1>
          <ProductForm />
        </div>
      </SignedIn>
    </main>
  );
}
