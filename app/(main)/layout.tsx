"use client";

import type { ReactNode } from "react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ToastContainer from "@/components/common/toastContainer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main>
        {children}
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}
