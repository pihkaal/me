export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export const randomMinMax = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
