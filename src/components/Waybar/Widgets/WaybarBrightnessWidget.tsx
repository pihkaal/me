import { type WheelEvent } from "react";
import { clamp } from "~/utils/math";
import { WaybarWidget } from "../WaybarWidget";
import { useApp } from "~/hooks/useApp";
import { lerpIcon } from "~/utils/icons";

const ICONS = ["󰃞", "󰃟", "󰃠"];

export const WaybarBrightnessWidget = () => {
  const { brightness, setBrightness } = useApp();

  const handleScroll = (e: WheelEvent) => {
    let newBrightness = brightness - Math.sign(e.deltaY);
    newBrightness = clamp(newBrightness, 0, 100);

    setBrightness(newBrightness);
  };

  return (
    <WaybarWidget className="pl-3 pr-[0.625rem]">
      <span onWheel={handleScroll}>
        {lerpIcon(ICONS, brightness, 100)} {brightness}%
      </span>
    </WaybarWidget>
  );
};
