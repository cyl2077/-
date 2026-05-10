import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { T } from "@/lib/i18n";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pb-24 pt-32 md:pt-40">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-sm text-accent">
            <T zh="你好，我是" en="Hi, I'm" />
          </p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            陈辉
          </h1>
          <h2 className="mb-6 text-xl text-stone-500 dark:text-stone-400 md:text-2xl">
            <T
              zh="全栈开发者，专注于打造优质的数字体验"
              en="Full-stack developer crafting thoughtful digital experiences"
            />
          </h2>
          <p className="mb-8 max-w-lg text-stone-600 dark:text-stone-400">
            <T
              zh="热衷于构建快速、易用且美观的 Web 应用。目前专注于 React 生态系统和后端架构。"
              en="I build fast, accessible, and beautiful web applications. Currently focused on the React ecosystem and backend architecture."
            />
          </p>
          <div className="flex gap-4">
            <Button href="/projects">
              <T zh="查看项目" en="View Projects" /> <ArrowRight size={16} />
            </Button>
            <Button href="/contact" variant="secondary">
              <T zh="联系我" en="Get in Touch" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
