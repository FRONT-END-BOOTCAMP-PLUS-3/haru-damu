import { useState } from "react";

import styles from "./personal.module.css";

import user from "@/dummys/user";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function PersonalPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // TODO: API 연동
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={cx("personal")}>
      <h2 className={cx("personal__title", "title-lg-b")}>개인정보</h2>
      <hr className={cx("personal__divider")} />

      <div className={cx("personal__form")}>
        <div className={cx("personal__row")}>
          <label className={cx("personal__label")}>이메일</label>
          <span className={cx("personal__email")}>{user.email}</span>
        </div>

        {[
          { key: "name", label: "이름" },
          { key: "phone", label: "전화번호" },
          { key: "address", label: "주소" },
        ].map(({ key, label }) => (
          <div className={cx("personal__row")} key={key}>
            <label className={cx("personal__label")}>{label}</label>
            <input
              type="text"
              className={cx("personal__input")}
              // TODO: value와 onChange를 이용하여 input에 데이터를 바인딩
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className={cx("personal__button", "text-md")}>저장하기</button>
    </div>
  );
}
