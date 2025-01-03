import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Zilka Forgewerks",
  description: "Bespoke Ritually Forged Jewelry and Tools",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function TopNav() {
  return (
    <div className="gap-4">
      <nav className="flex w-full items-center justify-between gap-4 border-b p-4 text-xl font-semibold">
        <div>Products</div>

        <div> Cart</div>
      </nav>
      <div className="flex w-full items-center justify-center p-4">
        <div className="w-1/5"></div>
        <div className="flex w-3/5 max-w-sm items-center justify-center">
          <Image
            src="https://utfs.io/f/CP1vGQdmthxyPSxgXafaQqdfG2FMOt1A6sEkLVNghCU7nyxm"
            width={3333}
            height={1304}
            alt="Zilka Forgewerks Logo"
          />
        </div>
        <div className="w-1/5"></div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} flex flex-col gap-4`}>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
