import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Blog App" />
        <meta charSet="utf-8" />
      </Head>
      <body className="bg-neutral-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
