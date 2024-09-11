import { type ReactNode, useState, useEffect } from "react";
import { AppContext, type AppContextProps } from "~/context/AppContext";

export const AppProvider = (props: { children?: ReactNode }) => {
  const [activeKitty, setActiveKitty] = useState(":r0:");
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(100);
  const [state, setState] = useState<AppContextProps["state"]>("off");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <AppContext.Provider
      value={{
        activeKitty,
        setActiveKitty,
        brightness,
        setBrightness,
        volume,
        setVolume,
        screenWidth,
        state,
        setState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
