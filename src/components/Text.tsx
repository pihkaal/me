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
