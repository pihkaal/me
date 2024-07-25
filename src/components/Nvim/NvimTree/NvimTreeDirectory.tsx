import { type Folder } from "~/utils/tree";

export const NvimTreeDirectory = (props: {
  directory: Folder;
  y: number;
  selected: boolean;
  onSelect: (y: number) => void;
  onOpen: (directory: Folder) => void;
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
