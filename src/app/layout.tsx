import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Zilka Forgewerks",
  description: "Bespoke Ritually Forged Jewelry and Tools",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Welcome!</div>
      <div className="max-w-sm">
        <img
          src="https://utfs.io/f/CP1vGQdmthxyPSxgXafaQqdfG2FMOt1A6sEkLVNghCU7nyxm"
          alt="Zilka Forgewerks Logo"
        />
      </div>
      <div> Cart</div>
    </nav>
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
