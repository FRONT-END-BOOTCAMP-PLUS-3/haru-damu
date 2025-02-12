import { useEffect, useState } from "react";

import { useStore } from "@/hooks/usestore";

import styles from "./personal.module.css";

import {
  PERSONAL_BUTTON,
  PERSONAL_DELETE_BUTTON,
  PERSONAL_EMAIL,
  PERSONAL_FIELDS,
  PERSONAL_TITLE,
} from "@/constants/mypage";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function PersonalPage() {
  const { getUser, addMessage } = useStore();

  const [formData, setFormData] = useState(
    Object.fromEntries(PERSONAL_FIELDS.map(({ key }) => [key, ""])), // 초기값은 빈 값으로 설정
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/mypage/personal`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();

    getUser();
  }, [getUser]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/mypage/personal`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      addMessage("저장되었습니다.");
      window.location.reload(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/mypage/personal`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user data");
      }
      addMessage("탈퇴되었습니다.");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={cx("personal")}>
      <h2 className={cx("personal__title", "title-lg-b")}>{PERSONAL_TITLE}</h2>
      <hr className={cx("personal__divider")} />

      <div className={cx("personal__form")}>
        <div className={cx("personal__row")}>
          <label className={cx("personal__label")}>{PERSONAL_EMAIL}</label>
          <span className={cx("personal__email")}>{formData.email}</span>
        </div>

        {PERSONAL_FIELDS.map(({ key, label }) => (
          <div className={cx("personal__row")} key={key}>
            <label className={cx("personal__label")}>{label}</label>
            <input
              type="text"
              className={cx("personal__input")}
              value={formData[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className={cx("personal__button", "text-md")} onClick={handleSave}>
        {PERSONAL_BUTTON}
      </button>
      <button className={cx("personal__delete_button", "text-md")} onClick={handleDelete}>
        {PERSONAL_DELETE_BUTTON}
      </button>
    </div>
  );
}
