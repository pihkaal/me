import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { type InnerKittyProps } from "../../context/KittyContext";
import { CHAR_WIDTH } from "../Kitty";
import { useKitty } from "~/hooks/useKitty";

export const Cava = (props: { audio: RefObject<HTMLAudioElement> }) => {
  const kitty = useKitty();

  return (
    <div
      className="grid select-none text-[#b2b9d7]"
      style={{
        gap: `${CHAR_WIDTH}px`,
        gridTemplateColumns: `repeat(auto-fill, ${CHAR_WIDTH * 2}px)`,
        gridTemplateRows: `1fr`,
      }}
    >
      {kitty && <InnerCava {...props} {...kitty} />}
    </div>
  );
};

const FrequencyBar = (props: {
  value: number;
  max: number;
  height: number;
}) => {
  const WIDTH = 2;
  const GRADIENT = "▁▂▃▄▅▆▇█";
  const FULL_BLOCK = "█";

  const fraction = props.value / props.max;
  const totalCharacters = props.height * GRADIENT.length;
  const filledCharacters = fraction * totalCharacters;

  const fullBlocksCount = Math.floor(filledCharacters / GRADIENT.length);
  const remainderIndex = Math.floor(filledCharacters % GRADIENT.length);

  let bar = "";

  const emptyBlocksCount =
    props.height - fullBlocksCount - (remainderIndex > 0 ? 1 : 0);
  bar += `${" ".repeat(WIDTH)}\n`.repeat(Math.max(emptyBlocksCount, 0));

  if (remainderIndex > 0) {
    bar += `${GRADIENT[remainderIndex]!.repeat(WIDTH)}\n`;
  }
  bar += `${FULL_BLOCK.repeat(WIDTH)}\n`.repeat(fullBlocksCount);

  return <span>{bar}</span>;
};

const InnerCava = (props: InnerKittyProps<typeof Cava>) => {
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [barHeights, setBarHeights] = useState(
    new Array<number>(Math.round(props.cols / 3)).fill(0),
  );

  const requestRef = useRef<number>();
  const calculateBarHeights = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const barCount = Math.round(props.cols / 3);
    const newBarHeights = [];

    for (let i = 0; i < barCount; i++) {
      const startIndex = Math.floor((i / barCount) * bufferLength);
      const endIndex = Math.floor(((i + 1) / barCount) * bufferLength);
      const slice = dataArray.slice(startIndex, endIndex);
      const sum = slice.reduce((acc, val) => acc + val, 0);
      const average = sum / slice.length;
      newBarHeights.push(average);
    }

    const stateBarHeights =
      barHeights.length !== newBarHeights.length
        ? new Array<number>(newBarHeights.length).fill(0)
        : barHeights;

    const smoothedBarHeights = newBarHeights.map((height, i) => {
      const smoothingFactor = 1;
      return (
        stateBarHeights[i]! + (height - stateBarHeights[i]!) * smoothingFactor
      );
    });

    setBarHeights(smoothedBarHeights);

    requestRef.current = requestAnimationFrame(calculateBarHeights);
  }, [props.cols, barHeights]);

  useEffect(() => {
    const audioElement = props.audio.current;
    if (!audioElement) return;

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    console.log("ok");
    void audioElement.play().then(() => void audioContext.resume());

    if (!sourceRef.current) {
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      sourceRef.current = source;
      analyserRef.current = analyser;
    }

    requestRef.current = requestAnimationFrame(calculateBarHeights);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [props.cols, props.audio]);

  return barHeights.map((value, i) => (
    <FrequencyBar key={i} value={value} max={255 / 2} height={props.rows} />
  ));
};
