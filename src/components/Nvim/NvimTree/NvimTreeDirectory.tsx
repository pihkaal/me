import { useState } from "react";
import { type Folder } from "~/utils/tree";

export const NvimTreeDirectory = (props: {
  directory: Folder;
  y: number;
  selected: boolean;
  onSelect: (y: number) => void;
  onOpen: (directory: Folder) => void;
}) => {
  const [lastClick, setLastClick] = useState<number>();

  const handleClick = () => {
    props.onSelect(props.y);

    if (lastClick) {
      if (Date.now() - lastClick <= 500) {
        props.onOpen(props.directory);
      }

      setLastClick(undefined);
    } else {
      setLastClick(Date.now());
    }
  };

  return (
    <li
      className="text-[#a0b6ee]"
      style={{ background: props.selected ? "#504651" : "" }}
      onMouseDown={handleClick}
    >
      {props.directory.opened ? (
        <>  </>
      ) : (
        <>
          <span className="text-[#716471]"> </span>{" "}
        </>
      )}
      {props.directory.name}
    </li>
  );
};
