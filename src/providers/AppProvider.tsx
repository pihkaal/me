import { type ReactNode, useState } from "react";
import { AppContext } from "~/context/AppContext";

export const AppProvider = (props: { children?: ReactNode }) => {
  const [activeKitty, setActiveKitty] = useState(":r0:");
  return (
    <AppContext.Provider value={{ activeKitty, setActiveKitty }}>
      {props.children}
    </AppContext.Provider>
  );
};
