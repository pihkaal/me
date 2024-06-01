import axios from "axios";
import { useEffect, useState } from "react";

export const NvimEditor = (props: { source: string | undefined }) => {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [selectedLine, setSelectedLine] = useState(0);

  useEffect(() => {
    if (!props.source) return;

    setLoading(true);
    axios.get<string>(props.source).then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, [props.source]);

  let rows = data?.split("\n") ?? [];
  // trim end empty lines
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i].trim().length === 0) {
      rows = rows.slice(0, rows.length - 1);
    } else {
      break;
    }
  }
  // add spaces in empty lines
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].trim().length === 0) {
      rows[i] = " ";
    }
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
    <table>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            onMouseDown={() => setSelectedLine(i)}
            onMouseMove={(e) => {
              if (e.buttons === 1) setSelectedLine(i);
            }}
          >
            <td
              className={`flex select-none flex-col items-start pl-[2ch] pr-[1ch] text-right`}
              style={{
                width: `${3 + rows.length.toString().length}ch`,
                color: selectedLine === i ? "inherit" : "#6b616d",
              }}
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
