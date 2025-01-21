import type { ReactNode } from "react";

import type { Metadata } from "next";

import "@/styles/globals.css";

import Head from "next/head";

export const metadata: Metadata = {
  title: "Haru-Damu",
  description: "The haru-damu site of the lionCat team.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
