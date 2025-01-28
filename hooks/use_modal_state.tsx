"use client";

import { createContext, useContext, useState } from "react";

// Context 타입 정의
type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

// Context 생성
import type { ReactNode } from "react";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider 컴포넌트
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

// custom hook 정의
export function useModalState() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalState must be used within a ModalProvider");
  }
  return context;
}
