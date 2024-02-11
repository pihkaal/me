import { useEffect } from "react";
import { Bar, Frame, Group, Text, useTerminal } from "react-dom-curse";
import { theme } from "~/utils/theme";

const formatDurationMSS = (duration: number) => {
  duration = Math.floor(duration);

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const SpotifyPlayer = (props: {
  title: string;
  artist: string;
  album: string;
  played: number;
  duration: number;
}) => {
  const { width } = useTerminal();

  const time = `${formatDurationMSS(props.played)}/${formatDurationMSS(
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
            direction="right"
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
            size={width * (props.played / props.duration)}
            direction="right"
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
