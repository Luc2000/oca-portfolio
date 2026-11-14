import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface PaginationProps {
  /* Path of page 1, the other pages live under `${basePath}/pagina/N` */
  basePath: string;
  page: number;
  totalPages: number;
}

const linkClass =
  "annotation inline-flex items-center gap-2 rounded border px-3 py-2 transition-colors";
const idleClass = "border-fresta hover:border-palha hover:text-areia";

const Pagination = ({ basePath, page, totalPages }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const hrefFor = (target: number) =>
    target === 1 ? basePath : `${basePath}/pagina/${target}`;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Paginação"
      className="mt-16 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={hrefFor(page - 1)}
          rel="prev"
          className={`${linkClass} ${idleClass}`}
        >
          <FiArrowLeft />
          Anterior
        </Link>
      ) : null}

      {pages.map((target) => (
        <Link
          key={target}
          href={hrefFor(target)}
          aria-current={target === page ? "page" : undefined}
          className={`${linkClass} ${
            target === page ? "border-urucum text-urucum" : idleClass
          }`}
        >
          {target}
        </Link>
      ))}

      {page < totalPages ? (
        <Link
          href={hrefFor(page + 1)}
          rel="next"
          className={`${linkClass} ${idleClass}`}
        >
          Próxima
          <FiArrowRight />
        </Link>
      ) : null}
    </nav>
  );
};

export default Pagination;
