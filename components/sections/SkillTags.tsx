"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import { motion } from "framer-motion";

const skills = [
  "TypeScript", "React", "Next.js", "Node.js", "Python",
  "PostgreSQL", "Docker", "AWS", "GraphQL", "Tailwind CSS",
  "Prisma", "Redis",
];

export default function SkillTags() {
  return (
    <Section className="border-t border-stone-200 dark:border-stone-800">
      <Container>
        <h2 className="mb-8 text-center text-2xl font-bold">
          Technologies I work with
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Tag>{skill}</Tag>
            </motion.span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
