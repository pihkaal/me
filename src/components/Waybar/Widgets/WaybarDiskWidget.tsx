import { useState } from "react";
import { WaybarWidget } from "../WaybarWidget";
import { randomMinMax } from "~/utils/math";

// TODO: find a good idea to determine disk usage

export const WaybarDiskWidget = (props: {
  current: number;
  variation: number;
  capacity: number;
}) => {
  const [value] = useState(
    props.current + randomMinMax(-props.variation, props.variation + 1),
  );
  const usage = Math.round((value / props.capacity) * 100);

  return (
    <WaybarWidget
      className="pl-[0.625rem] pr-3"
      tooltip={`SSD - ${value.toFixed(1)}GB used out of ${
        props.capacity
      }GiB on / (${usage}%)`}
    >
      <span className="font-normal">󰋊</span> {usage}%
    </WaybarWidget>
  );
};
