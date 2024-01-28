import { NvimStatusBar } from "./NvimStatusBar";
import { NvimTree } from "./NvimTree";

export const Nvim = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-fit">
          <NvimTree />
        </div>
        <div className="flex-1"></div>
      </div>

      <div className="h-fit bg-[#29293c]">
        <NvimStatusBar label="NORMAL" fileName="README.md" />
      </div>
    </div>
  );
};
