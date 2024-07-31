import { WaybarWidget } from "../WaybarWidget";
import { randomMinMax } from "~/utils/math";

// TODO: find a good idea to determine disk usage

export const WaybarDiskWidget = (props: {
  current: number;
  variation: number;
  capacity: number;
}) => {
  const value =
    props.current + randomMinMax(-props.variation, props.variation + 1);
  const usage = Math.round((value / props.capacity) * 100);

  return <WaybarWidget className="pl-[0.625rem] pr-3">󰋊 {usage}%</WaybarWidget>;
};
