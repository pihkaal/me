import { useEffect, useState } from "react";
import { Bar, Frame, Group, Text, useTerminal } from "react-dom-curse";
import { theme } from "~/utils/theme";

const formatDurationMSS = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const MusicPlayer = (props: {
  title: string;
  artist: string;
  album: string;
  duration: number;
}) => {
  const { width } = useTerminal();

  const [played, setPlayed] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayed(x => Math.min(props.duration, x + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [setPlayed, props.duration]);

  const time = `${formatDurationMSS(played)}/${formatDurationMSS(
    props.duration,
  )}`;

  return (
    <Group
      x={0}
      y={0}
      width={width}
      height={5}
      style={{ foreground: theme.white }}
    >
      <Frame x={0} y={0} width={width} height={5} border="single">
        <Text x={0} y={0} style={{ foreground: theme.cyan, bold: true }}>
          {props.title} · {props.artist}
        </Text>
        <Text x={0} y={1} style={{ foreground: theme.yellow }}>
          {props.album}
        </Text>

        <Group x={0} y={2} width={width} height={1}>
          <Bar
            x={0}
            y={0}
            style={{
              foreground: theme.green,
              background: "#55576d",
              bold: true,
            }}
            char=" "
            size={width}
            direction="horizontal"
          />
          <Bar
            x={0}
            y={0}
            style={{
              foreground: "#55576d",
              background: theme.green,
              bold: true,
            }}
            char=" "
            size={width * (played / props.duration)}
            direction="horizontal"
          />
          <Text x={Math.floor(width / 2 - time.length / 2 - 1)} y={0}>
            {time}
          </Text>
        </Group>
      </Frame>

      <Text x={1} y={0} style={{ foreground: theme.magenta }}>
        {"Playback".substring(0, Math.min(8, width - 2))}
      </Text>
    </Group>
  );
};
