import Container from "@/components/ui/Container";
import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/your-username", icon: Github, label: "GitHub" },
  {
    href: "https://linkedin.com/in/your-username",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "mailto:your@email.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-12 dark:border-stone-800">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-stone-500">
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-accent transition-colors"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
