import { cn } from "@/lib/utils";

type SectionLabelChipProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabelChip({ children, className }: SectionLabelChipProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border border-hero-foreground bg-hero-foreground px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
