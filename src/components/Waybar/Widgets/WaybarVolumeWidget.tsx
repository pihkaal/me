import { type WheelEvent, useState } from "react";
import { clamp } from "~/utils/math";
import { WaybarWidget } from "../WaybarWidget";
import { useApp } from "~/hooks/useApp";
import { lerpIcon } from "~/utils/icons";

const ICONS = ["", "", ""];

export const WaybarVolumeWidget = () => {
  const [muted, setMuted] = useState(false);
  const { volume, setVolume } = useApp();

  const handleWheel = (e: WheelEvent) => {
    let newVolume = volume - Math.sign(e.deltaY) * 5;
    newVolume = clamp(newVolume, 0, 100);

    setVolume(newVolume);
  };

  const handleClick = () => {
    setMuted(!muted);
  };

  const icon = muted ? "" : lerpIcon(ICONS, volume, 100);

  return (
    <WaybarWidget className="px-[0.625rem]" interactable>
      <span
        className="text-[#407cdd]"
        onWheel={handleWheel}
        onClick={handleClick}
      >
        {icon} {!muted && `${volume}%`}
      </span>
    </WaybarWidget>
  );
};
