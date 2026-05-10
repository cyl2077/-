import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-stone-900/50",
        className
      )}
    >
      {children}
    </div>
  );
}
