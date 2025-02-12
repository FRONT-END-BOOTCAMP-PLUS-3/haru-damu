"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import type { MouseEvent } from "react";
import { useState, useEffect } from "react";

import styles from "@/app/(main)/_components/banner.module.css";

import type { Banner } from "@/constants/banner";

import classNames from "classnames/bind";
import { CircleArrowRight, CircleArrowLeft } from "lucide-react";

interface BannerProps {
  bannerItem: Banner[];
}
const cx = classNames.bind(styles);

export default function Banner({ bannerItem }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleBannerClick = () => {
    const currentBanner = bannerItem[currentIndex];
    router.push(`/category?value=${encodeURIComponent(currentBanner.categoryName)}`);
  };
  const goToNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % bannerItem.length);
  };

  const goToPrev = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + bannerItem.length) % bannerItem.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={cx("banner")} onClick={handleBannerClick}>
      <button className={cx("banner__arrow")} onClick={goToPrev}>
        <CircleArrowLeft />
      </button>
      {bannerItem.map((banner, index) => (
        <Image
          key={banner.categoryId}
          src={banner.image}
          alt={`배너 ${banner.categoryName}`}
          width={1080}
          height={300}
          className={cx("banner__image", {
            "banner__image--active": index === currentIndex,
          })}
          priority
        />
      ))}
      <button className={cx("banner__arrow")} onClick={goToNext}>
        <CircleArrowRight />
      </button>
    </div>
  );
}
