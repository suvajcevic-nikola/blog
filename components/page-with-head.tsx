import { ReactElement } from "react";
import Head from "next/head";

const PageWithHead = ({
  title,
  children,
}: {
  title: string;
  children: ReactElement;
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </>
);

export default PageWithHead;
