import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import { T } from "@/lib/i18n";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Section>
      <Container>
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} /> <T zh="返回项目列表" en="Back to Projects" />
        </Link>

        <article className="max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>
          <p className="mb-6 text-lg text-stone-600 dark:text-stone-400">
            {project.description}
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="mb-8 flex gap-4">
            {project.demoUrl && (
              <Button href={project.demoUrl}>
                <ExternalLink size={16} /> <T zh="在线演示" en="Live Demo" />
              </Button>
            )}
            {project.repoUrl && (
              <Button href={project.repoUrl} variant="secondary">
                <Github size={16} /> <T zh="源代码" en="Source Code" />
              </Button>
            )}
          </div>

          <div
            className="prose prose-stone max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        </article>
      </Container>
    </Section>
  );
}
