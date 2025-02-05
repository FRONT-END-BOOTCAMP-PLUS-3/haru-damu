"use client";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isShrunk, setIsShrunk] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <Header isLogin={true} isShrunk={isShrunk} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
