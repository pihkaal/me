import { useState } from "react";
import { DEFAULT_ICON } from "~/utils/icons";
import { type Child } from "~/utils/tree";

export const NvimTreeChild = (props: {
  child: Child;
  y: number;
  selected: boolean;
  inDirectory: boolean | "last";
  onSelect: (y: number) => void;
  onOpen: (file: Child) => void;
}) => {
  const icon = props.child.icon ?? DEFAULT_ICON;
  const [lastClick, setLastClick] = useState<number>();

  const handleClick = () => {
    props.onSelect(props.y);

    if (lastClick) {
      if (Date.now() - lastClick <= 500) {
        props.onOpen(props.child);
      }

      setLastClick(undefined);
    } else {
      setLastClick(Date.now());
    }
  };

  return (
    <li
      style={{ background: props.selected ? "#504651" : "" }}
      onMouseDown={handleClick}
    >
      {"  "}
      {props.inDirectory && (
        <span className="text-[#5b515b]">
          {props.inDirectory === "last" ? "└ " : "│ "}
        </span>
      )}
      <span style={{ color: icon.color }}>{`${icon.char}`}</span>
      {props.child.name === "README.md" ? (
        <span className="font-extrabold text-[#d8c5a1]">README.md</span>
      ) : (
        <span>{props.child.name}</span>
      )}
    </li>
  );
};
