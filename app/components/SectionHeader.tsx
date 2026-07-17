import Reveal from "./Reveal";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  lede?: string;
}

// Drafting-style section header: mono label over a dimension line with ticks
const SectionHeader = ({ label, title, lede }: SectionHeaderProps) => {
  return (
    <Reveal className="mb-14 sm:mb-16">
      <div className="flex items-center gap-4 mb-8">
        <span className="annotation shrink-0">{label}</span>
        <span
          aria-hidden="true"
          className="relative block h-px flex-1 bg-fresta"
        >
          <span className="absolute right-0 -top-[3px] h-[7px] w-px bg-palha" />
          <span className="absolute right-8 -top-[3px] h-[7px] w-px bg-fresta" />
          <span className="absolute right-16 -top-[3px] h-[7px] w-px bg-fresta" />
        </span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-areia max-w-2xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-5 text-lg text-palha max-w-2xl leading-relaxed">
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
};

export default SectionHeader;
