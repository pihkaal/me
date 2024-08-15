import { useState, type ReactNode, type MouseEvent, useRef } from "react";
import { cn } from "~/utils/react";

export const WaybarWidget = (props: {
  className?: string;
  tooltip?: ReactNode;
  interactable?: boolean;
  children: ReactNode;
}) => {
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setTooltipVisible(true);
    }, 500);
  };

  const handleMouveMove = (e: MouseEvent) => {
    if (!tooltipVisible) {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
    setTooltipVisible(false);
  };

  return (
    <div
      className={cn(
        "relative py-[6.5px] font-bold text-[#2b2b2c] opacity-90",
        props.className,
        props.interactable && "cursor-pointer",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouveMove}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
      {props.tooltip && tooltipPosition && tooltipVisible && (
        <div
          className="fixed z-20 -translate-x-1/2 whitespace-pre-line rounded-[10px] border-2 border-[#11111b] bg-[#e7e7ec] px-3 py-3 font-extrabold text-[#2b2b2c]"
          style={{ top: tooltipPosition.y + 20, left: tooltipPosition.x }}
        >
          {props.tooltip}
        </div>
      )}
    </div>
  );
};
