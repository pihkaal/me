import { ICONS, getIcon } from "~/utils/icons";

export const NvimStatusBar = (props: {
  label: string;
  labelColor: string;
  fileIcon?: string;
  fileName: string;
}) => (
  <div className="bg-[#29293c]">
    <span className="text-[#272332]" style={{ background: props.labelColor }}>
      {` ${props.label} `}
    </span>
    <span className="text-[#474353]" style={{ background: props.labelColor }}>
      {"\ue0ba"}
    </span>
    <span className="bg-[#474353] text-[#373040]">{"\ue0ba"}</span>
    <span className="bg-[#373040]">{` ${getIcon(props.fileIcon).char}${
      props.fileName
    } `}</span>
    <span className="bg-[#373040] text-[#29293c]">{"\ue0ba"}</span>
  </div>
);
