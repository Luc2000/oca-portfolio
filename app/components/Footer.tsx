import Link from "next/link";
import { FiGithub, FiLinkedin, FiPhone } from "react-icons/fi";
import OcaMark from "./OcaMark";
import { site, whatsappUrl, defaultWhatsappMessage } from "../data/site";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Projetos", path: "/projetos" },
  { name: "Sobre Nós", path: "/sobre" },
  { name: "Contato", path: "/contato" },
];

const Footer = () => {
  return (
    <footer className="border-t border-fresta bg-terra">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="OCA Software House - Home"
            >
              <OcaMark className="h-9 w-9 text-areia" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold tracking-wide text-areia">
                  OCA
                </span>
                <span className="annotation text-[0.55rem] tracking-[0.22em]">
                  Software House
                </span>
              </span>
            </Link>
            <p className="max-w-xs leading-relaxed text-palha">
              Construímos produtos digitais de ponta a ponta: da ideia ao MVP,
              do MVP à escala.
            </p>
          </div>

          <div>
            <h3 className="annotation mb-6">Navegação</h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-palha transition-colors hover:text-areia"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="annotation mb-6">Contato</h3>
            <ul className="space-y-3 text-palha">
              <li>
                <a
                  href={whatsappUrl(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-areia"
                >
                  <FiPhone className="text-urucum" />
                  <span>{site.phone}</span>
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-fresta text-palha transition-colors hover:border-palha hover:text-areia"
              >
                <FiGithub />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-fresta text-palha transition-colors hover:border-palha hover:text-areia"
              >
                <FiLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-4 border-t border-fresta pt-8">
          <p className="annotation normal-case tracking-normal">
            &copy; {new Date().getFullYear()} {site.name}. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
