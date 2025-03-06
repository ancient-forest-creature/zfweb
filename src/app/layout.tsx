import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Zilka Forgewerks",
  description: "Bespoke Ritually Forged Jewelry and Tools",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// Copied this after doing work to it already. Not sure what the default state is. May have more code than needed.
// Added a permanent redirect to /shop from root. If you need to change that, got to next.config.js and change the redirect there.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} flex flex-col gap-4`}>
        {children}
      </body>
    </html>
  );
}

// export default function RootLayout({
//   children,
//   modal,
// }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <body className={`${GeistSans.variable} dark flex flex-col gap-4`}>
//         {children}
//         {modal}
//         <div id="modal-root" />
//       </body>
//     </html>
//   );
// }
