import { Kitty } from "./components/Kitty";
import { AppProvider } from "./providers/AppProvider";
import { Music } from "./components/Music";
import { Nvim } from "./components/Nvim";
import { Waybar } from "./components/Waybar";
import { useApp } from "./hooks/useApp";
import { clamp } from "./utils/math";
import { Sddm } from "./components/Sddm";
import { Boot } from "./components/Boot";
import { Off } from "./components/Off";

const AppRoot = () => {
  const { brightness, state } = useApp();

  const opacity = clamp(0.5 - (0.5 * brightness) / 100, 0, 0.5);

  if (state === "off" || state === "reboot" || state === "suspend") {
    return <Off />;
  }

  if (state === "boot") {
    return <Boot />;
  }

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-20 bg-black"
        style={{ opacity }}
      />
      <main className="h-[100svh] w-screen overflow-hidden bg-[url(/wallpaper.webp)] bg-cover bg-center">
        {state === "login" ? (
          <Sddm />
        ) : (
          <div className="h-full flex-col">
            <div className="relative z-10 p-1 md:p-2">
              <Waybar />
            </div>

            <div className="relative flex h-[calc(100svh-39px)] w-full flex-col md:h-[calc(100svh-50px)]">
              <Kitty className="w-full flex-1 px-1 pt-1 md:px-2 md:pb-1">
                <Nvim />
              </Kitty>

              <Music />
            </div>
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
