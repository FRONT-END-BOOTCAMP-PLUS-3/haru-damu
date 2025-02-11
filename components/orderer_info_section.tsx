"use client";
import Subheading from "@/components/common/subheading";
import LabelValueText from "@/components/common/label_value_text";

import { useStore } from "@/hooks/usestore";


export default function OrdererInfoSection() {
  const { user } = useStore()


  return (
    <section>
      <Subheading title={"주문자 정보"} />
      <LabelValueText label={"주문자"} value={user?.name} />
      <LabelValueText label={"휴대폰"} value={user?.phone} />
      <LabelValueText label={"이메일"} value={user?.address} />
    </section>
  );
}
