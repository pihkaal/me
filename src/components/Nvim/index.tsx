import { useKitty } from "~/hooks/useKitty";
import { CHAR_HEIGHT } from "../Kitty";
import { NvimEditor } from "./NvimEditor";
import { NvimInput } from "./NvimInput";
import { NvimStatusBar } from "./NvimStatusBar";
import { NvimTree } from "./NvimTree";
import { useState } from "react";
import { File } from "~/utils/types";

export const Nvim = (_props: {}) => {
  const kitty = useKitty();

  const [activeFile, setActiveFile] = useState<{
    name: string;
    url: string;
    icon?: string;
  }>();

  const handleOpenFile = (file: File) => {
    if (file.type === "link") {
      window.open(file.url, "_blank")?.focus();
    } else {
      setActiveFile({
        name: file.repo === "pihkaal" ? file.fileName : file.repo,
        icon: file.icon,
        url: `https://raw.githubusercontent.com/pihkaal/${file.repo}/main/${file.fileName}`,
      });
    }
  };

  return (
    <div
      className="grid h-full"
      style={{
        gridTemplateColumns: `0.4fr 2fr`,
        gridTemplateRows: `1fr ${CHAR_HEIGHT}px ${CHAR_HEIGHT}px`,
      }}
    >
      {kitty && (
        <>
          <div style={{ gridArea: "1 / 1 / 1 / 2" }}>
            <NvimTree {...kitty} onOpen={handleOpenFile} />
          </div>
          <div style={{ gridArea: "1 / 2 / 1 / 3", overflow: "scroll" }}>
            <NvimEditor source={activeFile?.url} />
          </div>
          <div style={{ gridArea: "2 / 1 / 2 / 3" }}>
            <NvimStatusBar
              label=" NORMAL"
              labelColor="#7ea7ca"
              fileIcon={activeFile?.icon}
              fileName={activeFile?.name ?? `NvimTree_1`}
            />
          </div>
          <div style={{ gridArea: "3 / 1 / 3 / 3" }}>
            <NvimInput />
          </div>
        </>
      )}
    </div>
  );
};
