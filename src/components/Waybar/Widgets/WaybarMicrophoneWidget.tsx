import { type WheelEvent, useState } from "react";
import { clamp } from "~/utils/math";
import { WaybarWidget } from "../WaybarWidget";

export const WaybarMicrophoneWidget = () => {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(100);

  const handleWheel = (e: WheelEvent) => {
    let newVolume = volume - Math.sign(e.deltaY) * 5;
    newVolume = clamp(newVolume, 0, 100);

    setVolume(newVolume);
  };

  const handleClick = () => {
    setMuted((muted) => !muted);
  };

  const icon = muted ? "" : "";

  return (
    <WaybarWidget className="pl-[0.625rem] pr-3" interactable>
      <span
        className="text-[#ad6bfd]"
        onWheel={handleWheel}
        onClick={handleClick}
      >
        {icon} {!muted && `${volume}%`}
      </span>
    </WaybarWidget>
  );
};
