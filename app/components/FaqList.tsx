import type { FaqItem } from "../data/faq";

const FaqList = ({ items }: { items: FaqItem[] }) => {
  return (
    <div className="divide-y divide-fresta rounded-lg border border-fresta bg-carvao">
      {items.map((item) => (
        <details key={item.question} className="group p-6">
          <summary className="font-display cursor-pointer list-none text-lg font-semibold text-areia">
            <h3 className="inline">{item.question}</h3>
          </summary>
          <p className="mt-3 leading-relaxed text-palha">{item.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FaqList;
