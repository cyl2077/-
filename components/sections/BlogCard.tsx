import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  readingTime: number;
}

export default function BlogCard({
  title,
  description,
  date,
  tags,
  slug,
  readingTime,
}: BlogCardProps) {
  return (
    <Card>
      <Link
        href={`/blog/${slug}`}
        className="mb-2 text-lg font-semibold hover:text-accent transition-colors"
      >
        {title}
      </Link>
      <div className="mb-2 flex items-center gap-3 text-xs text-stone-500">
        <time dateTime={date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>{readingTime} min read</span>
      </div>
      <p className="mb-3 text-sm text-stone-600 dark:text-stone-400">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Card>
  );
}
