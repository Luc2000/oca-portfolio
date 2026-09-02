import Link from "next/link";
import { FiInfo } from "react-icons/fi";

interface DevDisclaimerProps {
  variant?: "short" | "full";
  className?: string;
}

// Keeps the OCA legally apart from the listed devs; shown wherever a dev appears
const DevDisclaimer = ({
  variant = "short",
  className = "",
}: DevDisclaimerProps) => {
  if (variant === "short") {
    return (
      <p
        className={`flex items-start gap-2 text-sm leading-relaxed text-palha ${className}`}
      >
        <FiInfo className="mt-1 shrink-0 text-urucum" />
        <span>
          Profissionais independentes, sem vínculo com a OCA. Indicamos, mas
          não participamos do projeto.
        </span>
      </p>
    );
  }

  return (
    <aside className={`rounded-lg border border-fresta p-5 ${className}`}>
      <p className="annotation mb-3 text-urucum">Como funciona a indicação</p>
      <p className="text-sm leading-relaxed text-palha">
        Os devs desta vitrine são profissionais independentes, sem vínculo com
        a OCA. Indicamos, mas não participamos do projeto: negociação, contrato,
        prazos, entrega e suporte são tratados direto com o dev, sem nossa
        intermediação ou responsabilidade. Se prefere um time cuidando de tudo
        de ponta a ponta,{" "}
        <Link
          href="/contato"
          className="text-areia underline underline-offset-4 transition-colors hover:text-urucum"
        >
          fale com a gente
        </Link>
        .
      </p>
    </aside>
  );
};

export default DevDisclaimer;
