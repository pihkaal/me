import { type ReactNode } from "react";
import { cn } from "~/utils/react";

export const WaybarWidgetGroup = (props: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={cn(
      `flex flex-row justify-between rounded-[10px] bg-[#e6e7ec] bg-opacity-80`,
      props.className,
    )}
  >
    {props.children}
  </div>
);
