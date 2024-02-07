import { type ReactNode } from "react";
import { cn } from "~/utils/react";

export const WaybarWidget = (props: {
  className?: string;
  tooltip?: string;
  children: ReactNode | Array<ReactNode>;
}) => (
  <div className={cn("font-bold text-[#2b2b2c] ", props.className)}>
    {props.children}
  </div>
);
