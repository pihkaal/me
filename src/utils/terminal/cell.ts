export type Cell = {
  char: string;
} & CellStyle;

export type CellStyle = Partial<{
  foreground: string;
  background: string;
  fontWeight: number;
}>;
