import { useEffect, useState } from "react";
import { Bar, Frame, Group, Terminal, Text, useTerminal } from "react-dom-curse";
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
  const { terminal } = useTerminal();

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
        width={terminal.width}
        height={terminal.height}
        style={{ foreground: theme.white }}
      >
        <Frame
          x={0}
          y={0}
          width={terminal.width}
          height={terminal.height}
          border="single"
        >
          <Text x={0} y={0} style={{ foreground: theme.cyan }}>
            {props.title} · {props.artist}
          </Text>
          <Text x={0} y={1} style={{ foreground: theme.yellow }}>
            {props.album}
          </Text>

          <Group x={0} y={2} width={terminal.width} height={1}>
            <Bar
              x={0}
              y={0}
              style={{ foreground: theme.green, background: "#55576d" }}
              char=" "
              size={terminal.width}
              direction="horizontal"
            />
            <Bar
              x={0}
              y={0}
              style={{ foreground: "#55576d", background: theme.green }}
              char=" "
              size={terminal.width * (played / props.duration)}
              direction="horizontal"
            />
            <Text x={Math.floor(terminal.width / 2 - time.length / 2)} y={0}>
              {time}
            </Text>
          </Group>
        </Frame>

        <Text x={1} y={0} style={{ foreground: theme.magenta }}>
          Playback
        </Text>
      </Group>
  );
};
