import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ErrorBoundary, Layout } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Layout>
  );
}
