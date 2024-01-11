import Head from "next/head";
import { JetBrains_Mono } from "next/font/google";
import clsx from "clsx";
import { Terminal } from "~/components/Terminal";

const text = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>pihkaal</title>
      </Head>
      <main
        className={clsx(
          "insets-0 fixed flex h-screen w-screen flex-col gap-3 bg-[url(/wallpaper.jpg)] bg-cover p-3",
          text.className,
        )}
      >
        <nav className="border border-red-500">toolbar</nav>

        <Terminal className="flex-1">nvim</Terminal>

        <div className="flex h-[15%] gap-3">
          <Terminal className="flex-1">console</Terminal>

          <Terminal className="flex-1">cava</Terminal>
        </div>
      </main>
    </>
  );
}
