import { useState } from "react";
import { Kitty } from "./components/Kitty";
import { AppProvider } from "./providers/AppProvider";
import { Music } from "./components/Music";
import { Nvim } from "./components/Nvim";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        <main className="h-screen w-screen overflow-hidden bg-[url(/wallpaper.jpg)] bg-cover">
          {loggedIn ? (
            <div className="flex h-full w-full flex-col">
              <Kitty className="w-full flex-1 pb-1 pl-2 pr-2 pt-2">
                <Nvim />
              </Kitty>

              <Music />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <button
                className="rounded-md border border-black px-2 py-1 hover:border-2 hover:font-bold"
                onClick={() => setLoggedIn(true)}
              >
                Log in
              </button>
            </div>
          )}
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}
