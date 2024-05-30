import { useCallback, useEffect, useRef, useState } from "react";
import { type IAudioMetadata, parseBlob } from "music-metadata-browser";
import { Kitty } from "../Kitty";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { Cava } from "./Cava";

const song = "/audio/asinine-vivement-quoi.mp3";

export const Music = () => {
  const audio = useRef<HTMLAudioElement>(null);

  const [metadata, setMetadata] = useState<IAudioMetadata>();
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audio.current?.currentTime ?? 0);
  }, []);

  const handleTogglePause = useCallback((paused: boolean) => {
    if (!audio.current) return;

    if (paused) {
      void audio.current.pause();
    } else {
      void audio.current.play();
    }
  }, []);

  useEffect(() => {
    if (metadata) return;

    void fetch(song)
      .then((r) => r.blob())
      .then((b) => parseBlob(b))
      .then((m) => {
        if (!audio.current) return;

        setMetadata(m);
        audio.current.volume = 0.01;
      });
  }, [metadata]);

  return (
    <div className="flex flex-row">
      <audio ref={audio} src={song} onTimeUpdate={handleTimeUpdate} loop />
      {audio.current && metadata ? (
        <>
          <Kitty className="h-full w-1/2 pb-2 pl-2 pr-1 pt-1" rows={5}>
            <SpotifyPlayer
              title={metadata.common.title ?? "Unknown"}
              artist={metadata.common.artist ?? "Unknown"}
              album={metadata.common.album ?? "Unknown"}
              played={currentTime}
              onTogglePause={handleTogglePause}
              duration={audio.current.duration}
            />
          </Kitty>

          <Kitty className="h-full w-1/2 pb-2 pl-1 pr-2 pt-1" rows={5}>
            <Cava audio={audio} />
          </Kitty>
        </>
      ) : (
        <>
          <Kitty className="h-full w-1/2 pb-2 pl-2 pr-1 pt-1" rows={5} />
          <Kitty className="h-full w-1/2 pb-2 pl-1 pr-2 pt-1" rows={5} />
        </>
      )}
    </div>
  );
};
