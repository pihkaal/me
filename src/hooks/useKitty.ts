import { useContext } from "react";
import { KittyContext } from "~/context/KittyContext";

export const useKitty = () => useContext(KittyContext);
