import { BrowserRouter } from "react-router-dom";
import { MusicPlayer } from "./components/MusicPlayer";
import { Kitty } from "./components/Kitty";
import { AppContextProvider } from "./context/AppContext";
import { Waybar } from "./components/Waybar/Waybar";
import { MusicVisualizer } from "./components/MusicVisualizer";
import { useState } from "react";

function App() {
  const [clicked, setClicked] = useState(false);

  return (
    <AppContextProvider>
      <BrowserRouter>
        {clicked ? (
          <main
            className={
              "insets-0 fixed flex h-screen w-screen flex-col gap-3 bg-[url(/wallpaper.jpg)] bg-cover p-3 font-body leading-[26px]"
            }
          >
            <Waybar />

            <Kitty className="flex-1"></Kitty>

            <div className="flex h-[142px] gap-3">
              <Kitty className="flex-1 select-none">
                <MusicPlayer />
              </Kitty>

              <Kitty className="flex-1">
                <MusicVisualizer />
              </Kitty>
            </div>
          </main>
        ) : (
          <main className="flex h-screen items-center justify-center">
            <button onClick={() => setClicked(true)}>Login</button>
          </main>
        )}
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
