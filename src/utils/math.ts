export const clamp = (v: number, min: number, max: number): number =>
  Math.min(Math.max(min, v), max);

export const clamp01 = (v: number): number => clamp(v, 0, 1);

export const floorAll = (...xs: Array<number>): Array<number> =>
  xs.map(Math.floor);
