"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "@/components/common/button.module.css";

import classNames from "classnames/bind";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  text: string;
  color?: "primary" | "delete";
  type?: "button";
  className?: string;
  width?: string;
  height?: string;
  iconComponent?: ReactNode;
}

const cx = classNames.bind(styles);

export default function Button({
  text = "",
  className,
  width = "100%",
  height = "40px",
  color = "primary",
  iconComponent,
  ...rest
}: ButtonProps) {
  const classNames = cx("button", "text-sm-b", className, {
    [`button__${color}`]: color,
  });

  return (
    <button className={classNames} style={{ width, height }} {...rest}>
      {iconComponent && <div className={cx("button__icon")}>{iconComponent}</div>}
      {text}
    </button>
  );
}
