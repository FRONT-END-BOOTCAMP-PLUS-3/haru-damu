import styles from "@/app/(main)/item/[id]/_components/item_detail_table.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface TableRowData {
  [key: string]: string | number;
}

interface ItemDetailNutritionTableProps {
  data: TableRowData[];
  headers: { key: string; label: string }[];
  className?: string;
}

export default function ItemDetailTable({ data, headers }: ItemDetailNutritionTableProps) {
  return (
    <table className={cx("table")}>
      <thead>
        <tr className={cx("table__head", "text-lg-b")}>
          {headers.map((header) => (
            <th className={cx("table__head__title")} key={header.key}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cx("table__body")}>
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => (
              <td className={cx("table__description", "text-md")} key={header.key}>
                {row[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
