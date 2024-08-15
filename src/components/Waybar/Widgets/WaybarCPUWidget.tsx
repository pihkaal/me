import { useEffect, useState } from "react";
import { WaybarWidget } from "../WaybarWidget";
import { clamp, randomMinMax } from "~/utils/math";

export const WaybarCPUWidget = (props: {
  cores: number;
  min: number;
  max: number;
  variation: number;
  frequency: number;
}) => {
  const [usage, setUsage] = useState(
    new Array<number>(props.cores)
      .fill(0)
      .map((_) => randomMinMax(props.min, props.max)),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const variation = randomMinMax(-props.variation, props.variation + 1);
      const index = randomMinMax(0, usage.length);
      usage[index] = clamp(usage[index] + variation, props.min, props.max);

      setUsage([...usage]);
    }, props.frequency);

    return () => clearInterval(interval);
  }, [usage, props.variation, props.min, props.max, props.frequency]);

  const totalUsage = Math.round(
    usage.reduce((acc, v) => acc + v, 0) / usage.length,
  );

  return (
    <WaybarWidget
      className="pl-3 pr-[0.625rem]"
      tooltip={
        <ul>
          <li>Total: {totalUsage}%</li>
          {usage.map((value, i) => (
            <li>
              Core{i}: {value}%
            </li>
          ))}
        </ul>
      }
    >
       {totalUsage}%
    </WaybarWidget>
  );
};
