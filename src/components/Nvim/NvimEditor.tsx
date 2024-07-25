import { useState } from "react";

export const NvimEditor = (props: { content: string | undefined }) => {
  const [selectedLine, setSelectedLine] = useState(0);

  let rows = props.content?.split("\n") ?? [];
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

  return (
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
