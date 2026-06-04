type CtaSlideLabelProps = {
  label: string;
};

export function CtaSlideLabel({ label }: CtaSlideLabelProps) {
  return (
    <span className="relative block h-[1.25em] overflow-hidden">
      <span className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-1/2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <span className="flex h-[1.25em] items-center leading-none">{label}</span>
        <span className="flex h-[1.25em] items-center leading-none" aria-hidden>
          {label}
        </span>
      </span>
    </span>
  );
}
