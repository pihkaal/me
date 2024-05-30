import { type ReactNode, createContext, useContext, useState } from "react";

export const AppContext = createContext<
  { activeKitty: string; setActiveKitty: (value: string) => void } | undefined
>(undefined);

export const useApp = () => {
  const app = useContext(AppContext);
  if (!app) throw new Error("`useApp` used outside AppContext");

  return app;
};

export const AppProvider = (props: { children?: ReactNode }) => {
  const [activeKitty, setActiveKitty] = useState(":r0:");

  return (
    <AppContext.Provider value={{ activeKitty, setActiveKitty }}>
      {props.children}
    </AppContext.Provider>
  );
};
