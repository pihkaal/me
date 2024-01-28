import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTerminal } from "~/context/TerminalContext";
import {
  DEFAULT_FILE_STYLE,
  FILE_STYLES,
  getExtension,
  type File,
} from "~/utils/filesystem";
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

export const NvimTree = (props: { files: Array<File> }) => {
  const [selected, setSelected] = useState(0);
  const [files, setFiles] = useState(props.files);
  const navigate = useNavigate();

  const { cols: width, rows: height } = useTerminal();
  const canvas = new TerminalRenderer(width * 0.2, height - 2, {
    background: "#0000001a",
  });

  const tree = new TerminalRenderer(canvas.width - 3, height - 1);
  tree.write(0, selected, " ".repeat(tree.width), { background: "#504651" });

  let y = 0;
  let indent = 0;
  const renderTree = (files: Array<File>) => {
    files.forEach(file => {
      if (file.type === "directory") {
        tree.apply(2 + indent * 2, y, {
          char: file.folded ? "\ue6ad" : "\ueaf6",
          foreground: theme.blue,
        });

        tree.apply(indent * 2, y, file.folded ? PATH_FOLDED : PATH_UNFOLDED);
        tree.write(4 + indent * 2, y, file.name, {
          foreground: theme.blue,
        });

        y++;
        if (!file.folded) {
          indent++;
          renderTree(file.children);
          indent--;
        }
      } else {
        const style =
          FILE_STYLES[getExtension(file.name)] ?? DEFAULT_FILE_STYLE;
        tree.apply(2 + indent * 2, y, style);

        if (file.name === "README.md") {
          tree.write(4 + indent * 2, y, file.name, {
            foreground: theme.yellow,
            fontWeight: 800,
          });
        } else {
          tree.write(4 + indent * 2, y, file.name);
        }
        y++;
      }
    });
  };

  useEffect(() => {
    const onScroll = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          setSelected(x => Math.max(0, x - 1));
          break;

        case "ArrowDown":
          setSelected(x => Math.min(y - 1, x + 1));
          break;

        case "Enter":
          let y = 0;
          const findFile = (files: Array<File>): File | null => {
            for (const f of files) {
              if (y === selected) {
                return f;
              }
              y++;
              if (f.type === "directory" && !f.folded) {
                const found = findFile(f.children);
                if (found) return found;
              }
            }

            return null;
          };

          const current = findFile(files);
          if (!current) {
            setSelected(0);
            return;
          }

          if (current.type === "directory") {
            current.folded = !current.folded;
            setFiles([...files]);
          } else {
            //document.location.href = `?view=${current.path}`
            navigate(`?view=${current.path}`);
          }
          break;
      }
    };

    window.addEventListener("keydown", onScroll);

    return () => {
      window.removeEventListener("keydown", onScroll);
    };
  });

  renderTree(files);

  canvas.writeElement(tree, 2, 1);

  return <p>{canvas.render()}</p>;
};
