import { createContext, useContext } from "react";

export const KittyContext = createContext<KittyContextProps | undefined>(
  undefined,
);

export const useKitty = () => useContext(KittyContext);

export type KittyContextProps = {
  rows: number;
  cols: number;
  active: boolean;
};

type Prettify<T> = NonNullable<{ [K in keyof T]: T[K] }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InnerKittyProps<T extends (...args: any[]) => any> = Prettify<
  Parameters<T>[0] & KittyContextProps
>;
