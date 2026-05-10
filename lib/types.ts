export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  order: number;
  contentHtml: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  contentHtml: string;
  readingTime: number;
}
