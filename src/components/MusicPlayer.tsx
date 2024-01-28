import { useTerminal } from "~/context/TerminalContext";
import { TerminalRenderer } from "~/utils/terminal/renderer";
import { TerminalBoxElement } from "~/utils/terminal/elements/box";
import { useEffect, useState } from "react";

const theme = {
  black: "#45475a",
  red: "#f38ba8",
  green: "#a6e3a1",
  yellow: "#f9e2af",
  blue: "#89bafa",
  magenta: "#f5c2e7",
  cyan: "#94e2d5",
  white: "#bac2de",
  grey: "#585B70",
  lightGrey: "#a6adc8",
};

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
  const { cols } = useTerminal();
  const canvas = new TerminalRenderer(cols, 5);

  const [played, setPlayed] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayed(x => Math.min(props.duration, x + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [setPlayed, props.duration]);

  canvas.writeElement(
    new TerminalBoxElement(canvas.width, canvas.height),
    0,
    0,
  );

  canvas.write(1, 0, "Playback".substring(0, Math.min(8, canvas.width - 2)), {
    foreground: theme.magenta,
  });

  const inner = new TerminalRenderer(canvas.width - 2, canvas.height - 2);
  // Title and Artist
  inner.write(2, 0, `${props.title} · ${props.artist}`, {
    foreground: theme.cyan,
    fontWeight: 700,
  });
  inner.apply(0, 0, {
    char: "\udb81\udc0a",
    foreground: theme.cyan,
    fontWeight: 800,
  });

  // Album
  inner.write(0, 1, props.album, { foreground: theme.yellow });

  // Bar
  inner.write(0, 2, " ".repeat(inner.width), {
    foreground: theme.green,
    background: "#55576d",
  });
  inner.write(0, 2, " ".repeat((inner.width * played) / props.duration), {
    foreground: "#55576d",
    background: theme.green,
  });
  const time = `${formatDurationMSS(played)}/${formatDurationMSS(
    props.duration,
  )}`;
  inner.write(inner.width / 2 - time.length / 2, 2, time, { fontWeight: 800 });

  canvas.writeElement(inner, 1, 1);
  return <p>{canvas.render()}</p>;
};
