"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    router.push(`/category?id=${encodeURIComponent(currentBanner.categoryName)}`);
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % bannerItem.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + bannerItem.length) % bannerItem.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={cx("banner")}>
      <button className={cx("banner__arrow")} onClick={goToPrev}>
        <CircleArrowLeft />
      </button>
      <div>
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
            onClick={handleBannerClick}
          />
        ))}
      </div>
      <button className={cx("banner__arrow")} onClick={goToNext}>
        <CircleArrowRight />
      </button>
    </div>
  );
}
