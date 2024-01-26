import { useTerminal } from "~/context/TerminalContext";
import { TerminalRenderer } from "~/utils/terminal/renderer";

export const NvimTree = () => {
  const { cols: width, rows: height } = useTerminal();
  const canvas = new TerminalRenderer(width * 0.15, height - 2);

  canvas.write(0, 0, "ijirjginrgi");

  return <p>{canvas.render()}</p>;
};
