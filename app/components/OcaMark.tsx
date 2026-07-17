interface OcaMarkProps {
  className?: string;
  title?: string;
}

// Vector redraw of the OCA mark (house outline + circle door),
// replacing the 1.2MB raster-embedded SVG assets
const OcaMark = ({ className, title }: OcaMarkProps) => {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M 14 82 L 14 44 L 48 14 L 82 44 L 82 82 Z"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx="48"
        cy="76"
        r="15"
        stroke="currentColor"
        strokeWidth="8"
      />
    </svg>
  );
};

export default OcaMark;
