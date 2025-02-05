"use client";
import type { ReactNode } from "react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header isLogin={true} isPartner />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
