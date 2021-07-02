import Image from "next/image";
import { AppLayout } from "../lib";
import globe from "../lib/images/globe-drawing.png";
import { HomeHeader, HomeBody } from "../lib/styles";

export default function Home() {
  return (
    <AppLayout>
      <HomeHeader>
        <Image src={globe} width="65px" height="80px" alt="Globe" />
      </HomeHeader>
      <HomeBody>
        <div>
          <div>
            Hi. With this application, you can learn something about your home,
            Earth.
          </div>
          <article>
            <h3>Quick facts</h3>
            <div>Total countries - 199</div>
            <div>Totao cities - 23, 845</div>
          </article>
        </div>
      </HomeBody>
    </AppLayout>
  );
}
