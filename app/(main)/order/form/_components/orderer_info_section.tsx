"use client";
import type { TUser } from "@/types";

import Subheading from "@/app/(main)/order/form/_components/subheading";
import InlineField from "@/app/(main)/order/form/_components/inline_field";

interface OrdererInfoSectionProps {
  user: TUser;
}

export default function OrdererInfoSection({ user }: OrdererInfoSectionProps) {
  const { name, phone, email } = user;
  return (
    <section>
      <Subheading title={"주문자 정보"} />
      <InlineField label={"주문자"} value={name} />
      <InlineField label={"휴대폰"} value={phone} />
      <InlineField label={"이메일"} value={email} />
    </section>
  );
}
