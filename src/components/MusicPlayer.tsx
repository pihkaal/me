import { useEffect, useRef, useState } from "react";
import { Bar, Frame, Group, Text, useTerminal } from "react-dom-curse";
import { theme } from "~/utils/theme";
import { parseBlob, type IAudioMetadata } from "music-metadata-browser";

import song from "/audio/colorful-flowers.mp3";

const formatDurationMSS = (duration: number) => {
  duration = Math.floor(duration);

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const MusicPlayer = () => {
  const { width } = useTerminal();
  const [metadata, setMetadata] = useState<IAudioMetadata>();

  const audio = useRef<HTMLAudioElement>();
  useEffect(() => {
    if (audio.current) return;

    audio.current = new Audio(song);

    void fetch(song)
      .then(r => r.blob())
      .then(b => parseBlob(b))
      .then(d => {
        void audio.current?.play();
        setMetadata(d);
      });
  }, []);

  if (!audio.current) return null;

  const played = audio.current.currentTime;
  const duration = audio.current.duration;

  const time = `${formatDurationMSS(played)}/${formatDurationMSS(duration)}`;

  return (
    <Group
      x={0}
      y={0}
      width={width}
      height={5}
      style={{ foreground: theme.white }}
    >
      <Frame x={0} y={0} width={width} height={5} border="single">
        {metadata ? (
          <>
            <Text x={0} y={0} style={{ foreground: theme.cyan, bold: true }}>
              {metadata.common.title ?? "Unknown"} ·{" "}
              {metadata.common.artist ?? "Unknown"}
            </Text>
            <Text x={0} y={1} style={{ foreground: theme.yellow }}>
              {metadata.common.album ?? "Unknown"}
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
                size={width * (played / duration)}
                direction="horizontal"
              />
              <Text x={Math.floor(width / 2 - time.length / 2 - 1)} y={0}>
                {time}
              </Text>
            </Group>
          </>
        ) : (
          <>
            <Text x={0} y={0}>
              No playback found.
            </Text>
          </>
        )}
      </Frame>

      <Text x={1} y={0} style={{ foreground: theme.magenta }}>
        {"Playback".substring(0, Math.min(8, width - 2))}
      </Text>
    </Group>
  );
};
