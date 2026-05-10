import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pb-24 pt-32 md:pt-40">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-sm text-accent">Hi, I&apos;m</p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Your Name
          </h1>
          <h2 className="mb-6 text-xl text-stone-500 dark:text-stone-400 md:text-2xl">
            Full-stack developer crafting thoughtful digital experiences
          </h2>
          <p className="mb-8 max-w-lg text-stone-600 dark:text-stone-400">
            I build fast, accessible, and beautiful web applications. Currently
            focused on the React ecosystem and backend architecture.
          </p>
          <div className="flex gap-4">
            <Button href="/projects">
              View Projects <ArrowRight size={16} />
            </Button>
            <Button href="/contact" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
