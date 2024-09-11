import { createContext } from "react";
import { type Prettify, type State } from "~/utils/types";

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export type AppContextProps = Prettify<
  State<"state", "off" | "suspend" | "reboot" | "boot" | "login" | "desktop"> &
    State<"activeKitty", string> &
    State<"brightness", number> &
    State<"volume", number> & { screenWidth: number }
>;
