import { useEffect, useState } from "react";
import { Kitty } from "../Kitty";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { useApp } from "~/hooks/useApp";
import { cn, hideIf } from "~/utils/react";
import { Cava } from "./Cava";

export type CurrentlyPlaying = {
  is_playing: boolean;
  item: {
    album: {
      name: string;
    };
    name: string;
    artists: { name: string }[];
    duration_ms: number;
  };
  progress_ms: number;
};

export const Music = () => {
  const { screenWidth } = useApp();
  const [playing, setPlaying] = useState<CurrentlyPlaying | null>(null);

  useEffect(() => {
    const fetchCurrentlyPlaying = () =>
      fetch("https://api.pihkaal.me/currently-playing?format=json")
        .then((r) => r.json())
        .then((data: CurrentlyPlaying) => {
          if (data.is_playing) {
            data.progress_ms = Math.max(0, data.progress_ms - 1500);
            setPlaying(data);
          } else {
            setPlaying(null);
          }
        });

    const updatePlayingInterval = setInterval(() => {
      void fetchCurrentlyPlaying();
    }, 1000 * 10);

    const updateTimeInterval = setInterval(() => {
      setPlaying((prev) => {
        if (prev === null) return null;

        if (prev.progress_ms >= prev.item.duration_ms) {
          void fetchCurrentlyPlaying();
          return prev;
        }

        return {
          ...prev,
          progress_ms: Math.min(prev.item.duration_ms, prev.progress_ms + 1000),
        };
      });
    }, 1000);

    void fetchCurrentlyPlaying();

    return () => {
      clearInterval(updateTimeInterval);
      clearInterval(updatePlayingInterval);
    };
  }, []);

  return (
    <div className="flex flex-row pb-1">
      <Kitty
        className={cn(
          "h-full pb-1.5 pl-1 pr-1 pt-1 md:px-2",
          screenWidth < 900 ? "w-full" : "w-1/2",
        )}
        rows={5}
      >
        <SpotifyPlayer playing={playing} />
      </Kitty>

      <Kitty
        className={cn(
          "h-full w-1/2 pb-2 pl-1 pr-2 pt-1",
          hideIf(screenWidth < 900),
        )}
        rows={5}
      >
        <Cava animate={playing !== null} />
      </Kitty>
    </div>
  );
};
