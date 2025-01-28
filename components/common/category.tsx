import Link from "next/link";
import Image from "next/image";

import style from "@/components/common/category.module.css";

import type { TCategory } from "@/constants/categories";

interface CategoryProps {
  category: TCategory;
}

export default function Category({ category }: CategoryProps) {
  const { button, image_wrapper } = style;

  return (
    <li key={category.order}>
      <Link className={button} href={`/category?value=${category.key}`}>
        <div className={image_wrapper}>
          <Image src={category.img} alt={category.key} width={114} height={114} />
        </div>
        <span className="text-md">{category.kor}</span>
      </Link>
    </li>
  );
}
