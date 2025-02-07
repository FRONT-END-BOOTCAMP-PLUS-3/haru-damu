"use client";
import Subheading from "@/components/common/subheading";
import LabelValueText from "@/components/common/label_value_text";

import type { TUser } from "@/types";

interface OrdererInfoSectionProps {
  user: TUser;
}

export default function OrdererInfoSection({ user }: OrdererInfoSectionProps) {
  const { name, phone, email } = user;
  return (
    <section>
      <Subheading title={"주문자 정보"} />
      <LabelValueText label={"주문자"} value={name} />
      <LabelValueText label={"휴대폰"} value={phone} />
      <LabelValueText label={"이메일"} value={email} />
    </section>
  );
}
