import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/sections/ProjectCard";
import { T } from "@/lib/i18n";
import { getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目",
  description: "我构建的项目集合",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold">
            <T zh="项目" en="Projects" />
          </h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            <T zh="我构建和参与的项目" en="Things I've built and contributed to" />
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="py-12 text-center text-stone-500">
            <T zh="暂无项目，敬请期待！" en="No projects yet. Check back soon!" />
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
