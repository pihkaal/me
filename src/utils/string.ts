export class CharArray {
  private readonly chars: string[];

  constructor(fill: string, size: number) {
    this.chars = fill.repeat(size).split("");
  }

  set(i: number, char: string | undefined) {
    if (char === undefined || i < 0 || i >= this.chars.length) return;
    this.chars[i] = char;

    return this;
  }

  write(i: number, str: string) {
    for (let oi = 0; oi < str.length; oi++) {
      this.set(i + oi, str[oi]);
    }

    return this;
  }

  toString() {
    return this.chars.join("");
  }
}
