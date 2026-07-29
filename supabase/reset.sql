-- ===========================================================================
-- FULL RESET for the oca.dev.br blog schema.
-- Drops everything, rebuilds the final schema (clientes/devs audiences,
-- 7 categories) and restores the posts published so far.
-- Safe to run multiple times. Run in the Supabase SQL editor of the
-- project iijrxfpfgankvqsyupog.
-- ===========================================================================

drop table if exists blog_posts cascade;
drop table if exists blog_categories cascade;

-- ===========================================================================
-- Blog schema for oca.dev.br — run in the Supabase SQL editor before first use.
-- Shape mirrors github.com/Luc2000/ai-blog-generator-template so the generator
-- writes directly into these tables.
-- ===========================================================================

create extension if not exists "uuid-ossp";

create table if not exists blog_categories (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  name text not null,
  audience text not null check (audience in ('clientes', 'devs')),
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category_id uuid references blog_categories(id) on delete restrict,
  tags text[] not null default '{}',
  featured_image text,
  featured_image_alt text,
  author_name text not null,
  meta_title text,
  meta_description text,
  target_city text,
  target_state text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  is_featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_at_idx
  on blog_posts (published_at desc);
create index if not exists blog_posts_category_id_idx
  on blog_posts (category_id);
create index if not exists blog_posts_status_idx
  on blog_posts (status);

-- The site reads with the anon key: published posts only. The generator writes
-- with the service role key, which bypasses RLS.
alter table blog_categories enable row level security;
alter table blog_posts enable row level security;

create policy "public read categories"
  on blog_categories for select
  using (true);

create policy "public read published posts"
  on blog_posts for select
  using (status = 'published');

-- Categories. clientes = quem quer contratar/tirar a ideia do papel,
-- devs = rede de parceiros. Must match generator/blog-config.ts.
insert into blog_categories (slug, name, audience) values
  ('criar-aplicativo', 'Criar um Aplicativo', 'clientes'),
  ('mvp-e-startups', 'MVP e Startups', 'clientes'),
  ('ia-para-empresas', 'IA para Empresas', 'clientes'),
  ('software-sob-medida', 'Software Sob Medida', 'clientes'),
  ('tecnologia-e-negocios', 'Tecnologia e Negócios', 'clientes'),
  ('freelance-dev', 'Freelance para Devs', 'devs'),
  ('carreira-dev', 'Carreira Dev', 'devs')
on conflict (slug) do nothing;

-- ===========================================================================
-- Restore posts published before this reset.
-- ===========================================================================

insert into blog_posts (
  title, slug, excerpt, content, category_id, tags,
  featured_image, featured_image_alt, author_name,
  meta_title, meta_description, status, is_featured,
  published_at, created_at, updated_at
)
select
  $post$Quanto custa criar um aplicativo em 2026: faixas reais de preço e o que faz o valor mudar$post$,
  $post$quanto-custa-criar-um-aplicativo-2026$post$,
  $post$Faixas reais de preço para saber quanto custa criar um aplicativo em 2026: MVP enxuto, app completo, o que muda o valor e como fugir de orçamento furado.$post$,
  $post$<p>Você tem uma ideia de aplicativo e digitou no Google a pergunta mais natural do mundo: quanto custa criar um aplicativo? As respostas que apareceram vão de R$ 3 mil a R$ 500 mil, e agora você está mais perdido do que antes. Respira. Vamos por partes. Essa variação gigante não é má fé de quem responde. É sinal de que a palavra "aplicativo" descreve coisas muito diferentes, do cardápio digital ao marketplace com pagamento embutido. Neste artigo você vai ver faixas reais de preço praticadas no Brasil em 2026, entender o que faz um orçamento dobrar e aprender a identificar a proposta barata demais que costuma custar o dobro no final.</p>
<p>Os valores aqui não saíram de uma tabela genérica. Saíram de orçamentos reais de quem constrói e opera aplicativos em produção, incluindo um com mais de 40 mil usuários. Você vai chegar ao fim sabendo em qual faixa o seu projeto se encaixa.</p>
<h2>A pergunta certa não é essa</h2>
<p>A pergunta certa não é "quanto custa criar um aplicativo". A pergunta certa é: quanto do meu aplicativo eu preciso construir agora?</p>
<p>O erro mais caro de um fundador de primeira viagem não está no orçamento, está no escopo. A maioria chega com a versão completa da ideia na cabeça: login social, chat, notificações, programa de pontos, versão para o lojista, painel de métricas. Pede orçamento disso tudo e toma um susto.</p>
<p>Só que existe um dado desconfortável nesse mercado: a maior parte dos aplicativos falha por falta de validação, não por falta de funcionalidade. Usuários reais usam uma fração pequena do que foi construído. Cada tela a mais que você encomenda antes de ter usuários é dinheiro apostado em uma hipótese que ninguém testou.</p>
<p>Por isso as faixas abaixo estão organizadas por estágio, e não por tipo de app. Seu primeiro produto não precisa ser perfeito. Precisa existir.</p>
<h2>Quanto custa criar um aplicativo em 2026: as faixas reais</h2>
<h3>Validação da ideia: de R$ 0 a R$ 5 mil</h3>
<p>Antes de qualquer linha de código, dá para testar a ideia com uma landing page, um protótipo navegável no Figma e conversas estruturadas com potenciais usuários. Se ninguém demonstrar interesse nessa etapa, você acabou de economizar o valor de um carro.</p>
<h3>MVP enxuto: de R$ 40 mil a R$ 80 mil</h3>
<p>É a primeira versão de verdade: o fluxo principal do produto funcionando, cadastro de usuários, backend simples e publicação nas lojas. Feito com React Native, uma única base de código roda em iPhone e Android, o que corta o custo quase pela metade em relação a desenvolver duas versões nativas separadas. Prazo típico: 8 a 12 semanas com um time sênior.</p>
<h3>Aplicativo intermediário: de R$ 80 mil a R$ 150 mil</h3>
<p>Aqui entram pagamentos dentro do app, notificações push, painel administrativo para você operar o negócio e integrações com outros sistemas. É a faixa comum para produtos que já validaram a ideia e precisam começar a cobrar. Prazo: 3 a 5 meses.</p>
<h3>Aplicativo completo: de R$ 150 mil a R$ 400 mil ou mais</h3>
<p>Produtos com checkout próprio, funcionalidades em tempo real, múltiplos perfis de usuário e volume alto de acessos. Nessa faixa o custo não vem só de escrever código. Vem de arquitetura, segurança e da garantia de que nada cai quando mil pessoas usam ao mesmo tempo.</p>
<p>E falta um número que quase nenhum orçamento menciona: manutenção. Um aplicativo em produção custa entre 10% e 20% do valor de desenvolvimento por ano, somando servidores, atualizações exigidas pelas lojas e correções. App não é obra entregue, é operação.</p>
<h2>O que faz o valor mudar: seis fatores que pesam no orçamento</h2>
<p>Duas ideias parecidas podem receber orçamentos com o dobro de diferença entre si. Quase sempre a explicação está em um destes fatores:</p>
<ol>
<li><strong>Plataformas.</strong> iOS e Android nativos separados praticamente dobram o custo. Tecnologias multiplataforma como React Native atendem os dois com uma base só, e são o padrão sensato para a grande maioria dos produtos novos.</li>
<li><strong>Backend.</strong> Um app que só exibe conteúdo é barato. Um app com contas de usuário, dados sincronizados e regras de negócio precisa de um servidor bem construído, e é aí que mora boa parte do orçamento.</li>
<li><strong>Integrações.</strong> Pagamento com Pix e cartão, mapas, login social, sistemas internos da sua empresa. Cada integração adiciona dias ou semanas de desenvolvimento e testes.</li>
<li><strong>Design.</strong> Componentes prontos bem aplicados são rápidos e ficam bons. Um design proprietário, com pesquisa de usuários e identidade própria, adiciona semanas. Nem todo produto precisa disso na primeira versão.</li>
<li><strong>Painel administrativo.</strong> O app que o cliente vê é metade do produto. Você vai precisar de uma ferramenta para gerenciar usuários, conteúdo e pedidos, e ela costuma representar de 20% a 30% do esforço total.</li>
<li><strong>Senioridade do time.</strong> Dev júnior custa menos por hora e mais por projeto. Retrabalho, decisões erradas de arquitetura e prazo estourado não aparecem na proposta, mas aparecem na fatura.</li>
</ol>
<h2>Quanto custa criar um aplicativo quando o orçamento é barato demais</h2>
<p>Se as faixas acima são reais, o que explica a proposta de R$ 8 mil pelo "app completo"? Quase sempre, uma destas três situações:</p>
<p><strong>Template maquiado.</strong> Existe código pronto à venda para quase todo tipo de app. Trocam a logo, mudam as cores e entregam. Funciona na demonstração e quebra na primeira funcionalidade que o seu negócio precisa e que o template não previu.</p>
<p><strong>Alguém aprendendo no seu projeto.</strong> Dev iniciante cobrando barato para montar portfólio. A intenção pode até ser boa, mas decisões erradas de arquitetura no início viram um teto: chega uma hora em que o app não aguenta crescer e precisa ser reescrito do zero.</p>
<p><strong>Escopo fantasma.</strong> A proposta não especifica o que está incluído. Depois do contrato assinado, cada detalhe vira um adicional cobrado à parte, e o valor final passa longe do combinado. Ao comparar propostas, compare escopos, não números.</p>
<p>Aqui entra um viés de comportamento que vale conhecer: ancoragem. Depois de ver uma proposta de R$ 8 mil, a de R$ 60 mil parece um absurdo, mesmo sendo o preço honesto do trabalho bem feito. O orçamento barato define a régua errada na sua cabeça.</p>
<p>O roteiro dos projetos que chegam para resgate é quase sempre o mesmo: o app barato fica pronto pela metade, o desenvolvedor some ou a qualidade impede a publicação nas lojas, e o fundador paga de novo, agora pelo produto inteiro. O orçamento de R$ 10 mil vira R$ 70 mil, com seis meses e muita energia perdidos no caminho.</p>
<h2>Como um app completo se comporta na vida real</h2>
<p>Para dar concretude à faixa mais alta: na OCA a gente construiu e opera o Revo, uma plataforma de eventos com mais de 40 mil usuários cadastrados, mais de 300 eventos por mês e checkout próprio que converte 90% dos pagamentos iniciados. É um app da categoria "completo": pagamentos, tempo real, volume e operação contínua.</p>
<p>Ele não nasceu assim. A primeira versão era muito menor, e cada camada foi adicionada depois que o uso real justificou o investimento. É o caminho que recomendamos para quem está começando, porque foi o que funcionou com o nosso próprio dinheiro.</p>
<p>Quando chegar a hora de construir, é isso que a OCA faz: time sênior, escopo honesto e a experiência de quem mantém produto próprio em produção. Se quiser ver o que já saiu daqui, o <a href="https://oca.dev.br/projetos">portfólio da OCA</a> está aberto.</p>
<h2>Seu próximo passo, com ou sem orçamento</h2>
<p>Se você ainda não validou a ideia, faça isso antes de gastar um real: descreva o problema que o app resolve em uma frase, encontre dez pessoas que têm esse problema e pergunte como elas o resolvem hoje. Isso você consegue validar essa semana, sem gastar nada. Se as respostas animarem, aí sim vale falar de números.</p>
<p>Se a ideia já passou por esse teste e você quer uma faixa de preço para o seu caso específico, o caminho mais rápido é uma conversa. Conte o que você quer construir e a gente devolve uma estimativa honesta, incluindo o que achamos que você não deveria construir agora.</p>
<p><a href="https://wa.me/5511949629527?text=Ol%C3%A1%20Lucas%2C%20li%20um%20artigo%20no%20blog%20da%20OCA%20e%20quero%20conversar%20sobre%20criar%20um%20aplicativo." class="blog-cta-link">Fale com a OCA sobre o seu aplicativo</a></p>$post$,
  id,
  array[$post$quanto custa criar um aplicativo$post$, $post$criar aplicativo$post$, $post$custo de aplicativo$post$, $post$mvp$post$, $post$react native$post$]::text[],
  $post$https://images.unsplash.com/photo-1711606815631-38d32cdaec3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODMyNjN8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMGJ1ZGdldHxlbnwwfDB8fHwxNzg1MzQyNTc3fDA&ixlib=rb-4.1.0&q=80&w=1080$post$,
  $post$a calculator sitting on top of a table next to a laptop$post$,
  $post$Gabriela Dionelli$post$,
  $post$Quanto Custa Criar um Aplicativo em 2026? Faixas Reais de Preço$post$,
  $post$Veja quanto custa criar um aplicativo em 2026, com faixas honestas de preço, o que encarece o projeto e como evitar orçamentos baratos que saem caros.$post$,
  'published',
  false,
  $post$2026-07-29T18:13:49.948+00:00$post$::timestamptz,
  $post$2026-07-29T18:13:51.026488+00:00$post$::timestamptz,
  $post$2026-07-29T18:13:51.026488+00:00$post$::timestamptz
from blog_categories where slug = $post$criar-aplicativo$post$;
insert into blog_posts (
  title, slug, excerpt, content, category_id, tags,
  featured_image, featured_image_alt, author_name,
  meta_title, meta_description, status, is_featured,
  published_at, created_at, updated_at
)
select
  $post$Quanto custa um MVP e o que cortar do escopo sem matar o produto$post$,
  $post$quanto-custa-um-mvp-e-o-que-cortar-do-escopo$post$,
  $post$Quanto custa um MVP: faixas de preço em reais, prazos em semanas e como cortar escopo sem matar o produto. Guia direto para quem investe do próprio bolso.$post$,
  $post$<p>Você tem uma ideia de produto, um orçamento que saiu da sua reserva pessoal e uma aba aberta no Google perguntando quanto custa um MVP. Talvez já tenha recebido propostas que vão de R$ 15 mil a R$ 200 mil para a mesma ideia, e agora está mais confuso do que antes. Respira. Vamos por partes. Essa variação existe porque cada proposta precifica um escopo diferente, e escopo é justamente o que ninguém te ensinou a controlar. Este artigo faz duas coisas: entrega faixas de preço realistas, em reais e em semanas, e ensina a habilidade que mais protege o seu dinheiro nessa fase, que é cortar escopo sem matar o produto.</p>
<h2>Quanto custa um MVP: faixas realistas em reais e semanas</h2>
<p>Números primeiro, porque foi isso que você veio buscar. As faixas abaixo refletem o que vemos na prática construindo primeiros produtos para fundadores no Brasil:</p>
<ul>
<li><strong>Validação sem código: de R$ 0 a R$ 5 mil, em 1 a 2 semanas.</strong> Landing page, formulário de interesse, protótipo navegável no Figma, lista de espera. Não é um MVP no sentido técnico, mas é onde a maioria das ideias deveria começar.</li>
<li><strong>MVP de uma funcionalidade: de R$ 30 mil a R$ 70 mil, em 6 a 10 semanas.</strong> Um produto de verdade, em produção, que resolve um problema específico de ponta a ponta. É nessa faixa que a maior parte dos primeiros produtos deveria viver.</li>
<li><strong>MVP com mais superfície: de R$ 70 mil a R$ 150 mil, em 10 a 16 semanas.</strong> Para quando o núcleo do produto exige mais peças para funcionar: pagamento integrado, dois tipos de usuário, aplicativo e painel web ao mesmo tempo.</li>
</ul>
<p>O que move o número dentro dessas faixas: integrações com sistemas externos, fluxo de pagamento, quantidade de telas e a senioridade de quem constrói. Um time barato cobra menos por hora e consome mais horas, com retrabalho no meio do caminho. No fim, o desconto evapora.</p>
<p>Guarde uma referência simples: cada funcionalidade que entra no escopo adiciona semanas de trabalho e milhares de reais. Cortar escopo não é economizar no produto. É escolher onde o seu dinheiro tem chance de virar aprendizado.</p>
<h2>A pergunta certa não é essa. A pergunta certa é: o que precisa existir primeiro?</h2>
<p>Quase todo fundador chega com uma lista de funcionalidades. Cadastro, perfil, feed, chat, notificações, avaliações, painel. A lista parece razoável porque, depois de meses imaginando o produto completo, cada item parece essencial. Existe um motivo psicológico para isso: a gente atribui valor extra ao que já considera nosso, e essas funcionalidades já existem na sua cabeça há muito tempo. Cortar dói como perda, não como decisão.</p>
<p>Só que o usuário não vê o que você não construiu. Ele decide nos primeiros minutos se o produto resolve o problema dele. Um produto com uma funcionalidade que funciona muito bem ganha de um produto com oito funcionalidades medianas, sempre.</p>
<p>Seu produto, nessa fase, é uma aposta: pessoas com determinado problema vão usar e pagar pela sua solução. O MVP existe para testar essa aposta gastando o mínimo possível. Toda funcionalidade que não testa a aposta é custo sem retorno de aprendizado.</p>
<h2>O MVP de uma funcionalidade</h2>
<p>O exercício que recomendo para todo fundador, antes de pedir qualquer orçamento:</p>
<ol>
<li><strong>Escreva a hipótese central em uma frase.</strong> "Pessoas do público X pagariam por Y para resolver Z." Se a frase não sai, o problema ainda não é orçamento, é clareza. Custo: R$ 0.</li>
<li><strong>Liste tudo que você imaginou para o produto.</strong> Sem filtro, tudo mesmo. Custo: R$ 0.</li>
<li><strong>Para cada item, pergunte: isso testa a hipótese central?</strong> Seja honesto. Chat interno não testa. Avaliação com estrelas não testa. Na maioria dos casos, sobram duas ou três coisas.</li>
<li><strong>Do que sobrou, monte a menor experiência completa.</strong> Completa é a palavra importante. O usuário precisa percorrer o caminho inteiro, do problema à solução, sem partes quebradas no meio. Pequeno e inteiro, não grande e pela metade.</li>
</ol>
<p>Um exemplo concreto: um marketplace de serviços não precisa nascer com chat, carteira digital, avaliações e agenda. A hipótese central é "quem precisa do serviço encontra quem oferece e fecha negócio". A primeira versão precisa de busca e contato. O resto é hipótese secundária.</p>
<h2>O que adiar sem culpa (e por quê)</h2>
<ul>
<li><strong>Painel administrativo.</strong> No começo, o admin é você. Olhe os dados direto na ferramenta, resolva casos por WhatsApp, opere na mão. Além de economizar de R$ 15 mil a R$ 30 mil, operar manualmente é pesquisa de usuário grátis: você descobre o que realmente precisa ser automatizado.</li>
<li><strong>Features de retenção.</strong> Notificações inteligentes, pontos, sequências de uso. Retenção pressupõe usuários para reter. Antes de investir para o usuário voltar, prove que ele chega e encontra valor na primeira visita.</li>
<li><strong>Login social e cadastro completo.</strong> Um único método de entrada resolve. Cada opção extra de login é custo de desenvolvimento e manutenção para um ganho que você ainda não consegue medir.</li>
<li><strong>Telas de configuração e personalização.</strong> Escolha bons padrões no lugar de oferecer opções. Usuário de primeiro produto não configura nada: ele testa e vai embora se não funcionar.</li>
<li><strong>Site institucional elaborado.</strong> Uma landing page com proposta clara e um botão converte melhor do que um site de cinco páginas contando a história de uma empresa que ainda não existe.</li>
</ul>
<p>Adiar não é abandonar. Tudo isso pode entrar no roadmap dos meses seguintes, financiado por um produto que já está no ar, aprendendo com gente de verdade.</p>
<h2>Quanto custa um MVP quando o escopo sai do controle</h2>
<p>Os erros abaixo seguem padrões que a gente vê se repetir em quase todo primeiro projeto. É provável que você se reconheça em pelo menos um.</p>
<p><strong>O painel de R$ 25 mil.</strong> Um fundador investe quase metade do orçamento em um painel administrativo completo, com gráficos e níveis de permissão, antes do primeiro usuário real. O painel administra o nada. Esse dinheiro faria muito mais diferença em ajustes no produto depois do lançamento.</p>
<p><strong>O "só mais essa".</strong> Cada adição pequena parece inofensiva. Mas uma funcionalidade nova traz telas, regras, casos de erro e testes. Três adições "pequenas" no meio do projeto costumam empurrar o lançamento em dois meses e mais de R$ 20 mil. E cada mês sem lançar é um mês sem aprender.</p>
<p><strong>A infraestrutura para 100 mil usuários.</strong> Arquitetura robusta para uma escala que ainda não existe. As ferramentas atuais aguentam com folga os primeiros milhares de usuários. Se a escala chegar, será um problema bom, com receita para financiar a solução.</p>
<p><strong>A terceira rodada de redesign.</strong> Semanas polindo telas que o público nunca viu. Seu primeiro produto não precisa ser perfeito. Precisa existir. Feio e no ar ensina mais do que bonito e no Figma.</p>
<h2>Quem constrói isso com você</h2>
<p>Em algum momento, a pergunta muda de "quanto custa" para "com quem eu faço". Nossa sugestão: procure um time que já tenha enfrentado o dilema do escopo nos próprios produtos, não só nos dos clientes.</p>
<p>Na OCA, a gente viveu isso construindo o Revo, nossa plataforma de eventos. A primeira versão fazia o essencial: a pessoa descobre um evento e compra o ingresso. Sem os recursos que o app tem hoje. Essa base enxuta virou um produto com mais de 40 mil usuários e 300 eventos por mês, e o checkout, que nasceu simples, hoje converte 90%. Tudo que existe além do núcleo foi adicionado depois, com dados de uso apontando o caminho.</p>
<p>Por isso, quando um fundador chega com uma lista de funcionalidades, nossa primeira conversa costuma ser sobre o que não construir. Se quiser ver como isso se traduz em produto, os <a href="https://oca.dev.br/projetos">projetos que saíram do papel desse jeito estão no nosso portfólio</a>.</p>
<p><a href="https://wa.me/5511949629527?text=Ol%C3%A1%20Lucas%2C%20li%20um%20artigo%20no%20blog%20da%20OCA%20e%20quero%20conversar%20sobre%20tirar%20meu%20MVP%20do%20papel." class="blog-cta-link">Tire seu MVP do papel com a OCA</a></p>
<p>E uma ação gratuita para essa semana: escreva a hipótese central do seu produto em uma frase e apresente para cinco pessoas do seu público. Pergunte quanto pagariam. Custa zero e já resolve metade das dúvidas sobre o que colocar no escopo.</p>$post$,
  id,
  array[$post$mvp$post$, $post$quanto custa um mvp$post$, $post$validação de ideia$post$, $post$startup$post$, $post$escopo de produto$post$]::text[],
  $post$https://images.unsplash.com/photo-1664575602276-acd073f104c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODMyNjN8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZm91bmRlciUyMGJ1ZGdldCUyMHBsYW5uaW5nfGVufDB8MHx8fDE3ODUzNDkwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080$post$,
  $post$a person sitting at a table with a laptop$post$,
  $post$Gabriela Dionelli$post$,
  $post$Quanto custa um MVP em 2026: preços reais e o que cortar do escopo$post$,
  $post$Veja quanto custa um MVP em 2026, com faixas em reais e prazos em semanas. Aprenda a cortar escopo sem matar o produto e valide sua ideia gastando menos.$post$,
  'published',
  false,
  $post$2026-07-29T18:17:22.291+00:00$post$::timestamptz,
  $post$2026-07-29T18:17:22.93077+00:00$post$::timestamptz,
  $post$2026-07-29T18:17:22.93077+00:00$post$::timestamptz
from blog_categories where slug = $post$mvp-e-startups$post$;
