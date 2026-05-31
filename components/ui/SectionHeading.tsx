import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label: string;
  title: string;
  className?: string;
};

export function SectionHeading({
  label,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  );
}
