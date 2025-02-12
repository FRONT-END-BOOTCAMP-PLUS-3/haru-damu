"use client";

import Subheading from "@/components/common/subheading";
import LabelValueText from "@/components/common/label_value_text";

import { useStore } from "@/hooks/usestore";

interface ShippingInfoSectionProps {
  fetchedName?: string;
  fetchedPhone?: string;
  fetchedAddress?: string;
}

export default function ShippingInfoSection({ fetchedName, fetchedPhone, fetchedAddress }: ShippingInfoSectionProps) {
  const { user } = useStore();

  const name = fetchedName ?? user?.name;
  const phone = fetchedPhone ?? user?.phone;
  const address = fetchedAddress ?? user?.address;

  return (
    <section>
      <Subheading title={"배송 정보"} />
      <LabelValueText label={"주문자"} value={name} />
      <LabelValueText label={"휴대폰"} value={phone} />
      <LabelValueText label={"배송지"} value={address} />
    </section>
  );
}
