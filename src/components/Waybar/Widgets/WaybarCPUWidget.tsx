import { useEffect, useMemo, useState } from "react";
import { WaybarWidget } from "../WaybarWidget";

// 1 is really active, but often changes, 19-30%
// 2 are middly active, 8-11%
// other cores are low, 1-7%

export const WaybarCPUWidget = (props: {
  cores: number;
  variation: number;
  frequency: number;
}) => {
  const [usage, setUsage] = useState(new Array<number>(props.cores).fill(0));
  const totalUsage = useMemo(
    () => Math.round(usage.reduce((acc, v) => acc + v, 0) / usage.length),
    [usage],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      usage[0] += 1;
      setUsage([...usage]);
    }, props.frequency);

    return () => clearInterval(interval);
  }, [usage]);

  return <WaybarWidget> {totalUsage}%</WaybarWidget>;
};
