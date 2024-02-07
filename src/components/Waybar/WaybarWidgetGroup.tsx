import { type ReactNode } from "react";

export const WaybarWidgetGroup = (props: {
  children: ReactNode | Array<ReactNode>;
}) => (
  <div className="flex flex-row justify-between gap-5 rounded-lg bg-[#e6e7ec] px-4 py-[5px] opacity-80">
    {props.children}
  </div>
);
