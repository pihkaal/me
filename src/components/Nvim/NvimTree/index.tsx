import { useApp } from "~/hooks/useApp";
import { CHAR_HEIGHT, CHAR_WIDTH } from "../../Kitty";
import { type ReactNode, useEffect, useState } from "react";
import { type InnerKittyProps } from "~/utils/types";
import { type Nvim } from "..";
import { NvimTreeDirectory } from "./NvimTreeDirectory";
import { NvimTreeChild } from "./NvimTreeChild";
import { assets } from "~/assets";
import {
  file,
  folder,
  project,
  sortFiles,
  link,
  type Child,
} from "~/utils/tree";

const buildTree = () =>
  sortFiles([
    folder(
      "links",
      assets.links.map((l) => link(l.name, l.url, l.icon)),
    ),
    folder(
      "projects",
      assets.projects.map((p) =>
        project(p.name, p.content, p.url, p.language, p.private),
      ),
    ),
    ...assets.files.map((f) => file(f.name, f.content)),
  ]);

export const NvimTree = (
  props: InnerKittyProps<typeof Nvim> & {
    onOpen: (file: Child) => void;
  },
) => {
  const { activeKitty } = useApp();

  const [files, setFiles] = useState(buildTree());
  const [selectedY, setSelectedY] = useState(0);

  const tree: Array<ReactNode> = [];
  let y = 0;
  let selectedFile = files[0];
  for (const file of files) {
    if (selectedY === y) selectedFile = file;
    if (file.type === "folder") {
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
        file.children.forEach((child, i) => {
          y++;
          if (selectedY === y) selectedFile = child;
          tree.push(
            <NvimTreeChild
              key={y}
              child={child}
              y={y}
              inDirectory={i === file.children.length - 1 ? "last" : true}
              selected={selectedY === y}
              onSelect={setSelectedY}
              onOpen={props.onOpen}
            />,
          );
        });
      }
    } else {
      tree.push(
        <NvimTreeChild
          key={y}
          child={file}
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
    const readme = files.find((file) => file.name === "README.md") as Child;
    props.onOpen(readme);
    setSelectedY(files.indexOf(readme));

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
          if (selectedFile.type === "folder") {
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
  }, []);

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
