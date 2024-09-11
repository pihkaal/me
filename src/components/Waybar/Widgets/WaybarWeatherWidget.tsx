import { useEffect, useState } from "react";
import { WaybarWidget } from "../WaybarWidget";

export const WaybarWeatherWidget = () => {
  const [temperature, setTemperature] = useState<string>("??");

  useEffect(() => {
    fetch("https://wttr.in/Brest?format=j1")
      .then((response) => response.json())
      .then((data) =>
        setTemperature(data.current_condition[0].temp_C as string),
      );
  }, []);

  const hours = new Date().getHours();

  return (
    <WaybarWidget className="px-[0.625rem]">
      {hours > 22 || hours < 7 ? "🌙" : "☀️"} {temperature}°
    </WaybarWidget>
  );
};
