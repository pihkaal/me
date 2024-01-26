import Head from "next/head";
import { Terminal } from "~/components/Terminal";
import { MusicVisualizer } from "~/components/MusicVisualizer";
import { MusicPlayer } from "~/components/MusicPlayer";

export default function Home() {
  return (
    <>
      <Head>
        <title>pihkaal</title>
      </Head>
      <main
        className={
          "insets-0 fixed flex h-screen w-screen flex-col gap-3 bg-[url(/wallpaper.jpg)] bg-cover p-3 font-body"
        }
      >
        <nav className="border border-red-500">toolbar</nav>

        <Terminal className="flex-1">nvim</Terminal>

        <div className="flex gap-3">
          <Terminal className="flex-1">
            <MusicPlayer
              title="Last Tango in Kyoto"
              artist="Floating Bits"
              album="Last Tango in Kyoto"
              duration={93}
            />
          </Terminal>

          <Terminal className="flex-1">
            <MusicVisualizer />
          </Terminal>
        </div>
      </main>
    </>
  );
}
