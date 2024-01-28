import { type Cell } from "./terminal/cell";
import { theme } from "./terminal/theme";
import { type Manifest } from "./types";

export const getExtension = (path: string) => {
  const parts = path.split(".");
  return parts[Math.max(0, parts.length - 1)] ?? "";
};

export const DEFAULT_FILE_STYLE: Cell = {
  char: "F",
  foreground: theme.white,
};

export const FILE_STYLES: Record<string, Cell> = {
  md: {
    char: "\ue73e",
    foreground: theme.blue,
  },
  asc: {
    char: "\uf43d",
    foreground: theme.yellow,
  },
};

export type File = {
  name: string;
  path: string;
} & (
  | {
      type: "file";
    }
  | {
      type: "directory";
      children: Array<File>;
      folded: boolean;
    }
);

const sortFiles = (files: Array<File>) =>
  files
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) =>
      a.type === "directory" && b.type !== "directory"
        ? -1
        : a.type !== "directory" && b.type === "directory"
          ? 1
          : 0,
    );

export const buildFileTree = (manifest: Manifest): Array<File> => {
  const files: Array<File> = [];
  manifest.projects.forEach(project => {
    if (project.name === "pihkaal") {
      project.files.forEach(file => {
        files.push({
          name: file,
          path: file,
          type: "file",
        });
      });
    } else {
      files.push({
        name: project.name,
        path: project.name,
        type: "directory",
        folded: true,
        children: sortFiles(
          project.files.map(file => ({
            name: file,
            path: `${project.name}/${file}`,
            type: "file",
          })),
        ),
      });
    }
  });

  return sortFiles(files);
};
