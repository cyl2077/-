import Container from "@/components/ui/Container";
import { T } from "@/lib/i18n";
import { Github, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/cyl2077", icon: Github, label: "GitHub" },
  { href: "mailto:1256312530@qq.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-12 dark:border-stone-800">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-stone-500">
            &copy; {new Date().getFullYear()} 陈辉. <T zh="保留所有权利。" en="All rights reserved." />
          </p>
          <div className="flex items-center gap-4">
            {socials.map(({ href, icon: Icon, label }) => {
              const isExternal = !href.startsWith("mailto:");
              return (
                <a
                  key={label}
                  href={href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-stone-400 hover:text-accent transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
