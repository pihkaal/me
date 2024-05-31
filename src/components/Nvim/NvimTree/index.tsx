import { useApp } from "~/hooks/useApp";
import { CHAR_HEIGHT, CHAR_WIDTH } from "../../Kitty";
import { type ReactNode, useEffect, useState } from "react";
import {
  type File,
  type InnerKittyProps,
  type RootManifest,
  type Directory,
} from "~/utils/types";
import { type Nvim } from "..";
import { NvimTreeDirectory } from "./NvimTreeDirectory";
import { NvimTreeFile } from "./NvimTreeFile";
import { promiseHooks } from "v8";

const sortFiles = (files: Array<File | Directory>) =>
  files
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) =>
      a.type === "directory" && b.type !== "directory"
        ? -1
        : a.type !== "directory" && b.type === "directory"
          ? 1
          : 0,
    );

const manifestToTree = (manifest: RootManifest) =>
  sortFiles([
    {
      type: "directory",
      name: "links",
      opened: false,
      files: manifest.links.map((link) => ({
        type: "link" as const,
        ...link,
      })),
    },
    {
      type: "directory",
      name: "projects",
      opened: false,
      files: manifest.projects.map((project) => ({
        type: "file" as const,
        repo: project.name,
        fileName: "README.md",
        ...project,
      })),
    },
    ...manifest.files.map((file) => ({
      type: "file" as const,
      name: file,
      repo: "pihkaal",
      fileName: file,
    })),
  ]);

export const NvimTree = (
  props: InnerKittyProps<typeof Nvim> & {
    onOpen: (file: File) => void;
  },
) => {
  const { rootManifest, activeKitty } = useApp();

  const [files, setFiles] = useState(manifestToTree(rootManifest));
  const [selectedY, setSelectedY] = useState(0);

  const tree: Array<ReactNode> = [];
  let y = 0;
  let selectedFile = files[0];
  for (const file of files) {
    if (selectedY === y) selectedFile = file;
    if (file.type === "directory") {
      tree.push(
        <NvimTreeDirectory
          key={y}
          directory={file}
          y={y}
          selected={selectedY === y}
          onSelect={setSelectedY}
          onOpen={(directory) => {
            directory.opened = !directory.opened;
            setFiles([...files]);
          }}
        />,
      );

      if (file.opened) {
        file.files.forEach((childFile, i) => {
          y++;
          if (selectedY === y) selectedFile = childFile;
          tree.push(
            <NvimTreeFile
              key={y}
              file={childFile}
              y={y}
              inDirectory={i === file.files.length - 1 ? "last" : true}
              selected={selectedY === y}
              onSelect={setSelectedY}
              onOpen={props.onOpen}
            />,
          );
        });
      }
    } else {
      tree.push(
        <NvimTreeFile
          key={y}
          file={file}
          y={y}
          inDirectory={false}
          selected={selectedY === y}
          onSelect={setSelectedY}
          onOpen={props.onOpen}
        />,
      );
    }

    y++;
  }

  useEffect(() => {
    const onScroll = (event: KeyboardEvent) => {
      if (activeKitty !== props.id) return;
      switch (event.key) {
        case "ArrowUp":
          setSelectedY((x) => Math.max(0, x - 1));
          break;

        case "ArrowDown":
          setSelectedY((x) => Math.min(y - 1, x + 1));
          break;

        case "Enter":
          if (selectedFile.type === "directory") {
            selectedFile.opened = !selectedFile.opened;
            setFiles([...files]);
          } else {
            props.onOpen(selectedFile);
          }
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
