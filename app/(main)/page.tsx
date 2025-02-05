import { banners } from "@/constants/banner";

import Banner from "./_components/banner";
export default function Home() {
  return (
    <div>
      <Banner bannerItem={banners} />
    </div>
  );
}
