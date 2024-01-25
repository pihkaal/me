import { type Cell, type CellStyle } from "../cell";
import { TerminalCanvas } from "../canvas";
import { type TerminalElement } from "../element";

export class TerminalBoxElement implements TerminalElement {
  public readonly data: Array<Array<Cell>>;

  constructor(
    public readonly width: number,
    public readonly height: number,
    style: CellStyle = {},
  ) {
    const canvas = new TerminalCanvas(width, height, style);

    if (width == 1 && height > 1) {
      for (let y = 0; y < height - 1; y++) {
        canvas.write(0, y, "│");
      }
    } else if (height == 1 && width > 1) {
      canvas.write(0, 0, "─".repeat(width - 2));
    } else {
      canvas.write(0, 0, "┌");
      canvas.write(width - 1, 0, "┐");
      canvas.write(0, height - 1, "└");
      canvas.write(width - 1, height - 1, "┘");

      canvas.write(1, 0, "─".repeat(width - 2));
      canvas.write(1, height - 1, "─".repeat(width - 2));

      for (let y = 1; y < height - 1; y++) {
        canvas.write(0, y, "│");
        canvas.write(width - 1, y, "│");
      }
    }

    this.data = canvas.data;
  }
}
