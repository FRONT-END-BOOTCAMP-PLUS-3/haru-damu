"use client";
import type { TUser } from "@/types";

import Subheading from "@/app/(main)/order/form/_components/subheading";
import InlineField from "@/app/(main)/order/form/_components/inline_field";

interface ShippingInfoSectionProps {
  user: TUser;
}
export default function ShippingInfoSection({ user }: ShippingInfoSectionProps) {
  const { address } = user;
  return (
    <section>
      <Subheading title={"배송 정보"} />
      <InlineField label={"배송지"} value={address} />
    </section>
  );
}
