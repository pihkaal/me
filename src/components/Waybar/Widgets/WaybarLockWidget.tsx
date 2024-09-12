import { useApp } from "~/hooks/useApp";
import { WaybarWidget } from "../WaybarWidget";

export const WaybarLockWidget = () => {
  const { setState } = useApp();

  return (
    <WaybarWidget
      className="pl-3 pr-[0.625rem]"
      onClick={() => setState("login")}
      interactable
    >
      <span className="font-normal"></span>
    </WaybarWidget>
  );
};
