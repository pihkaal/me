import { Directory } from "~/utils/types";

export const NvimTreeDirectory = (props: {
  directory: Directory;
  y: number;
  selected: boolean;
  onSelect: (y: number) => void;
  onOpen: (directory: Directory) => void;
}) => (
  <li
    className="text-[#a0b6ee]"
    style={{ background: props.selected ? "#504651" : "" }}
    onMouseDown={() => props.onSelect(props.y)}
    onDoubleClick={() => props.onOpen(props.directory)}
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
