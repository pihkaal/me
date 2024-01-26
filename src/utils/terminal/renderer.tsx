import { type ReactNode } from "react";
import { floorAll } from "../math";
import { type CellStyle, type Cell } from "./cell";
import { type TerminalElement } from "./element";

export class TerminalRenderer implements TerminalElement {
  public readonly data: Array<Array<Cell>>;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly defaultStyle: CellStyle = {},
  ) {
    [this.width, this.height] = floorAll(this.width, this.height);

    this.data = new Array(this.height).fill(0).map(() =>
      new Array<Cell>(this.width).fill({
        char: " ",
        ...defaultStyle,
      }),
    );
  }

  apply(x: number, y: number, cell: Partial<Cell>): void {
    [x, y] = floorAll(x, y);

    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;

    this.data[y][x] = {
      ...this.data[y][x],
      ...cell,
    };
  }

  write(x: number, y: number, text: string, style: CellStyle = {}): void {
    [x, y] = floorAll(x, y);

    for (let i = 0; i < text.length; i++) {
      this.apply(x + i, y, {
        char: text[i],
        ...style,
      });
    }
  }

  writeFilter(
    x: number,
    y: number,
    text: string,
    filter: (cell: Cell) => Cell,
  ): void {
    [x, y] = floorAll(x, y);

    for (let i = 0; i < text.length; i++) {
      this.apply(x + i, y, {
        ...filter(this.data[y][x + i]),
        char: text[i],
      });
    }
  }

  writeElement(canvas: TerminalElement, dx: number, dy: number): void {
    [dx, dy] = floorAll(dx, dy);

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        this.apply(dx + x, dy + y, canvas.data[y][x]);
      }
    }
  }

  subCanvas(
    x: number,
    y: number,
    width: number,
    height: number,
  ): TerminalRenderer {
    [x, y, width, height] = floorAll(x, y, width, height);

    const canvas = new TerminalRenderer(width, height);
    for (let cy = 0; cy < height; cy++) {
      for (let cx = 0; cx < width; cx++) {
        canvas.apply(cx, cy, this.data[y + cy][x + cx]);
      }
    }

    return canvas;
  }

  render(): Array<ReactNode> {
    const nodes: Array<ReactNode> = [];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.data[y][x];
        /*
        const span = document.createElement("span");
        span.innerHTML = cell.char;
        span.style.color = cell.foreground ?? "unset";
        span.style.background = cell.background ?? "unset";
        span.style.fontWeight = String(cell.fontWeight ?? "unset");

        target.appendChild(span);
        */
        nodes.push(
          <span
            key={`${x}-${y}`}
            style={{
              color: cell.foreground,
              background: cell.background,
              fontWeight: cell.fontWeight,
            }}
          >
            {cell.char}
          </span>,
        );
      }

      nodes.push(<br key={y} />);
    }

    return nodes;
  }
}
