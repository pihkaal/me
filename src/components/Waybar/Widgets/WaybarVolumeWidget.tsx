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

  const toolip =
    volume === 0 || muted
      ? "You don't like the music? :("
      : volume === 100
        ? "Always maximum volume when it's Hysta"
        : volume >= 50
          ? "Turning up the vibes !"
          : "Enjoying music at a moderate level";

  return (
    <WaybarWidget className="px-[0.625rem]" interactable tooltip={toolip}>
      <span
        className="text-[#407cdd]"
        onWheel={handleWheel}
        onClick={handleClick}
      >
        <span className="font-normal">{icon}</span> {!muted && `${volume}%`}
      </span>
    </WaybarWidget>
  );
};
