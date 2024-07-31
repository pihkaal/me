import { type ReactNode, useState } from "react";
import { AppContext } from "~/context/AppContext";

export const AppProvider = (props: { children?: ReactNode }) => {
  const [activeKitty, setActiveKitty] = useState(":r0:");
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(100);

  return (
    <AppContext.Provider
      value={{
        activeKitty,
        setActiveKitty,
        brightness,
        setBrightness,
        volume,
        setVolume,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
