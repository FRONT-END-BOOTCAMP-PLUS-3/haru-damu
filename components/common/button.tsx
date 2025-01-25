"use client";
import type { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

import Image from "next/image";
import classNames from "classnames/bind";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> {
  type: "button";
  text: string;
  onClick: () => void;
  className?: string;
  color: "green" | "blackGreen" | "white" | "gray";
  width?: string;
  height?: string;
  icon?: boolean;
  iconSrc?: string;
}

const cx = classNames.bind(styles);

export default function Button({
  text,
  onClick,
  className,
  width = "100%",
  height = "40px",
  color = "green",
  icon = false,
  iconSrc = "default.svg",
  ...rest
}: ButtonProps) {
  const classNames = cx("button", className, {
    [`button__${color}`]: color,
  });
  const iconPath = `/icon/${iconSrc}`;
  return (
    <button onClick={onClick} className={classNames} style={{ width, height }} {...rest}>
      {icon && <Image src={iconPath} alt="buttonIcon" width={20} height={20} />}
      {text}
    </button>
  );
}
