import { Fragment, useRef, useEffect, useState } from "react";
import { ProgressBar, Group, useFrame, useTerminal } from "react-dom-curse";
import { theme } from "~/utils/theme";

export const Cava = () => {
  const { width } = useTerminal();

  const audioContext = useRef(new AudioContext());
  const analyser = useRef(audioContext.current.createAnalyser());
  const bufferLength = useRef(analyser.current.frequencyBinCount);
  const dataArray = useRef(new Uint8Array(bufferLength.current));
  const [barHeights, setBarHeights] = useState(
    new Array<number>(Math.round(width / 3)).fill(0),
  );

  useEffect(() => {
    const audioElement = document.querySelector("audio");
    if (!audioElement) return;

    const audioSource =
      audioContext.current.createMediaElementSource(audioElement);
    audioSource.connect(analyser.current);
    analyser.current.connect(audioContext.current.destination);
    audioElement.play();

    return () => {
      audioSource.disconnect();
      analyser.current.disconnect();
    };
  }, []);

  useFrame(() => {
    analyser.current.getByteFrequencyData(dataArray.current);

    const barCount = Math.floor(width / 3);
    const barHeights = [];

    for (let i = 0; i < barCount; i++) {
      const startIndex = Math.floor((i / barCount) * bufferLength.current);
      const endIndex = Math.floor(((i + 1) / barCount) * bufferLength.current);
      const slice = dataArray.current.slice(startIndex, endIndex);
      const sum = slice.reduce((acc, val) => acc + val, 0);
      const average = sum / slice.length;
      barHeights.push(average);
    }

    setBarHeights(barHeights);
  });

  return (
    <Group
      x={0}
      y={0}
      width={width}
      height={5}
      style={{ foreground: theme.white }}
    >
      {barHeights.map((height, x) => (
        <Fragment key={x}>
          <ProgressBar
            x={x * 3}
            y={4}
            size={5}
            min={0}
            max={255}
            value={height}
            orientation="top"
          />
          <ProgressBar
            x={x * 3 + 1}
            y={4}
            size={5}
            min={0}
            max={255}
            value={height}
            orientation="top"
          />
        </Fragment>
      ))}
    </Group>
  );
};
