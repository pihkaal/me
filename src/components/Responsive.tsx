import { useState, type ReactNode, useEffect } from "react";
import { cn } from "~/utils/react";

export const Responsive = (props: {
  className?: string;
  minScreenWidth?: number;
  children: ReactNode;
}) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!props.minScreenWidth) return;

    const handleResize = () => {
      setHidden(
        props.minScreenWidth !== undefined &&
          window.innerWidth < props.minScreenWidth,
      );
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props.minScreenWidth]);

  return hidden ? null : props.children;
};
