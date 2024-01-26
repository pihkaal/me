import { useTerminal } from "~/context/TerminalContext";
import { TerminalRenderer } from "~/utils/terminal/renderer";
import { theme } from "~/utils/terminal/theme";

export const NvimStatusBar = (props: { label: string; fileName: string }) => {
  const { cols: width } = useTerminal();
  const canvas = new TerminalRenderer(width, 1);

  canvas.write(0, 0, ` ${props.label} `, {
    background: theme.blue,
    foreground: "#000",
  });
  canvas.write(props.label.length + 2, 0, "\ue0ba", {
    background: theme.blue,
    foreground: "#474353",
  });
  canvas.write(props.label.length + 3, 0, "\ue0ba", {
    background: "#474353",
    foreground: "#373040",
  });
  canvas.write(props.label.length + 4, 0, ` ${props.fileName} `, {
    background: "#373040",
    foreground: theme.white,
  });
  canvas.write(props.label.length + 6 + props.fileName.length, 0, "\ue0ba", {
    background: "#373040",
    foreground: "#29293c",
  });

  return <p>{canvas.render()}</p>;
};
