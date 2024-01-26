import { useTerminal } from "~/context/TerminalContext";
import { TerminalRenderer } from "~/utils/terminal/renderer";

export const NvimStatusBar = () => {
  const { cols: width } = useTerminal();
  const canvas = new TerminalRenderer(width, 2);

  canvas.write(0, 0, "status line 1");
  canvas.write(0, 1, "status line 2");

  return <p>{canvas.render()}</p>;
};
