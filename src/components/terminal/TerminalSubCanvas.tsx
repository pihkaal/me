import React, { type ReactNode, useState } from "react";
import {
  TerminalCanvasContextProvider,
  useTerminalCanvas,
} from "~/context/TerminalCanvasContext";
import { TerminalRenderer } from "~/utils/terminal/renderer";

export const TerminalSubCanvas = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
  children?: Array<ReactNode> | ReactNode;
}) => {
  const parent = useTerminalCanvas();
  const [canvas] = useState(new TerminalRenderer(props.width, props.height));

  parent.writeElement(canvas, props.x, props.y);

  return (
    <TerminalCanvasContextProvider value={canvas}>
      {props.children}
    </TerminalCanvasContextProvider>
  );
};
