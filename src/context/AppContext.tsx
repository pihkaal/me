import { createContext } from "react";
import { type RootManifest } from "~/utils/types";

export const AppContext = createContext<
  | {
      rootManifest: RootManifest;
      activeKitty: string;
      setActiveKitty: (value: string) => void;
    }
  | undefined
>(undefined);
