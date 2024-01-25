import { useTerminal } from "~/context/TerminalContext";
import { TerminalCanvas } from "~/utils/terminal/canvas";
import { TerminalBoxElement } from "~/utils/terminal/elements/box";

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
  played: number;
}) => {
  props;
  formatDurationMSS;

  const { cols } = useTerminal();
  const canvas = new TerminalCanvas(cols, 5);

  canvas.writeElement(
    new TerminalBoxElement(canvas.width, canvas.height),
    0,
    0,
  );

  canvas.write(1, 0, "Playback".substring(0, Math.min(8, canvas.width - 2)), {
    foreground: theme.magenta,
  });

  const inner = new TerminalCanvas(canvas.width - 2, canvas.height - 2);
  // Title and Artist
  inner.write(2, 0, "Last Tango in Kyoto · Floating Bits", {
    foreground: theme.cyan,
    fontWeight: 800,
  });
  inner.apply(0, 0, {
    char: "\udb81\udc0a",
    foreground: theme.cyan,
    fontWeight: 800,
  });

  // Album
  inner.write(0, 1, "Last Tango in Kyoto", { foreground: theme.yellow });

  // Bar
  const percentage = 45;
  inner.write(0, 2, " ".repeat(inner.width), {
    foreground: theme.green,
    background: theme.black,
  });
  inner.write(0, 2, " ".repeat((inner.width / 100) * percentage), {
    foreground: theme.black,
    background: theme.green,
  });
  const time = "1:10/1:51";
  inner.write(inner.width / 2 - time.length / 2, 2, time);

  canvas.writeElement(inner, 1, 1);
  return <p>{canvas.render()}</p>;
};
