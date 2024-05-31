import { getIcon } from "~/utils/icons";
import { File } from "~/utils/types";

export const NvimTreeFile = (props: {
  file: File;
  y: number;
  selected: boolean;
  inDirectory: boolean | "last";
  onSelect: (y: number) => void;
  onOpen: (file: File) => void;
}) => (
  <li
    style={{ background: props.selected ? "#504651" : "" }}
    onMouseDown={() => props.onSelect(props.y)}
    onDoubleClick={() => props.onOpen(props.file)}
  >
    {"  "}
    {props.inDirectory && (
      <span className="text-[#5b515b]">
        {props.inDirectory === "last" ? "└ " : "│ "}
      </span>
    )}
    <span style={{ color: getIcon(props.file).color }}>{`${
      getIcon(props.file).char
    }`}</span>
    {props.file.name === "README.md" ? (
      <span className="font-bold text-[#d8c5a1]">README.md</span>
    ) : (
      <span>{props.file.name}</span>
    )}
  </li>
);
