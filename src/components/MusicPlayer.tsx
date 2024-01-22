import { useState } from "react";
import { useTerminal } from "~/context/TerminalContext";
import { Text } from "./Text";

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
  const terminal = useTerminal();

  const [isPlaying, setIsPlaying] = useState(false);
  setIsPlaying;

  const innerWidth = terminal.cols - 2;

  const timeString = `${formatDurationMSS(props.played)}/${formatDurationMSS(
    props.duration,
  )}`;
  const barSize = Math.max(
    1,
    Math.floor((props.played / props.duration) * innerWidth),
  );

  const beforeText_pos = innerWidth / 2 - timeString.length / 2;
  const beforeText_filled = Math.min(barSize, beforeText_pos);
  const beforeText_empty = beforeText_pos - beforeText_filled;

  const afterText_pos = innerWidth / 2 + timeString.length / 2;
  const afterText_filled = Math.max(
    0,
    Math.min(barSize, innerWidth - timeString.length) - afterText_pos,
  );
  const afterText_empty =
    innerWidth - afterText_pos - afterText_filled + 1 - (innerWidth % 2);

  return (
    <p className="h-fit w-full select-none whitespace-pre pl-1 font-medium">
      {/* Top bar */}
      <>
        <Text>┌</Text>
        <Text fg="color5">Playback</Text>
        <Text>{"─".repeat(Math.max(0, innerWidth - 8))}┐</Text>
        <br />
      </>

      <>
        <Text>│</Text>
        <Text fg="color6" bold>
          {isPlaying ? "\udb81\udc0a" : "\udb80\udfe4"} {props.title} -{" "}
          {props.artist}
        </Text>
        <Text>
          {" ".repeat(
            Math.max(
              0,
              innerWidth - props.title.length - props.artist.length - 5,
            ),
          )}
          │
        </Text>
        <br />
      </>

      <>
        <Text>│</Text>
        <Text fg="color3">
          {props.album}
          {" ".repeat(innerWidth - props.album.length)}
        </Text>
        <Text>│</Text>
        <br />
      </>

      <>
        <Text>│</Text>
        <Text bg="color2">{" ".repeat(beforeText_filled)}</Text>
        <Text bg="color8">{" ".repeat(beforeText_empty)}</Text>
        {timeString.split("").map((x, i) => (
          <Text
            key={i}
            bg={beforeText_pos + i <= barSize ? "color2" : "color8"}
            fg={beforeText_pos + i <= barSize ? "color8" : "color2"}
          >
            {x}
          </Text>
        ))}
        <Text bg="color2">{" ".repeat(afterText_filled)}</Text>
        <Text bg="color8">{" ".repeat(afterText_empty)}</Text>
        <Text>│</Text>
        <br />
      </>

      <Text>└{"─".repeat(innerWidth)}┘</Text>
    </p>
  );
};
