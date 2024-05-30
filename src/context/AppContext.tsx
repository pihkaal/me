import { createContext } from "react";

export const AppContext = createContext<
  { activeKitty: string; setActiveKitty: (value: string) => void } | undefined
>(undefined);
