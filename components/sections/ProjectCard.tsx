import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  slug: string;
  demoUrl?: string;
  repoUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  slug,
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  return (
    <Card>
      <div className="flex h-full flex-col">
        <Link
          href={`/projects/${slug}`}
          className="mb-3 text-lg font-semibold hover:text-accent transition-colors"
        >
          {title}
        </Link>
        <p className="mb-4 flex-1 text-sm text-stone-600 dark:text-stone-400">
          {description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="flex gap-3 text-sm">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-stone-500 hover:text-accent transition-colors"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
