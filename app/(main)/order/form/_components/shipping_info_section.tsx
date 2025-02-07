"use client";
import Subheading from "@/components/common/subheading";
import LabelValueText from "@/components/common/label_value_text";

import type { TUser } from "@/types";

interface ShippingInfoSectionProps {
  user: TUser;
}
export default function ShippingInfoSection({ user }: ShippingInfoSectionProps) {
  const { address } = user;
  return (
    <section>
      <Subheading title={"배송 정보"} />
      <LabelValueText label={"배송지"} value={address} />
    </section>
  );
}
