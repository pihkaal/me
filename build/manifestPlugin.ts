import { Plugin } from "vite";
import { readFile, writeFile } from "fs/promises";
import { spawnSync } from "child_process";
import { Octokit } from "@octokit/rest";
import { env } from "./env";

export const manifest = (): Plugin => ({
  name: "generate-pages-plugin",
  buildStart: async () => {
    const octokit = new Octokit({ auth: env.GITHUB_PAT });

    const { data: manifestRepo } = await octokit.repos.get({
      owner: env.GITHUB_USERNAME,
      repo: env.GITHUB_USERNAME,
    });
    try {
      const storedUpdatedAt = (
        await readFile("./node_modules/.cache/manifest")
      ).toString();
      if (storedUpdatedAt === manifestRepo.updated_at) return;
    } catch {}

    await writeFile("./node_modules/.cache/manifest", manifestRepo.updated_at);

    const getRepoFileContent = async (repo: string, path: string) => {
      const { data: file } = await octokit.repos.getContent({
        owner: env.GITHUB_USERNAME,
        repo,
        path,
      });

      if (Array.isArray(file) || file.type !== "file") throw new Error("");

      return Buffer.from(file.content, "base64").toString("utf8");
    };

    const manifest = JSON.parse(
      await getRepoFileContent(env.GITHUB_USERNAME, "manifest.json"),
    ) as {
      files: string[];
      projects: string[];
    };

    const projects: Array<{
      name: string;
      content: string;
      language: string | null;
      url: string;
      private: boolean;
    }> = [];
    for (const project of manifest.projects) {
      const { data: repo } = await octokit.repos.get({
        owner: env.GITHUB_USERNAME,
        repo: project,
      });
      const content = await getRepoFileContent(project, "README.md");

      projects.push({
        name: project,
        content,
        language: repo.language,
        url: repo.url,
        private: repo.private,
      });
    }

    const code = `
      const projects = ${JSON.stringify(projects, null, 2)} as const;

      export type Project = typeof projects[number];

      const projectsMap = Object.fromEntries(projects.map(project => [project.name, project])) as const;

      export const manifest = {
        projects,
        projectsMap
      };
    `;

    await writeFile("./src/manifest.ts", code);

    spawnSync("prettier", ["--write", "./src/manifest.ts"]);
  },
});
