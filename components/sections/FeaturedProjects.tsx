import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/sections/ProjectCard";
import { ArrowRight } from "lucide-react";
import { getAllProjects } from "@/lib/projects";

export default async function FeaturedProjects() {
  const projects = await getAllProjects();
  const featured = projects.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <Section id="projects" className="bg-stone-100/50 dark:bg-stone-900/50">
      <Container>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <p className="mt-2 text-stone-600 dark:text-stone-400">
              A selection of recent work
            </p>
          </div>
          <Button href="/projects" variant="ghost">
            View All <ArrowRight size={16} />
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
