import { ReactElement } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Button from "./button";
import githubIcon from "@/public/github.svg";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: ReactElement | ReactElement[];
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={`m-auto flex max-w-[1920px] flex-col ${inter.className}`}>
      <header className="fixed flex h-28 w-full items-center justify-center border-2 border-neutral-400 px-8 backdrop-blur-sm sm:static">
        <Link href="/" className="text-center text-7xl font-bold text-white">
          BLOG
        </Link>
      </header>
      <main className="h-full min-h-screen w-full border-x-2 border-neutral-400 pt-28 sm:pt-0">
        {children}
      </main>
      <footer className="flex h-28 w-full flex-col items-center justify-between border-2 border-neutral-400 px-8 py-4 text-center text-lg font-bold text-white sm:flex-row">
        <p className="overflow-hidden text-ellipsis">
          <span className="font-light italic">by </span>
          <span>Nikola Suvajcevic</span>
        </p>
        <Button>
          <Link
            href="https://github.com/suvajcevic-nikola/blog"
            target="_blank"
            className="flex items-center justify-center gap-4"
          >
            <span>GitHub</span>
            <Image width={28} src={githubIcon} alt="Source code on GitHub" />
          </Link>
        </Button>
      </footer>
    </div>
  );
};

export default Layout;
