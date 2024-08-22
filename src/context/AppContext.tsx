import { createContext } from "react";
import { type Prettify, type State } from "~/utils/types";

export const AppContext = createContext<
  | Prettify<
      State<"activeKitty", string> &
        State<"brightness", number> &
        State<"volume", number> & { screenWidth: number }
    >
  | undefined
>(undefined);
