import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
  useId,
} from "react";
import { type KittyContextProps } from "~/context/KittyContext";
import { useApp } from "~/hooks/useApp";
import { KittyProvider } from "~/providers/KittyProvider";

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
    setContext({ id, rows, cols });
  }, [id]);

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
          "h-full w-full overflow-hidden rounded-lg border-2 border-borderInactive bg-[#262234] bg-background bg-opacity-90 px-[1px] text-lg text-[#cbc7d1] text-foreground shadow-window transition-colors duration-[500ms] ease-out"
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
          className="whitespace-pre-wrap"
          style={{ backdropFilter: "blur(2.5px)", width, height }}
        >
          <KittyProvider value={context}>{props.children}</KittyProvider>
        </div>
      </div>
    </div>
  );
};
