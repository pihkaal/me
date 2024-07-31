import { type ReactNode } from "react";
import { cn } from "~/utils/react";

export const WaybarWidget = (props: {
  className?: string;
  tooltip?: string;
  interactable?: boolean;
  children: ReactNode | Array<ReactNode>;
}) => (
  <div
    className={cn(
      "py-[6.5px] font-bold text-[#2b2b2c]",
      props.className,
      props.interactable && "cursor-pointer",
    )}
  >
    {props.children}
  </div>
);
