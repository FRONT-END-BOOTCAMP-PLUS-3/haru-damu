import { useState } from "react";

import styles from "./personal.module.css";

import { PERSONAL_BUTTON, PERSONAL_EMAIL, PERSONAL_FIELDS, PERSONAL_TITLE } from "@/constants/mypage";

import user from "@/dummys/user";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function PersonalPage() {
  // user 데이터를 기반으로 초기 상태 설정
  const [formData, setFormData] = useState(
    Object.fromEntries(PERSONAL_FIELDS.map(({ key }) => [key, user[key] || ""])), // user 데이터 활용
  );

  // TODO: API 연동
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={cx("personal")}>
      <h2 className={cx("personal__title", "title-lg-b")}>{PERSONAL_TITLE}</h2>
      <hr className={cx("personal__divider")} />

      <div className={cx("personal__form")}>
        <div className={cx("personal__row")}>
          <label className={cx("personal__label")}>{PERSONAL_EMAIL}</label>
          <span className={cx("personal__email")}>{user.email}</span>
        </div>

        {PERSONAL_FIELDS.map(({ key, label }) => (
          <div className={cx("personal__row")} key={key}>
            <label className={cx("personal__label")}>{label}</label>
            <input
              type="text"
              className={cx("personal__input")}
              // TODO: value와 onChange를 이용하여 input에 데이터를 바인딩
              value={user[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className={cx("personal__button", "text-md")}>{PERSONAL_BUTTON}</button>
    </div>
  );
}
