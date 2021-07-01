import "../styles/globals.css";
import GlobalStyles from "../styles/GlobalStyles";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <GlobalStyles />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
export default MyApp;
