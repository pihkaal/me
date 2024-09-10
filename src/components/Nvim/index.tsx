import { useKitty } from "~/hooks/useKitty";
import { CHAR_HEIGHT, CHAR_WIDTH } from "../Kitty";
import { NvimEditor } from "./NvimEditor";
import { NvimInput } from "./NvimInput";
import { NvimStatusBar } from "./NvimStatusBar";
import { NvimTree } from "./NvimTree";
import { useState } from "react";
import { type InnerKittyProps } from "~/utils/types";
import { type Child, type Icon } from "~/utils/tree";

export const Nvim = (_props: unknown) => {
  const kitty = useKitty();

  return kitty && <InnerNvimTree {...kitty} />;
};

const InnerNvimTree = (props: InnerKittyProps<typeof Nvim>) => {
  const [activeChild, setActiveChild] = useState<{
    name: string;
    content: string;
    icon: Icon;
  }>();

  const handleOpenChild = (child: Child) => {
    if (child.type === "link") {
      window.open(child.url, "_blank")?.focus();
    } else {
      setActiveChild(child);
    }
  };

  return (
    <div
      className="grid h-full"
      style={{
        gridTemplateColumns: `minmax(${CHAR_WIDTH * 20}px, ${
          Math.round(props.cols * 0.2) * CHAR_WIDTH
        }px) 1fr`,
        gridTemplateRows: `1fr ${CHAR_HEIGHT}px ${CHAR_HEIGHT}px`,
      }}
    >
      <div style={{ gridArea: "1 / 1 / 1 / 2" }}>
        <NvimTree {...props} onOpen={handleOpenChild} />
      </div>
      <div
        style={{
          gridArea: "1 / 2 / 1 / 3",
          overflowY: "auto",
          wordWrap: "break-word",
        }}
      >
        <NvimEditor content={activeChild?.content} />
      </div>
      <div style={{ gridArea: "2 / 1 / 2 / 3" }}>
        <NvimStatusBar
          label=" NORMAL"
          labelColor="#7ea7ca"
          fileIcon={activeChild?.icon}
          fileName={activeChild?.name}
        />
      </div>
      <div style={{ gridArea: "3 / 1 / 3 / 3" }}>
        <NvimInput />
      </div>
    </div>
  );
};
