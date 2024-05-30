import { createContext } from "react";

export const KittyContext = createContext<KittyContextProps | undefined>(
  undefined,
);

export type KittyContextProps = {
  rows: number;
  cols: number;
  active: boolean;
};
