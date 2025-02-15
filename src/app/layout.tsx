import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";
import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
  title: "Home",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
