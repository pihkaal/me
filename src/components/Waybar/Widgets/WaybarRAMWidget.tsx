import { useEffect, useState } from "react";
import { WaybarWidget } from "../WaybarWidget";
import { clamp, randomMinMax } from "~/utils/math";

// start, min, max and variation are in %
// capacity is in Gb

export const WaybarRAMWidget = (props: {
  start: number;
  min: number;
  max: number;
  variation: number;
  frequency: number;
  capacity: number;
}) => {
  const [usage, setUsage] = useState(props.start);

  useEffect(() => {
    const interval = setInterval(() => {
      const offset = randomMinMax(-props.variation, props.variation + 1);
      setUsage((x) => clamp(x + offset, props.min, props.max));
    }, props.frequency);

    return () => clearInterval(interval);
  });

  const used = (usage / 100) * props.capacity;

  // TODO: tooltip
  // Memory - (capacity * usage).1f GB used
  return (
    <WaybarWidget
      className="px-[0.625rem]"
      tooltip={`Memory - ${used.toFixed(1)}GB used`}
    >
       {usage}%
    </WaybarWidget>
  );
};
