import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Layout from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
