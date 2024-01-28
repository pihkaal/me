import { type Cell } from "./terminal/cell";
import { theme } from "./terminal/theme";

export const FILE_STYLES = {
  directory: {
    char: "\ue6ad", //  \ue6ad ||| \ueaf6
    foreground: theme.blue,
  },
  md: {
    char: "\ue73e",
    foreground: theme.blue,
  },
  asc: {
    char: "\uf43d",
    foreground: theme.yellow,
  },
} as const satisfies Record<string, Cell>;

export type FileType = keyof typeof FILE_STYLES;

export type File = {
  name: string;
} & (
  | {
      type: Exclude<FileType, "directory">;
    }
  | {
      type: "directory";
      children: Array<File>;
      folded: boolean;
    }
);
