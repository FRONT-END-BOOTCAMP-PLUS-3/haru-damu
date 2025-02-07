import style from "@/components/common/spinner.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(style);

export default function Spinner() {
  return (
    <div className={cx("spinner-container")}>
      <div className={cx("spinner")}></div>
    </div>
  );
}
