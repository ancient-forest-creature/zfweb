import "~/styles/globals.css";
import { TopNav } from "./_components/TopNav";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Zilka Forgewerks",
  description: "Bespoke Ritually Forged Jewelry and Tools",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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
