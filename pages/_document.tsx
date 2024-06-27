import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from '@vercel/analytics/react';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Blog App" />
        <meta charSet="utf-8" />
      </Head>
      <body className="bg-neutral-900">
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
