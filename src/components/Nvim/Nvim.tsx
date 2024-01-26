import { NvimStatusBar } from "./NvimStatusBar";
import { NvimTree } from "./NvimTree";

export const Nvim = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-fit bg-green-500">
          <NvimTree />
        </div>
        <div className="flex-1 bg-blue-500"></div>
      </div>

      <div className="h-fit bg-red-500">
        <NvimStatusBar />
      </div>
    </div>
  );
};
