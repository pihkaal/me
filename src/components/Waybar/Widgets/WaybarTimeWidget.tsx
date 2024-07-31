import { useEffect, useState } from "react";
import { WaybarWidget } from "../WaybarWidget";

export const WaybarTimeWidget = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return <WaybarWidget className="px-[0.625rem]">{time}</WaybarWidget>;
};
