"use client";

import Tag from "@/components/ui/Tag";
import { T } from "@/lib/i18n";
import { useRouter, useSearchParams } from "next/navigation";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
}

export default function TagFilter({ tags, selectedTags }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (tags.length === 0) return null;

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll("tag");

    if (current.includes(tag)) {
      params.delete("tag");
      current.filter((t) => t !== tag).forEach((t) => params.append("tag", t));
    } else {
      params.append("tag", tag);
    }

    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Tag
        active={selectedTags.length === 0}
        onClick={() => router.push("/blog")}
      >
        <T zh="全部" en="All" />
      </Tag>
      {tags.map((tag) => (
        <Tag
          key={tag}
          active={selectedTags.includes(tag)}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}
