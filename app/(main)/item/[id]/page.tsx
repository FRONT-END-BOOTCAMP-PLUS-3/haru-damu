import styles from "@/app/(main)/item/[id]/item_page.module.css";

import {
  PRODUCT_DETAIL_HEADERS_GROUP_ONE,
  PRODUCT_DETAIL_HEADERS_GROUP_TWO,
  PRODUCT_DETAILS_GROUP_ONE,
  PRODUCT_DETAILS_GROUP_TWO,
} from "@/constants/product";

import ItemDetailBox from "./_components/item_detail_box";
import ItemDetailTable from "./_components/item_detail_table";

import classNames from "classnames/bind";
import { dummyItem } from "@/dummys/items";
import { dummyBody, dummyHeaders } from "@/dummys/table";

const cx = classNames.bind(styles);

export default function ItemDetail() {
  return (
    <div className={cx("container")}>
      <ItemDetailBox item={dummyItem} />
      <ItemDetailTable headers={dummyHeaders} data={dummyBody} />
      <div className={cx("container__product")}>
        <ItemDetailTable headers={PRODUCT_DETAIL_HEADERS_GROUP_ONE} data={PRODUCT_DETAILS_GROUP_ONE} />
        <ItemDetailTable headers={PRODUCT_DETAIL_HEADERS_GROUP_TWO} data={PRODUCT_DETAILS_GROUP_TWO} />
      </div>
    </div>
  );
}
