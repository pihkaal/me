import { useTerminalCanvas } from "~/context/TerminalCanvasContext";

export const TerminalText = (props: {
  x: number;
  y: number;
  children: Array<string> | string;
}) => {
  const canvas = useTerminalCanvas();

  const text = Array.isArray(props.children)
    ? props.children.join("")
    : props.children;
  canvas.write(props.x, props.y, text);

  return null;
};
