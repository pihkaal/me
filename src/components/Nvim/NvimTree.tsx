import { useState, useEffect } from "react";
import { useTerminal } from "~/context/TerminalContext";
import { type Cell } from "~/utils/terminal/cell";
import { TerminalRenderer } from "~/utils/terminal/renderer";
import { theme } from "~/utils/terminal/theme";

const PATH_FOLDED: Cell = {
  char: "",
  foreground: theme.grey,
};

const PATH_UNFOLDED: Cell = {
  char: "",
  foreground: theme.blue,
};

const FILE_STYLES = {
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

type FileType = keyof typeof FILE_STYLES;

type File = {
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

const FILES_SRC: Array<File> = [
  { name: "projects", type: "directory", children: [], folded: true },
  { name: "README.md", type: "md" },
  { name: "LICENSE.md", type: "md" },
  { name: "prout", type: "directory", children: [], folded: true },
  { name: "hello", type: "directory", children: [], folded: true },
  { name: "pubkey.asc", type: "asc" },
];

export const NvimTree = () => {
  const [selected, setSelected] = useState(0);
  const [files, setFiles] = useState(
    FILES_SRC.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) =>
      a.type === "directory" && b.type !== "directory"
        ? -1
        : a.type !== "directory" && b.type === "directory"
          ? 1
          : 0,
    ),
  );

  const { cols: width, rows: height } = useTerminal();
  const canvas = new TerminalRenderer(width * 0.2, height - 2, {
    background: "#0000001a",
  });

  const tree = new TerminalRenderer(canvas.width - 3, height - 1);

  useEffect(() => {
    const onScroll = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          setSelected(x => Math.max(0, x - 1));
          break;

        case "ArrowDown":
          setSelected(x => Math.min(files.length - 1, x + 1));
          break;

        case "Enter":
          const newFiles = [...files];

          const file = newFiles[selected];
          if (file?.type === "directory") {
            file.folded = !file.folded;
          }

          setFiles(newFiles);
          break;
      }
    };

    window.addEventListener("keydown", onScroll);

    return () => {
      window.removeEventListener("keydown", onScroll);
    };
  });

  tree.write(0, selected, " ".repeat(tree.width), { background: "#504651" });

  files.forEach((file, y) => {
    tree.apply(2, y, FILE_STYLES[file.type]);

    if (file.type === "directory") {
      tree.apply(0, y, file.folded ? PATH_FOLDED : PATH_UNFOLDED);

      tree.write(4, y, file.name, {
        foreground: FILE_STYLES.directory.foreground,
      });
    } else {
      if (file.name === "README.md") {
        tree.write(4, y, file.name, {
          foreground: theme.yellow,
          fontWeight: 800,
        });
      } else {
        tree.write(4, y, file.name);
      }
    }
  });

  canvas.writeElement(tree, 2, 1);

  return <p>{canvas.render()}</p>;
};
