import { DEFAULT_ICON } from "~/utils/icons";
import { type Icon } from "~/utils/tree";

export const NvimStatusBar = (props: {
  label: string;
  labelColor: string;
  fileIcon?: Icon;
  fileName?: string;
}) => (
  <div className="select-none bg-[#29293c]">
    <span className="text-[#272332]" style={{ background: props.labelColor }}>
      {` ${props.label} `}
    </span>
    <span className="text-[#474353]" style={{ background: props.labelColor }}>
      {"\ue0ba"}
    </span>
    <span className="bg-[#474353] text-[#373040]">{"\ue0ba"}</span>
    <span className="bg-[#373040]">{` ${
      props.fileIcon?.char ?? DEFAULT_ICON.char
    }${props.fileName ?? "Empty"} `}</span>
    <span className="bg-[#373040] text-[#29293c]">{"\ue0ba"}</span>
  </div>
);
