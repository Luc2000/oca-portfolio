# OCA Software House - Portfolio

Site institucional da OCA Software House: [ocasoftwarehouse.com.br](https://www.ocasoftwarehouse.com.br)

## 🧰 Stack

- **Next.js 16** (App Router, React Server Components)
- **React 19** + **TypeScript**
- **Tailwind CSS 4** (config CSS-first via `@theme`)
- **Framer Motion** para animações
- **React Icons**

## 📂 Estrutura

- `/app`: App Router
  - `/components`: componentes compartilhados (client islands + server components)
  - `/data`: fonte única de dados de projetos e constantes do site
  - `/projetos`, `/sobre`, `/contato`: páginas
  - `sitemap.ts`, `robots.ts`, `manifest.ts`: SEO gerado pelo App Router
- `/public`: assets estáticos

## 🚀 Rodando localmente

```bash
yarn install
yarn dev
```

O site sobe em [http://localhost:3000](http://localhost:3000).

## 📦 Build

```bash
yarn build
yarn start
```

## 🔍 SEO

- Metadata por página via `generateMetadata`/`export const metadata`
- Páginas de projeto geradas estaticamente com `generateStaticParams`
- JSON-LD (Organization, WebSite, BreadcrumbList)
- Sitemap e robots dinâmicos

## ✏️ Conteúdo

- Projetos: edite `app/data/projects.ts` (fonte única usada pela home, listagem e páginas de detalhe)
- Contatos e links: edite `app/data/site.ts`

## 📄 Licença

MIT © OCA Software House
