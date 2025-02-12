"use client";

import { useEffect, useState } from "react";

import { useStore } from "@/hooks/usestore";

import styles from "@/components/common/toast.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ToastProps {
  id: string;
  message: string;
  backgroundColor: string;
  onClickEvent?: () => void;
}

export default function Toast({ id, message, backgroundColor, onClickEvent }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  const { removeMessage } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5초 후 사라지기

    const removeToast = setTimeout(() => {
      removeMessage(id);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeToast);
    };
  }, [id, removeMessage]);

  return (
    <div className={cx("toast", { toast__hidden: !isVisible })} style={{ backgroundColor }} onClick={onClickEvent}>
      <div className="text-lg">{message}</div>
    </div>
  );
}
