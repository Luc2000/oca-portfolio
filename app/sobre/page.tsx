import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import ContactCTA from "../components/ContactCTA";

export const metadata: Metadata = {
  title: "Sobre Nós | Conheça a OCA Software House",
  description:
    "Somos uma software house especializada em aplicativos, sistemas web e MVPs. Conheça nossa história, nossa equipe e como transformamos ideias em negócios digitais.",
  alternates: {
    canonical: "/sobre",
  },
  openGraph: {
    title: "Sobre Nós | OCA Software House",
    description:
      "Conheça nossa história, nossa equipe e como transformamos ideias em negócios digitais.",
    url: "/sobre",
  },
};

const teamMembers = [
  {
    name: "Lucas Annunziato",
    role: "Fundador & Desenvolvedor Full Stack",
    bio: "Desenvolvedor com mais de 7 anos de experiência, especializado em JavaScript e ecossistemas React. Fundador do Revo, uma plataforma completa de busca de eventos e venda de ingressos, e todo seu ecossistema de produtos.",
    image: "/images/team/annunziato.png",
    imagePosition: "object-center",
  },
  {
    name: "Gabriela Dionelli",
    role: "Desenvolvedora Full Stack",
    bio: "Especialista em design de interfaces com foco em experiência do usuário e estratégias de marketing digital. Com background em psicologia e design thinking, traz uma abordagem centrada no usuário para criar produtos intuitivos e visualmente impactantes.",
    image: "/images/team/gabriela.png",
    imagePosition: "object-top",
  },
  {
    name: "Rafael Oliveira",
    role: "Desenvolvedor Full Stack",
    bio: "Desenvolvedor com 5 anos de experiência em tecnologias front-end e back-end. Especialista em React, Node.js e arquiteturas em nuvem. Possui grande habilidade em resolver problemas complexos e otimizar aplicações para alta performance.",
    image: "/images/team/rafael.png",
    imagePosition: "object-center",
  },
];

const values = [
  {
    title: "Incentivo ao empreendedorismo",
    description:
      "Acreditamos no potencial empreendedor brasileiro e trabalhamos para aumentar o número de startups e empresas de tecnologia no país.",
  },
  {
    title: "Desenvolvimento estratégico",
    description:
      "Não apenas codificamos: ajudamos a definir a estratégia de desenvolvimento e crescimento do seu produto digital.",
  },
  {
    title: "Paixão por inovação",
    description:
      "Somos movidos pela paixão de criar produtos que solucionam problemas reais e transformam mercados.",
  },
  {
    title: "Parceria de valor",
    description:
      "Valorizamos relações de longo prazo e, para projetos promissores, oferecemos possibilidade de parceria além do desenvolvimento.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-36 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="annotation mb-6">Quem constrói a OCA</p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-areia sm:text-6xl">
              Feita por quem já esteve do seu lado da mesa
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-palha sm:text-xl">
              Nossa história, nossa equipe e a missão de transformar ideias em
              negócios digitais que param em pé.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-lg border border-fresta">
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/office-image.png"
                    alt="Escritório da OCA Software House"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="annotation border-t border-fresta px-5 py-3 normal-case tracking-normal">
                  *Imagem do nosso futuro escritório. Por enquanto, somos
                  desenvolvedores nômades assistidos por IA 😄
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold tracking-tight text-areia">
                  Nossa história
                </h2>
                <p className="leading-relaxed text-palha">
                  A OCA Software House nasceu da experiência de Lucas
                  Annunziato, desenvolvedor com mais de 7 anos de atuação no
                  mercado. Após fundar e desenvolver o Revo e todo seu
                  ecossistema, uma plataforma completa para busca de eventos,
                  venda de ingressos e menu digital, Lucas decidiu compartilhar
                  seu conhecimento e visão empreendedora.
                </p>
                <p className="leading-relaxed text-palha">
                  Além do ecossistema Revo, que inclui o aplicativo Revo, o
                  gerenciador Vipou e o menu digital Meyu, Lucas trabalhou em
                  diversos projetos de investimento, adquirindo ampla
                  experiência em transformar ideias em negócios digitais
                  viáveis.
                </p>
                <p className="leading-relaxed text-palha">
                  A OCA foi criada para ir além do modelo tradicional de
                  software house. Não queremos apenas entregar código: queremos
                  ajudar empreendedores a transformarem suas ideias em startups
                  de sucesso, com desenvolvimento técnico e insights
                  estratégicos de quem já empreendeu. E construímos com IA no
                  processo inteiro, o que nos deixa mais rápidos do que times
                  muito maiores.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-fresta bg-carvao py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Nossos valores"
            title="Os princípios que definem como trabalhamos"
          />
          <div className="grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={(index % 2) * 0.1}>
                <div className="h-full border-t border-fresta py-8">
                  <h3 className="font-display text-xl font-semibold text-areia">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-palha">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Nossa equipe"
            title="Quem coloca a mão na massa"
            lede="Os profissionais por trás dos produtos que construímos."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.1}>
                <div className="flex h-full flex-col overflow-hidden rounded-lg border border-fresta bg-carvao">
                  <div className="relative aspect-square w-full border-b border-fresta">
                    <Image
                      src={member.image}
                      alt={`Foto de ${member.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`object-cover ${member.imagePosition}`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-areia">
                      {member.name}
                    </h3>
                    <p className="annotation mt-2 mb-4 text-urucum">
                      {member.role}
                    </p>
                    <p className="text-sm leading-relaxed text-palha">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16" delay={0.1}>
            <div className="rounded-lg border border-dashed border-fresta p-8 text-center">
              <p className="leading-relaxed text-palha">
                Estamos sempre em busca de talentos para projetos inovadores.
                Se você é desenvolvedor freelancer,{" "}
                <a
                  href="/contato"
                  className="text-urucum transition-colors hover:text-urucum-claro"
                >
                  junte-se à nossa rede de parceiros
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
