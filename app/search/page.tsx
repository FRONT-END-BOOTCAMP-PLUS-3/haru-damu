import Footer from "@/components/common/footer";
import VerticalItem from "@/components/common/vertical_item";

import getBlurImg from "@/utils/get_blur_img";

import styles from "@/app/search/search_page.module.css";

import type { TItem } from "@/types";

import items from "@/dummys/items";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default async function SearchPage() {
  // service에서 유틸을 이용해 blur이미지 생성
  const newItems: TItem[] = await Promise.all(
    items.map(async (item) => {
      const blurImg = await getBlurImg(item.img);
      return { ...item, blurImg, img: item.img };
    }),
  );

  return (
    <>
      <div className={cx("container", "search_page")}>
        <h1 className={cx("title", "title-lg-b")}>상품 검색 결과</h1>
        <ul className={cx("item_list")}>
          {newItems.map((item) => (
            <VerticalItem key={item.item_id} item={item} />
          ))}
        </ul>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
