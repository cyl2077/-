import Card from "@/components/ui/Card";

interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
  title: string;
}

export default function Timeline({ items, title }: TimelineProps) {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>
      <div className="relative border-l border-stone-300 dark:border-stone-700">
        {items.map((item, i) => (
          <div key={i} className="mb-8 ml-6">
            <div className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-white dark:bg-stone-950" />
            <Card className="!p-5" hover={false}>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-accent">{item.organization}</p>
              <p className="mb-2 text-xs text-stone-500">{item.period}</p>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                {item.description}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
