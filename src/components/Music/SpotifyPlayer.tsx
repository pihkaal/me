import { formatMMSS } from "../../utils/time";
import { CharArray } from "../../utils/string";
import { CHAR_HEIGHT, CHAR_WIDTH } from "../Kitty";
import { type InnerKittyProps } from "~/utils/types";
import { useKitty } from "~/hooks/useKitty";
import { type CurrentlyPlaying } from ".";

export const SpotifyPlayer = (props: { playing: CurrentlyPlaying | null }) => {
  const kitty = useKitty();

  return (
    <div
      className="grid select-none"
      style={{
        gridTemplateColumns: `${CHAR_WIDTH}px ${
          CHAR_WIDTH * 8
        }px 1fr ${CHAR_WIDTH}px`,
        gridTemplateRows: `${CHAR_HEIGHT}px ${
          CHAR_HEIGHT * 3
        }px ${CHAR_HEIGHT}px`,
      }}
    >
      {kitty && <InnerSpotifyPlayer {...props} {...kitty} />}
    </div>
  );
};

const InnerSpotifyPlayer = (props: InnerKittyProps<typeof SpotifyPlayer>) => {
  if (props.playing === null) {
    return (
      <>
        {/* title */}
        <span
          className="font-extrabold text-color5"
          style={{ gridArea: "1 / 2 / 2 / 3" }}
        >
          Playback
        </span>

        {/* border right */}
        <span style={{ gridArea: "1 / 4 / 2 / 5" }}>┐</span>
        <span style={{ gridArea: "2 / 4 / 3 / 4" }}>
          {"│\n".repeat(props.rows - 2)}
        </span>
        <span style={{ gridArea: "3 / 4 / 4 / 5" }}>┘</span>

        {/* borer left */}
        <span style={{ gridArea: "1 / 1 / 2 / 2" }}>┌</span>
        <span style={{ gridArea: "2 / 1 / 3 / 1" }}>
          {"│\n".repeat(props.rows - 2)}
        </span>
        <span style={{ gridArea: "3 / 1 / 4 / 2" }}>└</span>

        {/* border top */}
        <span className="overflow-hidden" style={{ gridArea: "1 / 3 / 2 / 4" }}>
          {"─".repeat(props.cols - 2 - 8)}
        </span>

        {/* border bottom */}
        <span className="overflow-hidden" style={{ gridArea: "3 / 2 / 4 / 4" }}>
          {"─".repeat(props.cols - 2)}
        </span>

        {/* body */}
        <div className="overflow-hidden" style={{ gridArea: "2 / 2 / 3 / 4" }}>
          No playback found
          <br />
          I'm not listening to anything right now
        </div>
      </>
    );
  }

  const fillSize = Math.round(
    (props.playing.progress_ms / props.playing.item.duration_ms) *
      (props.cols - 2),
  );
  const emptySize = props.cols - 2 - fillSize;

  const timeString = `${formatMMSS(
    props.playing.progress_ms / 1000,
  )}/${formatMMSS(props.playing.item.duration_ms / 1000)}`;
  const timeStringLeft = Math.round(
    (props.cols - 2) / 2 - timeString.length / 2,
  );

  const fill = new CharArray(" ", fillSize)
    .write(timeStringLeft, timeString)
    .toString();
  const empty = new CharArray(" ", emptySize)
    .write(timeStringLeft - fillSize, timeString)
    .toString();

  return (
    <>
      {/* title */}
      <span
        className="font-extrabold text-color5"
        style={{ gridArea: "1 / 2 / 2 / 3" }}
      >
        Playback
      </span>

      {/* border right */}
      <span style={{ gridArea: "1 / 4 / 2 / 5" }}>┐</span>
      <span style={{ gridArea: "2 / 4 / 3 / 4" }}>
        {"│\n".repeat(props.rows - 2)}
      </span>
      <span style={{ gridArea: "3 / 4 / 4 / 5" }}>┘</span>

      {/* borer left */}
      <span style={{ gridArea: "1 / 1 / 2 / 2" }}>┌</span>
      <span style={{ gridArea: "2 / 1 / 3 / 1" }}>
        {"│\n".repeat(props.rows - 2)}
      </span>
      <span style={{ gridArea: "3 / 1 / 4 / 2" }}>└</span>

      {/* border top */}
      <span className="overflow-hidden" style={{ gridArea: "1 / 3 / 2 / 4" }}>
        {"─".repeat(props.cols - 2 - 8)}
      </span>

      {/* border bottom */}
      <span className="overflow-hidden" style={{ gridArea: "3 / 2 / 4 / 4" }}>
        {"─".repeat(props.cols - 2)}
      </span>

      {/* body */}
      <div className="overflow-hidden" style={{ gridArea: "2 / 2 / 3 / 4" }}>
        <span className="font-extrabold text-color6">
          <span className="font-normal">
            {false ? "\udb81\udc0a " : "\udb80\udfe4 "}
          </span>
          {props.playing.item.name} ·{" "}
          {props.playing.item.artists.map((a) => a.name).join(", ")}
        </span>
        <br />
        <span className="text-color3">{props.playing.item.album.name}</span>
        <br />
        <div className="relative font-extrabold">
          <span className="bg-color2 text-color8">{fill}</span>
          <span className="bg-color8 text-color2">{empty}</span>
        </div>
        <br />
      </div>
    </>
  );
};
