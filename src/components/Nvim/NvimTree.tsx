import { useApp } from "~/hooks/useApp";
import { CHAR_HEIGHT, CHAR_WIDTH } from "../Kitty";
import { type ReactNode, useEffect, useState, useCallback } from "react";
import { type InnerKittyProps } from "~/utils/types";
import { type Nvim } from ".";
import { useNavigate } from "react-router-dom";

type FileIcon = {
  char: string;
  color: string;
};

type File = {
  name: string;
} & (
  | { type: "file"; directory?: File & { type: "directory" } }
  | { type: "directory"; files: Array<string>; folded: boolean }
);

const FILE_ICONS: Record<string, FileIcon> = {
  md: {
    char: " ",
    color: "#89bafa",
  },
  asc: {
    char: "󰷖 ",
    color: "#f9e2af",
  },
  UNKNOWN: { char: "󰈚 ", color: "#f599ae" },
};

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

export const NvimTree = (props: InnerKittyProps<typeof Nvim>) => {
  const { rootManifest, activeKitty } = useApp();
  const navigate = useNavigate();

  const [files, setFiles] = useState<Array<File>>(
    sortFiles([
      {
        type: "directory",
        name: "projects",
        files: rootManifest.projects,
        folded: true,
      },
      ...rootManifest.files.map((name) => ({ type: "file" as const, name })),
    ]),
  );
  const [selected, setSelected] = useState(files.length - 1);

  const handleOpen = (file: File) => {
    if (file.type === "directory") {
      file.folded = !file.folded;
    } else {
      let filePath = "";
      if (file.directory) {
        filePath += `${file.directory.name}/`;
      }

      navigate(`?view=${filePath}${file.name}`);
    }

    setFiles([...files]);
  };

  const tree: Array<ReactNode> = [];
  let y = 0;
  let selectedFile: File;
  for (const fileOrDir of files) {
    if (y === selected) selectedFile = fileOrDir;
    if (fileOrDir.type === "directory") {
      const dy = y;
      tree.push(
        <li
          key={y}
          className="text-[#a0b6ee]"
          style={{ background: y === selected ? "#504651" : "" }}
          onMouseDown={() => setSelected(dy)}
          onDoubleClick={() => handleOpen(fileOrDir)}
        >
          {fileOrDir.folded ? (
            <>
              <span className="text-[#716471]"> </span>{" "}
            </>
          ) : (
            <>  </>
          )}
          {fileOrDir.name}
        </li>,
      );
      if (!fileOrDir.folded) {
        for (let i = 0; i < fileOrDir.files.length; i++) {
          y++;
          if (y === selected)
            selectedFile = {
              type: "file",
              name: fileOrDir.files[i],
              directory: fileOrDir,
            };

          const icon = FILE_ICONS.UNKNOWN;
          const fy = y;
          tree.push(
            <li
              key={y}
              style={{ background: y === selected ? "#504651" : "" }}
              onMouseDown={() => setSelected(fy)}
              onDoubleClick={() =>
                handleOpen({
                  type: "file",
                  name: fileOrDir.files[i],
                  directory: fileOrDir,
                })
              }
            >
              {"  "}
              <span className="text-[#5b515b]">
                {i === fileOrDir.files.length - 1 ? "└ " : "│ "}
              </span>
              <span style={{ color: icon.color }}>{`${icon.char}`}</span>
              <span>{fileOrDir.files[i]}</span>
            </li>,
          );
        }
      }
    } else {
      const parts = fileOrDir.name.split(".");
      let extension = parts[parts.length - 1];
      if (!FILE_ICONS[extension]) extension = "UNKNOWN";

      const icon = FILE_ICONS[extension];

      const fy = y;
      tree.push(
        <li
          key={y}
          style={{ background: y === selected ? "#504651" : "" }}
          onMouseDown={() => setSelected(fy)}
          onDoubleClick={() => handleOpen(fileOrDir)}
        >
          {"  "}
          <span style={{ color: icon.color }}>{`${icon.char}`}</span>
          {fileOrDir.name === "README.md" ? (
            <span className="font-bold text-[#d8c5a1]">README.md</span>
          ) : (
            <span>{fileOrDir.name}</span>
          )}
        </li>,
      );
    }
    y++;
  }

  useEffect(() => {
    const onScroll = (event: KeyboardEvent) => {
      if (activeKitty !== props.id) return;
      switch (event.key) {
        case "ArrowUp":
          setSelected((x) => Math.max(0, x - 1));
          break;

        case "ArrowDown":
          setSelected((x) => Math.min(y - 1, x + 1));
          break;

        case "Enter":
          handleOpen(selectedFile);
          break;
      }
    };

    window.addEventListener("keydown", onScroll);

    return () => {
      window.removeEventListener("keydown", onScroll);
    };
  });

  return (
    <div className="h-full select-none bg-[#0000001a]">
      <ul
        style={{
          padding: `${CHAR_HEIGHT}px ${CHAR_WIDTH}px 0 ${CHAR_WIDTH * 2}px`,
        }}
      >
        {tree}
      </ul>
    </div>
  );
};
