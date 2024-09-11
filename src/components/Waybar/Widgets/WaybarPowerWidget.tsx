import { useApp } from "~/hooks/useApp";
import { WaybarWidget } from "../WaybarWidget";

export const WaybarPowerWidget = () => {
  const { setState } = useApp();

  return (
    <WaybarWidget className="pl-[0.625rem] pr-3" interactable>
      <button onClick={() => setState("off")}></button>
    </WaybarWidget>
  );
};
