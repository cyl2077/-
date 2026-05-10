import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Timeline from "@/components/sections/Timeline";
import { T } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "我的背景、经历和驱动力",
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
          <h1 className="text-4xl font-bold">
            <T zh="关于我" en="About Me" />
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="prose prose-stone dark:prose-invert">
              <p>
                <T
                  zh="我是一名全栈开发者，热衷于构建提高效率的工具。我非常注重性能、可访问性和清晰的架构。"
                  en="I'm a full-stack developer passionate about building tools that make people more productive. I care deeply about performance, accessibility, and clean architecture."
                />
              </p>
              <p>
                <T
                  zh="工作之余，我喜欢阅读系统设计相关内容、参与开源项目、探索户外。"
                  en="When I'm not coding, you'll find me reading about systems design, contributing to open source, or exploring the outdoors."
                />
              </p>
            </div>
          </div>

          <div className="space-y-12 lg:col-span-3">
            <Timeline
              items={experience}
              title={<T zh="工作经历" en="Experience" />}
            />
            <Timeline
              items={education}
              title={<T zh="教育背景" en="Education" />}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
