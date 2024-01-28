import { useApp } from "~/context/AppContext";
import { NvimStatusBar } from "./NvimStatusBar";
import { NvimTree } from "./NvimTree";
import { buildFileTree } from "~/utils/filesystem";

export const Nvim = () => {
  const manifest = useApp();

  return (
    <div>
      <div className="flex">
        <div className="w-fit">
          <NvimTree files={buildFileTree(manifest)} />
        </div>
        <div className="flex-1"></div>
      </div>

      <div className="h-fit bg-[#29293c]">
        <NvimStatusBar label="NORMAL" fileName="README.md" />
      </div>
    </div>
  );
};
