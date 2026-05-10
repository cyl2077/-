import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { BlogPost } from "@/lib/types";

const blogDir = path.join(process.cwd(), "content/blog");

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

export async function getAllBlogPosts(): Promise<
  Omit<BlogPost, "contentHtml">[]
> {
  if (!fs.existsSync(blogDir)) return [];

  const filenames = fs.readdirSync(blogDir);
  const posts = filenames
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        tags: data.tags || [],
        description: data.description || "",
        readingTime: calculateReadingTime(content),
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return posts;
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const filePath = path.join(blogDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    tags: data.tags || [],
    description: data.description || "",
    readingTime: calculateReadingTime(content),
    contentHtml: processed.toString(),
  };
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllBlogTags(
  posts: Omit<BlogPost, "contentHtml">[]
): string[] {
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
