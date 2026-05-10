import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Project } from "@/lib/types";

const projectsDir = path.join(process.cwd(), "content/projects");

export async function getAllProjects(): Promise<Omit<Project, "contentHtml">[]> {
  if (!fs.existsSync(projectsDir)) return [];

  const filenames = fs.readdirSync(projectsDir);
  const projects = filenames
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(projectsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        tech: data.tech || [],
        image: data.image || "",
        demoUrl: data.demoUrl || undefined,
        repoUrl: data.repoUrl || undefined,
        order: data.order || 999,
      };
    })
    .sort((a, b) => a.order - b.order);

  return projects;
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  const filePath = path.join(projectsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    tech: data.tech || [],
    image: data.image || "",
    demoUrl: data.demoUrl || undefined,
    repoUrl: data.repoUrl || undefined,
    order: data.order || 999,
    contentHtml: processed.toString(),
  };
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
