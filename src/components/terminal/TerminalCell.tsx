import { useTerminalCanvas } from "~/context/TerminalCanvasContext";
import { type CellStyle } from "~/utils/terminal/cell";

export const TerminalCell = (props: {
  x: number;
  y: number;
  children: Array<string> | string;
  style?: CellStyle;
}) => {
  const canvas = useTerminalCanvas();

  const text = Array.isArray(props.children)
    ? props.children.join("")
    : props.children;
  canvas.apply(props.x, props.y, {
    char: text,
    ...(props.style ?? {}),
  });

  return null;
};
