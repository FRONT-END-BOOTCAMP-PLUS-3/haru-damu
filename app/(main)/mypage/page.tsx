import UserAside from "@/components/common/user_aside";

import MypageState from "@/app/(main)/mypage/_components/mypage_state";
// import HealthPage from "@/app/(main)/mypage/components/settings";
// import PersonalPage from "@/app/(main)/mypage/components/profile";
// import NutritionPage from "@/app/(main)/mypage/components/nutrition";

import styles from "./mypage.module.css";

import user from "@/dummys/user";
import health from "@/dummys/health";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function MypagePage() {
  return (
    <div className={cx("container")}>
      <div className={cx("mypage__wrapper")}>
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
