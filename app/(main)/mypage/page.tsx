"use client";

import UserAside from "@/components/common/user_aside";
import MypageState from "@/app/(main)/mypage/_components/mypage_state";

import { useStore } from "@/hooks/usestore";

import styles from "./mypage.module.css";

import user from "@/dummys/user";
import health from "@/dummys/health";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function MypagePage() {
  const { isShrunk } = useStore();

  return (
    <div className={cx("container")}>
      <div className={cx("mypage__wrapper", isShrunk && "mypage__wrapper__padding_top")}>
        {/* 왼쪽: UserAside 고정 */}
        <div className={cx("mypage__aside-wrapper")}>
          <UserAside user={user} health={health} />
        </div>

        {/* 오른쪽: 선택된 페이지 렌더링 */}
        <main className={cx("mypage_content")}>
          <MypageState />
        </main>
      </div>
    </div>
  );
}
