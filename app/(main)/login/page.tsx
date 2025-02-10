"use client";

import Image from "next/image";

import Button from "@/components/common/button";

import { useStore } from "@/hooks/usestore";

import { googleLogin } from "@/utils/supabase/google_login";

import styles from "@/app/(main)/login/login_page.module.css";

import type { TUserType } from "@/stores/user_store";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Auth() {
  const { addMessage } = useStore();

  const loginHandler = async (type: TUserType) => {
    try {
      await googleLogin(type);
    } catch (error) {
      addMessage("로그인에 실패하였습니다. 잠시 후 다시 시도해주세요!", "ver(--important-color)");
    }
  };
  return (
    <div className={cx("container")}>
      <div className={cx("container__login")}>
        <div className={cx("container__title")}>
          <h1 className={cx("title-lg-b")}>회원가입 / 로그인 하기</h1>
          <span className={cx("title-sm")}>소셜 로그인으로 간편하게 가입할수 있습니다.</span>
        </div>

        <div className={cx("container__login__button")}>
          <Button
            width="320px"
            height="52px"
            className={cx("text-md")}
            text="회원 Login with Google"
            onClick={() => loginHandler("user")}
            iconComponent={
              <Image
                width={20}
                height={20}
                src="/icon/google.svg"
                alt="Google Icon"
                className={cx("container__icon")}
              />
            }
          />
          <Button
            width="320px"
            height="52px"
            className={cx("text-md")}
            text="판매자 Login with Google"
            onClick={() => loginHandler("partner")}
            iconComponent={
              <Image
                width={20}
                height={20}
                src="/icon/google.svg"
                alt="Google Icon"
                className={cx("container__icon")}
              />
            }
          />
        </div>
        <span className={cx("text-xsm")}>Sign in with social accounts</span>
      </div>
    </div>
  );
}
