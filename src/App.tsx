import { BrowserRouter } from "react-router-dom";
import { MusicPlayer } from "./components/MusicPlayer";
import { MusicVisualizer } from "./components/MusicVisualizer";
import { Nvim } from "./components/Nvim/Nvim";
import { Kitty } from "./components/Kitty";
import { AppContextProvider } from "./context/AppContext";
import { Waybar } from "./components/Waybar/Waybar";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <main
          className={
            "insets-0 fixed flex h-screen w-screen flex-col gap-3 bg-[url(/wallpaper.jpg)] bg-cover p-3 font-body leading-[26px]"
          }
        >
          <Waybar />

          <Kitty className="flex-1"></Kitty>

          <div className="flex gap-3 h-[142px]">
            <Kitty className="flex-1 select-none">
              <MusicPlayer
                title="Last Tango in Kyoto"
                artist="Floating Bits"
                album="Last Tango in Kyoto"
                duration={93}
              />
            </Kitty>

            <Kitty className="flex-1"></Kitty>
          </div>
        </main>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
