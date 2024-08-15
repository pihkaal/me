import { useState } from "react";
import { Kitty } from "./components/Kitty";
import { AppProvider } from "./providers/AppProvider";
import { Music } from "./components/Music";
import { Nvim } from "./components/Nvim";
import { Waybar } from "./components/Waybar";
import { useApp } from "./hooks/useApp";
import { clamp } from "./utils/math";

const AppRoot = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { brightness } = useApp();

  const opacity = clamp(0.5 - (0.5 * brightness) / 100, 0, 0.5);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-10 bg-black"
        style={{ opacity }}
      />
      <main className="h-screen w-screen overflow-hidden bg-[url(/wallpaper.jpg)] bg-cover">
        {loggedIn ? (
          <div className="h-full flex-col">
            <div className="relative z-10 px-2 py-2">
              <Waybar />
            </div>

            <div className="relative flex h-[calc(100%-50px)] w-full flex-col">
              <Kitty className="w-full flex-1 pb-1 pl-2 pr-2 pt-1">
                <Nvim />
              </Kitty>

              <Music />
            </div>
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
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRoot />
    </AppProvider>
  );
}
