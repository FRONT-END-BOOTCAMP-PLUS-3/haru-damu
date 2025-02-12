"use client";

import Subheading from "@/components/common/subheading";
import LabelValueText from "@/components/common/label_value_text";

import { useStore } from "@/hooks/usestore";

interface ShippingInfoSectionProps {
  fetchedAddress?: string;
}

export default function ShippingInfoSection({ fetchedAddress }: ShippingInfoSectionProps) {
  const { user } = useStore();

  const address = fetchedAddress ?? user?.address;

  return (
    <section>
      <Subheading title={"배송 정보"} />
      <LabelValueText label={"주문자"} value={user?.name} />
      <LabelValueText label={"휴대폰"} value={user?.phone} />
      <LabelValueText label={"배송지"} value={address} />
    </section>
  );
}
