import Link from "next/link";
import { FC } from "react";
import { AppLayoutWrapper, Header, Main, Footer, Navigation } from "./styles";

export const AppLayout: FC<{}> = ({ children }) => {
  return (
    <AppLayoutWrapper>
      <Header>
        <Navigation>
          <ul>
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/cities">CITIES</Link>
            </li>
            <li>
              <Link href="/countries">COUNTRIES</Link>
            </li>
          </ul>
        </Navigation>
      </Header>
      <Main>{children}</Main>
      <Footer>Copyright &copy;{new Date().getFullYear()}</Footer>
    </AppLayoutWrapper>
  );
};
