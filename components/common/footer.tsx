"use client";

import Link from "next/link";
import Image from "next/image";

import styles from "@/components/common/footer.module.css";

import classNames from "classnames/bind";
import { ExternalLink } from "lucide-react";
import { BRAND_NAMES, EXTERNAL_URLS } from "@/constants";
import footerLogo from "@/public/haruDamu_grayscale_logo.svg";

const cx = classNames.bind(styles);

export default function Footer() {
  const { wrapper, footer, footer__left, footer__center, footer__right } = styles;
  return (
    <footer className={wrapper}>
      <div className={cx(footer, `container`)}>
        <Link href={"/"} className={footer__left}>
          <Image src={footerLogo} alt="logo" width={50} height={50} />
          <p className="title-lg-b">{BRAND_NAMES.KOREAN}</p>
        </Link>
        <div className={footer__center}>
          <p className="text-md">Copyright © 2025 - All right reserved</p>
        </div>
        <Link
          href={EXTERNAL_URLS.GITHUB}
          className={footer__right}
          target="_blank"
          prefetch={false}
          rel="noopener noreferrer"
        >
          <p className="text-md">{BRAND_NAMES.LOWERCASE_ENGLISH}</p>
          <ExternalLink size={16} aria-label={`${BRAND_NAMES.LOWERCASE_ENGLISH} github link`} />
        </Link>
      </div>
    </footer>
  );
}
