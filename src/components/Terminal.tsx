import { useRef, useState, useEffect, type ReactNode } from "react";
import clsx from "clsx";
import { TerminalContextProvider } from "~/context/TerminalContext";

export const Terminal = (props: {
  children?: ReactNode;
  className?: string;
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<{ cols: number; rows: number }>();

  useEffect(() => {
    const precision = 300;

    const calculateSize = () => {
      if (!terminalRef.current) return;

      const node = document.createElement("span");
      node.style.color = "transparent";
      node.style.position = "absolute";
      node.textContent = "A".repeat(precision);

      terminalRef.current.appendChild(node);

      setSize({
        cols: Math.floor(
          (terminalRef.current.offsetWidth - 4) /
            (node.offsetWidth / precision),
        ),
        rows: Math.floor(
          (terminalRef.current.offsetHeight - 4) / node.offsetHeight,
        ),
      });

      node.remove();
    };

    calculateSize();

    window.addEventListener("resize", calculateSize);

    return () => {
      window.removeEventListener("resize", calculateSize);
    };
  }, []);

  return (
    <TerminalContextProvider value={size}>
      <div
        ref={terminalRef}
        className={clsx(
          "overflow-hidden whitespace-pre rounded-lg border-2 border-borderInactive bg-background bg-opacity-80 text-lg text-color7 text-foreground shadow-window transition-colors duration-[500ms] ease-out hover:border-borderActive hover:duration-[200ms]",
          props.className,
        )}
        style={{ backdropFilter: "blur(2px)" }}
      >
        {size && props.children}
      </div>
    </TerminalContextProvider>
  );
};
