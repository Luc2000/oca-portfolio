import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import FaqList from "./FaqList";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { companyFaq } from "../data/faq";
import { faqPageSchema } from "../lib/seo";

const faqJsonLd = {
  "@context": "https://schema.org",
  ...faqPageSchema(companyFaq),
};

const CompanyFaq = () => {
  return (
    <section className="py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Perguntas frequentes"
          title="O que perguntam antes de contratar uma software house"
        />
        <Reveal>
          <FaqList items={companyFaq} />
        </Reveal>
        <Reveal className="mt-10">
          <Link href="/precos" className="btn-secondary">
            Ver guias de preço
            <FiArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default CompanyFaq;
