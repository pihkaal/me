import { useEffect, useState } from "react";
import { WaybarWidget } from "../WaybarWidget";
import { lerpIcon } from "~/utils/icons";

const ICONS = ["󰂎", "󰁺", "󰁻", "󰁼", "󰁽", "󰁾", "󰁿", "󰂀", "󰂁", "󰂂", "󰁹"];

export const WaybarBatteryWidget = (props: { frequency: number }) => {
  const [battery, setBattery] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      // setBattery((x) => x - 1);

      if (battery - 1 === 0) {
        // TODO: do something
      }
    }, props.frequency);

    return () => clearInterval(interval);
  });

  const tooltip =
    battery === 100
      ? "Full"
      : battery >= 70
        ? "Almost full"
        : battery >= 50
          ? "Halfway down, but still doing great. I wonder what happens if the battery reaches 0"
          : battery >= 25
            ? "Uh maybe you should consider charging me ?"
            : battery >= 15
              ? "It's really reaching low level now"
              : battery >= 5
                ? "Are you ignoring my messages ??"
                : "I warned you";

  return (
    <WaybarWidget
      className="pl-[0.625rem] pr-3 text-[#1d7715]"
      tooltip={tooltip}
    >
      {lerpIcon(ICONS, battery, 100)} {battery}%
    </WaybarWidget>
  );
};
