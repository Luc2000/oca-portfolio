interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

// Mono label over a dimension line with ticks, the drafting layer of the design
const SectionLabel = ({ children, className = "" }: SectionLabelProps) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="annotation shrink-0">{children}</span>
      <span
        aria-hidden="true"
        className="relative block h-px flex-1 bg-fresta"
      >
        <span className="absolute right-0 -top-[3px] h-[7px] w-px bg-palha" />
        <span className="absolute right-8 -top-[3px] h-[7px] w-px bg-fresta" />
        <span className="absolute right-16 -top-[3px] h-[7px] w-px bg-fresta" />
      </span>
    </div>
  );
};

export default SectionLabel;
