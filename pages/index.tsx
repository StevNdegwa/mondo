import Image from "next/image";
import { AppLayout } from "../lib/components";
import globe from "../lib/images/globe-drawing.png";
import { HomeHeader, HomeBody } from "../lib/styles";

export default function Home() {
  return (
    <AppLayout>
      <HomeHeader>
        <Image src={globe} width="65px" height="80px" alt="Globe" />
      </HomeHeader>
      <HomeBody>
        <div></div>
      </HomeBody>
    </AppLayout>
  );
}
