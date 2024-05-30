import { KittyContextProps } from "~/context/KittyContext";

export type Prettify<T> = NonNullable<{ [K in keyof T]: T[K] }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InnerKittyProps<T extends (...args: any[]) => any> = Prettify<
  Parameters<T>[0] & KittyContextProps
>;

export type Manifest = {
  projects: Array<{
    name: string;
    files: Array<string>;
  }>;
};
