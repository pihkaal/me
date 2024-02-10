import { type ReactNode } from "react";
import clsx from "clsx";
import { Terminal } from "react-dom-curse";

export const Kitty = (props: { children?: ReactNode; className?: string }) => (
  <div
    className={clsx(
      "overflow-hidden whitespace-pre rounded-lg border-2 border-borderInactive bg-background bg-opacity-80 text-lg text-color7 text-foreground shadow-window transition-colors duration-[500ms] ease-out hover:border-borderActive hover:duration-[200ms]",
      props.className,
    )}
    style={{ backdropFilter: "blur(2px)" }}
  >
    <Terminal font="20px JetbrainsMono">{props.children}</Terminal>
  </div>
);
