import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Tag({
  children,
  active,
  onClick,
  className,
}: TagProps) {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-accent text-white"
          : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
        onClick && "cursor-pointer hover:bg-accent/20",
        className
      )}
    >
      {children}
    </Component>
  );
}
