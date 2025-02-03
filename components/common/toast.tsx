import React, { useEffect, useState } from "react";

import styles from "@/components/common/toast.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ToastProps {
  message: string;
  backgroundColor: string;
  onClickEvent?: () => void;
}

export default function Toast({ message, backgroundColor, onClickEvent }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5초 후 사라지기

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cx("toast", { visible: isVisible, hidden: !isVisible })}
      style={{ backgroundColor }}
      onClick={onClickEvent}
    >
      <div className="text-lg">{message}</div>
    </div>
  );
}
