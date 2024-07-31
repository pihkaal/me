import { useEffect, useState } from "react";
import { WaybarWidget } from "../WaybarWidget";
import { lerpIcon } from "~/utils/icons";

const ICONS = ["󰂎", "󰁺", "󰁻", "󰁼", "󰁽", "󰁾", "󰁿", "󰂀", "󰂁", "󰂂", "󰁹"];

export const WaybarBatteryWidget = (props: { frequency: number }) => {
  const [battery, setBattery] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setBattery((x) => x - 1);

      if (battery - 1 === 0) {
        // TODO: do something
      }
    }, props.frequency);

    return () => clearInterval(interval);
  });

  return (
    <WaybarWidget className="pl-[0.625rem] pr-3 text-[#1d7715]">
      {lerpIcon(ICONS, battery, 100)} {battery}%
    </WaybarWidget>
  );
};
