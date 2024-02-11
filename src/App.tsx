import { BrowserRouter } from "react-router-dom";
import { Kitty } from "./components/Kitty";
import { AppContextProvider } from "./context/AppContext";
import { Waybar } from "./components/Waybar/Waybar";
import { useState } from "react";
import { Music } from "./components/Music/Music";

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
              <Music />{" "}
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
