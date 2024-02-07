export const clamp = (v: number, min: number, max: number): number =>
  Math.min(Math.max(min, v), max);

export const clamp01 = (v: number): number => clamp(v, 0, 1);

export const clamp0 = (v: number): number => clamp(v, 0, v);

export const floorAll = (...xs: Array<number>): Array<number> =>
  xs.map(Math.floor);

/**
 * Random int in [min, max[
 */
export const randomMinMax = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min - 1) + min);

export const randomSign = (): number => Math.sign(randomMinMax(0, 2) - 1);
