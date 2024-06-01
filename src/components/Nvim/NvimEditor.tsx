import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CHAR_WIDTH } from "../Kitty";

export const NvimEditor = (props: { source: string | undefined }) => {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState(false);

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!props.source) return;

    setLoading(true);
    axios.get<string>(props.source).then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, [props.source]);

  const rows = data?.split("\n") ?? [];
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i].trim().length === 0) {
      delete rows[i];
    } else {
      break;
    }
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
    <table>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td
              className={`select-none pl-[2ch] pr-[1ch] text-right text-[#6b616d]`}
              style={{ width: `${3 + rows.length.toString().length}ch` }}
            >
              {i + 1}
            </td>
            <td>{row}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
