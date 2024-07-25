import { type Child, type Icon } from "./tree";

export const getIcon = (file: Child | string | undefined): Icon => {
  if (!file) return DEFAULT_ICON;

  if (typeof file === "string") {
    const parts = file.split(".");
    const iconName = parts[parts.length - 1];

    return ICONS[EXT_TO_LANGUAGE[iconName]] ?? DEFAULT_ICON;
  }

  return file.icon ?? DEFAULT_ICON;
};

export const EXT_TO_LANGUAGE: Record<string, string> = {
  asc: "Key",
  md: "Markdown",
};

export const ICONS: Record<string, Icon> = {
  Markdown: {
    char: " ",
    color: "#89bafa",
  },
  Key: {
    char: "󰷖 ",
    color: "#f9e2af",
  },
  TypeScript: {
    char: " ",
    color: "#4d86a2",
  },
  Rust: {
    char: " ",
    color: "#be8f78",
  },
  Instagram: {
    char: " ",
    color: "#e1306c",
  },
  Github: {
    char: "󰊤 ",
    color: "#ffffff",
  },
};

export const DEFAULT_ICON = { char: "󰈚 ", color: "#f599ae" };
