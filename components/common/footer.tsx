"use client";

import styles from "@/components/common/footer.module.css";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import { ExternalLink } from "lucide-react";
import logo from "@/public/haruDamu_grayscale_logo.svg";

const cx = classNames.bind(styles);

export default function Footer() {
  const { wrapper, footer, footer__left, footer__center, footer__right } = styles;
  return (
    <footer className={wrapper}>
      <div className={cx(footer, `container`)}>
        <Link href={"/"} className={footer__left}>
          <Image src={logo} alt="logo" width={50} height={50} />
          <p className="title-lg-b">하루담은</p>
        </Link>
        <div className={footer__center}>
          <p className="text-md">Copyright © {new Date().getFullYear()} - All right reserved</p>
        </div>
        <Link
          href={"https://github.com/FRONT-END-BOOTCAMP-PLUS-3/haru-damu"}
          className={footer__right}
          target="_blank"
          prefetch={false}
          rel="noopener noreferrer"
        >
          <p className="text-md">haru-damu</p>
          <ExternalLink size={16} aria-label="haru-damu github link" />
        </Link>
      </div>
    </footer>
  );
}
