import { type FunctionComponent, type PropsWithChildren } from "react";
import clsx from "clsx";

type TerminalProps = PropsWithChildren<{
  className?: string;
}>;

export const Terminal: FunctionComponent<TerminalProps> = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      "rounded-lg border-2 border-[#595959] bg-[#1e1e2e] bg-opacity-95 px-1 text-[#cdd6f4] shadow-window transition-colors duration-[500ms] ease-out hover:border-[#cdd6f4] hover:duration-[200ms]",
      className,
    )}
  >
    {children}
  </div>
);
