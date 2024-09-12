import { useCallback, useEffect, useRef, useState } from "react";
import { type InnerKittyProps } from "~/utils/types";
import { CHAR_WIDTH } from "../Kitty";
import { useKitty } from "~/hooks/useKitty";

// eslint-disable-next-line @typescript-eslint/ban-types
export const Cava = (_props: {}) => {
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
      {kitty && <InnerCava {...kitty} />}
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
  if (remainderIndex === 0 && fullBlocksCount === 0) {
    bar += `${" ".repeat(WIDTH)}\n`.repeat(Math.max(emptyBlocksCount - 1, 0));
    bar += GRADIENT[0].repeat(WIDTH);
  } else {
    bar += `${" ".repeat(WIDTH)}\n`.repeat(Math.max(emptyBlocksCount, 0));

    if (remainderIndex > 0) {
      bar += `${GRADIENT[remainderIndex]!.repeat(WIDTH)}\n`;
    }
    bar += `${FULL_BLOCK.repeat(WIDTH)}\n`.repeat(fullBlocksCount);
  }

  return <span>{bar}</span>;
};

const InnerCava = (props: InnerKittyProps<typeof Cava>) => {
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  const [barHeights, setBarHeights] = useState(
    new Array<number>(Math.floor(props.cols / 3)).fill(0),
  );

  const requestRef = useRef<number>();
  const calculateBarHeights = useCallback(() => {
    if (!dataArray.current || !analyserRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArray.current);

    const barCount = Math.floor(props.cols / 2);
    const newBarHeights = [];

    for (let i = 0; i < barCount; i++) {
      const startIndex = Math.floor((i / barCount) * dataArray.current.length);
      const endIndex = Math.floor(
        ((i + 1) / barCount) * dataArray.current.length,
      );
      const slice = dataArray.current.slice(startIndex, endIndex);
      const sum = slice.reduce((acc, val) => acc + val, 0);
      const average = sum / slice.length;
      newBarHeights.push(average * 0.9);
    }

    const stateBarHeights =
      barHeights.length !== newBarHeights.length
        ? new Array<number>(newBarHeights.length).fill(0)
        : barHeights;

    const smoothedBarHeights = newBarHeights.map((height, i) => {
      const smoothingFactor = 0.8;
      return (
        stateBarHeights[i] + (height - stateBarHeights[i]) * smoothingFactor
      );
    });

    setBarHeights(smoothedBarHeights);

    requestRef.current = requestAnimationFrame(calculateBarHeights);
  }, [barHeights, props.cols]);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        const response = await fetch("/audio/mesmerizing_galaxy.mp3");
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 256;

        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0;

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;

        source.connect(analyserNode);
        analyserNode.connect(gainNode);
        gainNode.connect(audioContext.destination);

        analyserRef.current = analyserNode;
        sourceRef.current = source;
        dataArray.current = new Uint8Array(analyserNode.frequencyBinCount);

        requestRef.current = requestAnimationFrame(calculateBarHeights);

        source.start();
      } catch (error) {
        console.error("Error fetching or decoding audio:", error);
      }
    };

    if (audioContextRef.current) {
      requestRef.current = requestAnimationFrame(calculateBarHeights);
    } else {
      void fetchAudio();
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [calculateBarHeights]);

  return barHeights.map((height, i) => (
    <FrequencyBar key={i} value={height} max={255} height={props.rows} />
  ));
};
