import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  lede?: string;
}

const SectionHeader = ({ label, title, lede }: SectionHeaderProps) => {
  return (
    <Reveal className="mb-14 sm:mb-16">
      <SectionLabel className="mb-8">{label}</SectionLabel>
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
