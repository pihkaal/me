import { File, Icon } from "./types";

export const getIcon = (file: File | string | undefined): Icon => {
  if (file === undefined) return ICONS["UNKNOWN"];

  let iconName;
  if (typeof file === "string") {
    const parts = file.split(".");
    iconName = parts[parts.length - 1];
  } else {
    iconName = file.icon;
    if (!iconName) {
      const parts = file.name.split(".");
      iconName = parts[parts.length - 1];
    }
  }

  if (!ICONS[iconName]) iconName = "UNKNOWN";
  return ICONS[iconName];
};

export const ICONS: Record<string, Icon> = {
  md: {
    char: " ",
    color: "#89bafa",
  },
  asc: {
    char: "󰷖 ",
    color: "#f9e2af",
  },
  ts: {
    char: " ",
    color: "#4d86a2",
  },
  rs: {
    char: " ",
    color: "#be8f78",
  },
  instagram: {
    char: " ",
    color: "#e1306c",
  },
  github: {
    char: "󰊤 ",
    color: "#ffffff",
  },
  UNKNOWN: { char: "󰈚 ", color: "#f599ae" },
};
