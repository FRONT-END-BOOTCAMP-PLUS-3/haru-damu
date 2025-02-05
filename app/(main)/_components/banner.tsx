"use client";
import Image from "next/image";

import { useState, useEffect } from "react";

import styles from "@/app/(main)/_components/banner.module.css";

import classNames from "classnames/bind";
import { CircleArrowRight, CircleArrowLeft } from "lucide-react";

const cx = classNames.bind(styles);

const banners = [
  { id: 1, image: "/banner/bread.jpg" },
  { id: 2, image: "/banner/fish.jpg" },
  { id: 3, image: "/banner/meet.jpg" },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000); // 5초마다 변경
    return () => clearInterval(interval); // cleanup
  }, [currentIndex]); // 🔥 의존성 배열에 currentIndex 추가

  return (
    <div className={cx("banner")}>
      <button className={cx("banner__arrow")} onClick={goToPrev}>
        <CircleArrowLeft />
      </button>
      <div className={cx("banner__slider")}>
        {banners.map((banner, index) => (
          <Image
            key={banner.id}
            src={banner.image}
            alt={`배너 ${banner.id}`}
            width={1080}
            height={300}
            className={cx("banner__image", {
              "banner__image--active": index === currentIndex,
            })}
            priority
          />
        ))}
      </div>
      <button className={cx("banner__arrow")} onClick={goToNext}>
        <CircleArrowRight />
      </button>
    </div>
  );
}
