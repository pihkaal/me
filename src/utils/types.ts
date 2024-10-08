import { type KittyContextProps } from "~/context/KittyContext";

export type Prettify<T> = NonNullable<{ [K in keyof T]: T[K] }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InnerKittyProps<T extends (...args: any[]) => any> = Prettify<
  Parameters<T>[0] & KittyContextProps
>;

export type State<
  Name extends string,
  T,
> = Name extends `${infer First}${infer Rest}`
  ? {
      [K in Name]: T;
    } & { [K in `set${Capitalize<First>}${Rest}`]: (value: T) => void }
  : never;
