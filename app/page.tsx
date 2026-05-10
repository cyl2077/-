import Hero from "@/components/sections/Hero";
import SkillTags from "@/components/sections/SkillTags";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BlogCard from "@/components/sections/BlogCard";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getAllBlogPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Hero />
      <SkillTags />
      <FeaturedProjects />

      {recentPosts.length > 0 && (
        <Section id="blog">
          <Container>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold">Latest Posts</h2>
                <p className="mt-2 text-stone-600 dark:text-stone-400">
                  Thoughts on development and design
                </p>
              </div>
              <Button href="/blog" variant="ghost">
                View All <ArrowRight size={16} />
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
