import { useEffect, useRef, useState } from "react";
import { parseBlob, type IAudioMetadata } from "music-metadata-browser";

import song from "/audio/colorful-flowers.mp3";
import { Kitty } from "../Kitty";
import { Cava } from "./Cava";
import { SpotifyPlayer } from "./SpotifyPlayer";

export const Music = () => {
  const [metadata, setMetadata] = useState<IAudioMetadata>();
  const [currentTime, setCurrentTime] = useState(0);
  const audio = useRef<HTMLAudioElement>(null);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current?.currentTime ?? 0);
  };

  useEffect(() => {
    if (metadata) return;

    void fetch(song)
      .then(r => r.blob())
      .then(b => parseBlob(b))
      .then(setMetadata);
  }, [metadata]);

  return (
    <>
      <audio ref={audio} src={song} onTimeUpdate={handleTimeUpdate} loop />
      {metadata && audio.current && (
        <>
          <Kitty className="flex-1 select-none">
            <SpotifyPlayer
              title={metadata.common.title ?? "Unknown"}
              artist={metadata.common.artist ?? "Unknown"}
              album={metadata.common.album ?? "Unknown"}
              played={currentTime}
              duration={audio.current.duration}
            />
          </Kitty>

          <Kitty className="flex-1">
            <Cava />
          </Kitty>
        </>
      )}
    </>
  );
};
