import { useTerminalCanvas } from "~/context/TerminalCanvasContext";
import { type CellStyle } from "~/utils/terminal/cell";
import { TerminalBoxElement } from "~/utils/terminal/elements/box";

export const TerminalBox = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
  style?: CellStyle;
}) => {
  const canvas = useTerminalCanvas();

  const element = new TerminalBoxElement(
    props.width,
    props.height,
    props.style ?? {},
  );
  canvas.writeElement(element, props.x, props.y);

  return null;
};
