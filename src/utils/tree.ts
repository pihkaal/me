import { DEFAULT_ICON, ICONS, getIcon } from "./icons";

export type Icon = {
  char: string;
  color: string;
};

export type Project = {
  type: "project";
  name: string;
  url: string;
  private: boolean;
  content: string;
  icon: Icon;
};

export type File = {
  type: "file";
  name: string;
  content: string;
  icon: Icon;
};

export type Link = {
  type: "link";
  name: string;
  url: string;
  icon: Icon;
};

export type Folder = {
  name: string;
  type: "folder";
  children: Array<Child>;
  opened: boolean;
};

export type Child = Link | Project | File;

export const sortFiles = (files: Array<Folder | Child>) =>
  files
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) =>
      a.type === "folder" && b.type !== "folder"
        ? -1
        : a.type !== "folder" && b.type === "folder"
          ? 1
          : 0,
    );

export const folder = (name: string, children: Array<Child>): Folder => ({
  type: "folder",
  name,
  opened: false,
  children,
});

export const link = (name: string, url: string, icon: Icon): Link => ({
  type: "link",
  name,
  url,
  icon,
});

export const file = (
  name: string,
  content: string,
  icon: Icon = getIcon(name),
): File => ({
  type: "file",
  name,
  content,
  icon,
});

export const project = (
  name: string,
  content: string,
  url: string,
  language: string,
  priv: boolean,
): Project => ({
  type: "project",
  name,
  content,
  url,
  icon: ICONS[language] ?? DEFAULT_ICON,
  private: priv,
});

export const icon = (char: string, color: string): Icon => ({
  char,
  color,
});
