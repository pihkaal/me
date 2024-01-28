import { useTerminal } from "~/context/TerminalContext";
import { TerminalRenderer } from "~/utils/terminal/renderer";

export const NvimEditor = (props: { content: string | null }) => {
  const { cols: width, rows: height } = useTerminal();

  const canvas = new TerminalRenderer(width * 0.8, height - 2);

  if (props.content) {
    props.content.split("\n").forEach((line, y) => {
      canvas.write(0, y, line);
    });
  }

  return canvas.render();
};
