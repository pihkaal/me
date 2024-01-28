import { MusicPlayer } from "./components/MusicPlayer";
import { MusicVisualizer } from "./components/MusicVisualizer";
import { Nvim } from "./components/Nvim/Nvim";
import { Terminal } from "./components/Terminal";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <main
        className={
          "insets-0 fixed flex h-screen w-screen flex-col gap-3 bg-[url(/wallpaper.jpg)] bg-cover p-3 font-body leading-[26px]"
        }
      >
        <nav className="border border-red-500">toolbar</nav>

        <Terminal className="flex-1">
          <Nvim />
        </Terminal>

        <div className="flex gap-3">
          <Terminal className="flex-1 select-none">
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
    </AppContextProvider>
  );
}

export default App;
