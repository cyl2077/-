import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/sections/ContactForm";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — I'd love to hear from you",
};

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Have a question or want to work together? Get in touch.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Reach me at</h3>
              <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                <a
                  href="mailto:your@email.com"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Mail size={16} /> your@email.com
                </a>
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> Your Location
                </span>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">Elsewhere</h3>
              <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href="https://linkedin.com/in/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
