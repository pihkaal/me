import { useKitty } from "~/hooks/useKitty";
import { CHAR_HEIGHT } from "../Kitty";
import { NvimEditor } from "./NvimEditor";
import { NvimInput } from "./NvimInput";
import { NvimStatusBar } from "./NvimStatusBar";
import { NvimTree } from "./NvimTree";

export const Nvim = (_props: {}) => {
  const kitty = useKitty();

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
            <NvimTree {...kitty} />
          </div>
          <div style={{ gridArea: "1 / 2 / 1 / 3" }}>
            <NvimEditor />
          </div>
          <div style={{ gridArea: "2 / 1 / 2 / 3" }}>
            <NvimStatusBar
              label="INSERT"
              labelColor="#7ea7ca"
              fileName="README.md"
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
