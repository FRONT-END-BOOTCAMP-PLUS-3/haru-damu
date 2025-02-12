"use client";

import { useEffect, type ReactNode } from "react";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ToastContainer from "@/components/common/toastContainer";

import { useStore } from "@/hooks/usestore";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { isOpenModal } = useStore();

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden"; // 스크롤 막기
    } else {
      document.body.style.overflow = "auto"; // 스크롤 복원
    }

    // 모달이 사라질 때 클린업
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal]);

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
