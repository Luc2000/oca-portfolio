import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import OcaMark from "./components/OcaMark";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
      <OcaMark className="h-20 w-20 text-fresta" />
      <p className="annotation mt-10">Erro 404 / fora da planta</p>
      <h1 className="font-display mt-4 max-w-lg text-3xl font-semibold tracking-tight text-areia sm:text-4xl">
        Esta página não está no projeto
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-palha">
        O endereço pode ter sido movido, removido ou talvez nunca tenha
        existido.
      </p>
      <Link href="/" className="btn-secondary mt-10">
        <FiArrowLeft />
        Voltar para a home
      </Link>
    </div>
  );
}
