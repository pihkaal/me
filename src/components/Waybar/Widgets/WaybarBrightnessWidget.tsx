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

  const tooltip =
    brightness === 100
      ? "Full"
      : brightness >= 70
        ? "Almost full"
        : brightness >= 50
          ? "Halfway down, but still doing great. I wonder what happens if the brightness reaches 0"
          : brightness >= 25
            ? "Uh maybe you should consider charging me ?"
            : brightness >= 15
              ? "It's really reaching low level now"
              : brightness >= 5
                ? "Are you ignoring my messages ??"
                : "I warned you";

  return (
    <WaybarWidget className="pl-3 pr-[0.625rem]" tooltip={tooltip}>
      <span onWheel={handleScroll}>
        {lerpIcon(ICONS, brightness, 100)} {brightness}%
      </span>
    </WaybarWidget>
  );
};
