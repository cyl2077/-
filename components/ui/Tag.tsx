import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function Tag({
  children,
  active,
  onClick,
  className,
  disabled = false,
}: TagProps) {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      type={Component === "button" ? "button" : undefined}
      disabled={Component === "button" ? disabled : undefined}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-accent text-white"
          : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
        onClick &&
          (active
            ? "cursor-pointer hover:bg-accent-dark"
            : "cursor-pointer hover:bg-accent/20"),
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {children}
    </Component>
  );
}
