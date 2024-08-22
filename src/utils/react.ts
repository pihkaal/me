import { type ClassNameValue, twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const cn = (...classes: Array<ClassNameValue>) => twMerge(clsx(classes));

export const hideIf = (condition: boolean) => (condition ? "hidden" : "");
