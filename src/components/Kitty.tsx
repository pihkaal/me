import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
  useId,
} from "react";
import { KittyContext, type KittyContextProps } from "../context/KittyContext";
import { useApp } from "../context/AppContext";

export const CHAR_WIDTH = 12;
export const CHAR_HEIGHT = 26;

const PADDING_RIGHT = CHAR_WIDTH / 2;

export const Kitty = (props: {
  children?: ReactNode;
  rows?: number;
  cols?: number;
  className?: string;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<`${number}px` | "auto">(
    props.cols ? `${props.cols * CHAR_WIDTH}px` : "auto",
  );
  const [height, setHeight] = useState<`${number}px` | "auto">(
    props.rows ? `${props.rows * CHAR_HEIGHT}px` : "auto",
  );
  const [context, setContext] = useState<KittyContextProps | undefined>(
    undefined,
  );

  const id = useId();
  const { activeKitty, setActiveKitty } = useApp();

  const handleMouseEnter = useCallback(() => {
    setActiveKitty(id);
  }, [id, setActiveKitty]);

  const snapToCharacter = useCallback(() => {
    if (!container.current) return;

    const cols = Math.round(
      (container.current.clientWidth - PADDING_RIGHT) / CHAR_WIDTH,
    );
    const rows = Math.round(container.current.clientHeight / CHAR_HEIGHT);

    const width = cols * CHAR_WIDTH;
    const height = rows * CHAR_HEIGHT;

    setWidth(`${width}px`);
    setHeight(`${height}px`);
    setContext((ctx) => ({ ...(ctx ?? { active: false }), rows, cols }));
  }, []);

  useEffect(() => {
    if (!container.current) return;

    snapToCharacter();

    window.addEventListener("resize", snapToCharacter);

    return () => {
      window.removeEventListener("resize", snapToCharacter);
    };
  }, [snapToCharacter]);

  return (
    <div className={props.className} onMouseEnter={handleMouseEnter}>
      <div
        className={
          "h-full w-full overflow-hidden rounded-lg border-2 border-borderInactive bg-background bg-opacity-80 px-[1px] text-lg text-color7 text-foreground shadow-window transition-colors duration-[500ms] ease-out"
        }
        style={{
          lineHeight: `${CHAR_HEIGHT}px`,
          ...(activeKitty === id
            ? {
              borderColor: "#cdd6f4",
              animationDuration: "200ms",
            }
            : {}),
        }}
        ref={container}
      >
        <div
          className="whitespace-pre"
          style={{ backdropFilter: "blur(2px)", width, height }}
        >
          <KittyContext.Provider value={context}>
            {props.children}
          </KittyContext.Provider>
        </div>
      </div>
    </div>
  );
};
