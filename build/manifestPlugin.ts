import { Plugin } from "vite";
import { mkdir, readFile, writeFile } from "fs/promises";
import { spawnSync } from "child_process";
import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
import { env } from "./env";
import { existsSync } from "fs";
import showdown from "showdown";

type Manifest = {
  files: string[];
  projects: string[];
  links: {
    name: string;
    url: string;
    icon: string;
  };
};

type Project = {
  name: string;
  content: string;
  language: string | null;
  url: string;
  private: boolean;
};

type File = {
  name: string;
  content: string;
};

export const manifest = (): Plugin => ({
  name: "generate-pages-plugin",
  buildStart: async () => {
    const octokit = new Octokit({ auth: env.GH_PAT });
    let manifestRepo: RestEndpointMethodTypes["repos"]["get"]["response"]["data"];

    try {
      const { data } = await octokit.repos.get({
        owner: "pihkaal",
        repo: "pihkaal",
      });
      manifestRepo = data;
    } catch {
      if (existsSync("./node_modules/.cache/assets")) {
        console.warn("WARNING: Can't update assets, using cached ones");
        return;
      } else {
        throw new Error("Can't update assets, nothing cached");
      }
    }

    try {
      const storedUpdatedAt = (
        await readFile("./node_modules/.cache/assets")
      ).toString();
      if (storedUpdatedAt === manifestRepo.updated_at) return;
    } catch {}

    await mkdir("./node_modules/.cache", { recursive: true });
    await writeFile("./node_modules/.cache/assets", manifestRepo.updated_at);

    const getRepoFileContent = async (repo: string, path: string) => {
      const { data: file } = await octokit.repos.getContent({
        owner: "pihkaal",
        repo,
        path,
      });

      if (Array.isArray(file) || file.type !== "file") throw new Error("");

      return Buffer.from(file.content, "base64").toString("utf8");
    };

    const manifest = JSON.parse(
      await getRepoFileContent("pihkaal", "manifest.json"),
    ) as Manifest;

    showdown.setFlavor("github");
    const converter = new showdown.Converter();

    const projects: Array<Project> = [];
    for (const project of manifest.projects) {
      const { data: repo } = await octokit.repos.get({
        owner: "pihkaal",
        repo: project,
      });
      const content = await getRepoFileContent(project, "README.md");
      let html = converter.makeHtml(content);

      // that's honestly not really clean but it does exactly what i need

      if (!repo.private) {
        const repoLink = `https://github.com/pihkaal/${project}`;
        if (html.includes('id="links')) {
          html = html.replace(
            'id="links">',
            `><a href=\"${repoLink}\">Repo</a> •`,
          );
        } else {
          html = html += `<br>\n<a href="${repoLink}">Github repo</>`;
        }
      }

      html = html
        .replace(new RegExp('href="https', "g"), 'target="_blank" href="https')
        .replace(
          new RegExp('target="_blank" href="https://pihkaal.me', "g"),
          'href="#',
        );

      projects.push({
        name: project,
        content: html,
        language: repo.language,
        url: repo.url,
        private: repo.private,
      });
    }

    const files: Array<File> = [];
    for (const file of manifest.files) {
      const content = await getRepoFileContent("pihkaal", file);
      const html = converter.makeHtml(content);

      files.push({
        name: file,
        content: html,
      });
    }

    const code = `
      const projects = ${JSON.stringify(projects, null, 2)} as const;

      const links = ${JSON.stringify(manifest.links, null, 2)} as const;

      const files = ${JSON.stringify(files, null, 2)} as const;

      export const assets = {
        projects,
        links,
        files
      };
    `;

    await writeFile("./src/assets.ts", code);

    spawnSync("prettier", ["--write", "./src/assets.ts"]);
  },
});
