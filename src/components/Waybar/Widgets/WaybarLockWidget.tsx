import { useApp } from "~/hooks/useApp";
import { WaybarWidget } from "../WaybarWidget";

export const WaybarLockWidget = () => {
  const { setState } = useApp();

  return (
    <WaybarWidget className="pl-3 pr-[0.625rem]" interactable>
      <button onClick={() => setState("login")}></button>
    </WaybarWidget>
  );
};
