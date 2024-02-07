import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...values: Array<ClassValue>) => twMerge(clsx(...values));
