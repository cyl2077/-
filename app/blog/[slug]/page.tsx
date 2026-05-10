import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import LocaleDate from "@/components/ui/LocaleDate";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog";
import { T } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section>
      <Container>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-stone-500 hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} /> <T zh="返回博客" en="Back to Blog" />
        </Link>

        <article className="mx-auto max-w-2xl">
          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-stone-500">
              <LocaleDate date={post.date} />
              <span>
                <T zh={`${post.readingTime} 分钟阅读`} en={`${post.readingTime} min read`} />
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${tag}`}>
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </div>
          </header>

          <div
            className="prose prose-stone max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </Container>
    </Section>
  );
}
