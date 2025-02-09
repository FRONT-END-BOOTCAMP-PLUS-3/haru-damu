"use client";
import { usePathname } from "next/navigation";

import Subheading from "@/components/common/subheading";
import LabelValueText from "@/components/common/label_value_text";

import type { TUser } from "@/types";

interface ShippingInfoSectionProps {
  user: TUser;
}

export default function ShippingInfoSection({ user }: ShippingInfoSectionProps) {
  const pathname = usePathname();
  const isOrderForm = pathname === "/order/form";
  const { name, phone, address } = user;
  return (
    <section>
      <Subheading title={"배송 정보"} />
      {!isOrderForm && (
        <>
          <LabelValueText label={"주문자"} value={name} />
          <LabelValueText label={"휴대폰"} value={phone} />
        </>
      )}
      <LabelValueText label={"배송지"} value={address} />
    </section>
  );
}
