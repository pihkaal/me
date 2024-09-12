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
      ? "Flashbang mode"
      : brightness >= 70
        ? "Bright as a Brest day!"
        : brightness >= 50
          ? "Halfway to becoming a night owl"
          : brightness >= 25
            ? "I'm scared of the dark please stop"
            : brightness >= 15
              ? "Just turn off you screen at this point"
              : brightness >= 5
                ? "Can you even read now ?"
                : "So dark";

  return (
    <WaybarWidget className="pl-3 pr-[0.625rem]" tooltip={tooltip}>
      <span onWheel={handleScroll}>
        <span className="font-normal">{lerpIcon(ICONS, brightness, 100)}</span>{" "}
        {brightness}%
      </span>
    </WaybarWidget>
  );
};
