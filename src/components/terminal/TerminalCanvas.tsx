import React, { type ReactNode, useEffect, useState } from "react";
import { TerminalCanvasContextProvider } from "~/context/TerminalCanvasContext";
import { TerminalRenderer } from "~/utils/terminal/renderer";

export const TerminalCanvas = (props: {
  width: number;
  height: number;
  children?: Array<ReactNode> | ReactNode;
}) => {
  const [canvas] = useState(new TerminalRenderer(props.width, props.height));
  const [render, setRender] = useState<Array<ReactNode>>([]);

  useEffect(() => {
    setRender(canvas.render());
  }, [canvas, props.children]);

  return (
    <TerminalCanvasContextProvider value={canvas}>
      {props.children}
      {render}
    </TerminalCanvasContextProvider>
  );
};
