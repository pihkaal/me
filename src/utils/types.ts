export type Manifest = {
  projects: Array<{
    name: string;
    files: Array<string>;
  }>;
};
