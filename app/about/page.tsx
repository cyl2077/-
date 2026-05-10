import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Timeline from "@/components/sections/Timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "My background, experience, and what drives me",
};

const experience = [
  {
    title: "Senior Full-Stack Developer",
    organization: "Tech Company",
    period: "2023 — Present",
    description:
      "Leading frontend architecture and building internal tools. Migrated legacy systems to Next.js, improving performance by 40%.",
  },
  {
    title: "Full-Stack Developer",
    organization: "Startup Inc.",
    period: "2021 — 2023",
    description:
      "Built core product features across the stack. Designed REST APIs and implemented real-time collaboration features.",
  },
];

const education = [
  {
    title: "B.S. Computer Science",
    organization: "University Name",
    period: "2017 — 2021",
    description:
      "Focus on software engineering and distributed systems. Dean's list.",
  },
];

export default function AboutPage() {
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold">About Me</h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="prose prose-stone dark:prose-invert">
              <p>
                I&apos;m a full-stack developer passionate about building tools
                that make people more productive. I care deeply about
                performance, accessibility, and clean architecture.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me reading about
                systems design, contributing to open source, or exploring the
                outdoors.
              </p>
            </div>
          </div>

          <div className="space-y-12 lg:col-span-3">
            <Timeline items={experience} title="Experience" />
            <Timeline items={education} title="Education" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
