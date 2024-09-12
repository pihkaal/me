import { useEffect, useState } from "react";
import { WaybarWidget } from "../WaybarWidget";
import { clamp, randomMinMax } from "~/utils/math";

export const WaybarTemperatureWidget = (props: {
  min: number;
  max: number;
  variation: number;
  frequency: number;
}) => {
  const [temperature, setTemperature] = useState(
    randomMinMax(props.min, props.max),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const offset = randomMinMax(-props.variation, props.variation + 1);
      setTemperature((x) => clamp(x + offset, props.min, props.max));
    }, props.frequency);

    return () => clearInterval(interval);
  });

  return (
    <WaybarWidget
      className="pl-3 pr-[0.625rem]"
      tooltip="All good until I start playing btd6"
    >
      <span className="font-normal"></span> {temperature}°C
    </WaybarWidget>
  );
};
