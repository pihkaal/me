import { type KittyContextProps } from "~/context/KittyContext";

export type Prettify<T> = NonNullable<{ [K in keyof T]: T[K] }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InnerKittyProps<T extends (...args: any[]) => any> = Prettify<
  Parameters<T>[0] & KittyContextProps
>;

export type RootManifest = {
  files: Array<string>;
  projects: Array<{
    name: string;
    icon: string;
  }>;
  links: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
};

export type Icon = {
  char: string;
  color: string;
};

export type File = {
  name: string;
} & (
  | {
      type: "link";
      url: string;
      icon: string;
    }
  | { type: "file"; repo: string; fileName: string; icon?: string }
);

export type Directory = {
  name: string;
  type: "directory";
  files: Array<File>;
  opened: boolean;
};
