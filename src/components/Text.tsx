import config from "~/../tailwind.config";

const THEME = config.theme.extend.colors;
type TerminalColor = keyof {
  [K in keyof typeof THEME]: K extends `color${number}` ? K : never;
};

export const Text = (props: {
  children: string | Array<string>;
  bold?: boolean;
  fg?: TerminalColor;
  bg?: TerminalColor;
}) => (
  <span
    style={{
      fontWeight: props.bold ? "bold" : "normal",
      color: THEME[props.fg ?? "color7"],
      backgroundColor: props.bg ? THEME[props.bg] : "transparent",
    }}
  >
    {props.children}
  </span>
);

export const Text2 = (props: { children: string | Array<string> }) => {
  const text = Array.isArray(props.children)
    ? props.children.join("")
    : props.children;
  const parts = text.split("$");

  const nodes = parts.map((x, i) => {
    let colorId = 7;
    let bold = false;
    if (x.startsWith("#") && x[1] && "0123456789abcdef".includes(x[1])) {
      colorId = parseInt(x[1], 16);
      x = x.substring(2);

      if (x[0] && x.startsWith("*")) {
        bold = true;
        x = x.substring(1);
      }
    }

    const colors = config.theme.extend.colors as Record<string, string>;
    const color =
      colors[`color${colorId}`] ?? config.theme.extend.colors.color7;
    return (
      <span key={i} style={{ color, fontWeight: bold ? 800 : 400 }}>
        {x}
      </span>
    );
  });

  return nodes;
};
