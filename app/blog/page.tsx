import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import BlogCard from "@/components/sections/BlogCard";
import TagFilter from "@/components/sections/TagFilter";
import { T } from "@/lib/i18n";
import { getAllBlogPosts, getAllBlogTags } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客",
  description: "关于开发、设计和技术的思考",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>;
}) {
  const { tag } = await searchParams;
  const allPosts = await getAllBlogPosts();
  const allTags = getAllBlogTags(allPosts);

  const selectedTags = tag
    ? Array.isArray(tag)
      ? tag
      : [tag]
    : [];

  const filteredPosts =
    selectedTags.length > 0
      ? allPosts.filter((p) =>
          selectedTags.some((t) => p.tags.includes(t))
        )
      : allPosts;

  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold">
            <T zh="博客" en="Blog" />
          </h1>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            <T zh="关于开发、设计和技术的思考" en="Thoughts on development, design, and technology" />
          </p>
        </div>

        <div className="mb-8">
          <TagFilter tags={allTags} selectedTags={selectedTags} />
        </div>

        {filteredPosts.length === 0 ? (
          <p className="py-12 text-center text-stone-500">
            <T zh="没有匹配该标签的文章。" en="No posts matching these tags." />
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
