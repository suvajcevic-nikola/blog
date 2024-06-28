import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ErrorBoundary, Layout } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ErrorBoundary>
        <Component {...pageProps} />
        <Analytics mode={"production"} />
      </ErrorBoundary>
    </Layout>
  );
}
