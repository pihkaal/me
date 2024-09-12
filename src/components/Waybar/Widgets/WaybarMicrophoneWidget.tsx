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

  const tooltip =
    volume === 0 || muted
      ? "Don't worry I'm not listening to you"
      : volume === 100
        ? "Broadcasting loud and clear!"
        : volume >= 50
          ? "Your voice sounds really great!"
          : volume >= 20
            ? "I can still hear you, just a bit quieter"
            : "I can barely hear you anymore :(";

  return (
    <WaybarWidget className="pl-[0.625rem] pr-3" interactable tooltip={tooltip}>
      <span
        className="text-[#ad6bfd]"
        onWheel={handleWheel}
        onClick={handleClick}
      >
        <span className="font-normal">{icon}</span> {!muted && `${volume}%`}
      </span>
    </WaybarWidget>
  );
};
