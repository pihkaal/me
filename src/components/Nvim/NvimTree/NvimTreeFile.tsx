import { ICONS } from "~/utils/icons";
import { File } from "~/utils/types";

export const NvimTreeFile = (props: {
  file: File;
  y: number;
  selected: boolean;
  inDirectory: boolean | "last";
  onSelect: (y: number) => void;
  onOpen: (file: File) => void;
}) => {
  let iconName = props.file.icon;
  if (!iconName) {
    const parts = props.file.name.split(".");
    iconName = parts[parts.length - 1];
  }

  if (!ICONS[iconName]) iconName = "UNKNOWN";
  const icon = ICONS[iconName];

  return (
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
      <span style={{ color: icon.color }}>{`${icon.char}`}</span>
      {props.file.name === "README.md" ? (
        <span className="font-bold text-[#d8c5a1]">README.md</span>
      ) : (
        <span>{props.file.name}</span>
      )}
    </li>
  );
};
