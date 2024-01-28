import { type Cell } from "./cell";

export interface TerminalElement {
  readonly data: Array<Array<Cell>>;
  readonly width: number;
  readonly height: number;
}
