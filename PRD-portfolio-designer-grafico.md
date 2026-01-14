# PRD – Portfólio Profissional para Designers Gráficos (GitHub Pages)

## 1. Visão Geral do Produto

- **Nome provisório do produto:** Portfólio Designer Gráfico Pro
- **Objetivo principal:** Criar um portfólio profissional, moderno e de alta performance para designers gráficos, hospedado no GitHub Pages, que facilite a apresentação de trabalhos, a comunicação com potenciais clientes e a construção de autoridade profissional.
- **Público-alvo:** Designers gráficos freelance ou em início/meio de carreira, estudantes de design, diretores de arte e studios/agências que desejam um portfólio autoral, simples de manter e com boa visibilidade online.
- **Plataforma:** Aplicação estática (HTML5, CSS3, JavaScript puro) publicada via GitHub Pages.

## 2. Pesquisa de Referência

### 2.1 Fontes de inspiração consultadas

Foram analisadas referências de artigos e coleções de portfólios que apresentam exemplos modernos e bem avaliados de sites de designers, com foco em estrutura, usabilidade e narrativa visual:

1. Best Graphic Design Portfolios in 2024 – Wedoflow [referência de boas práticas de case studies e navegação criativa].
2. Design portfolio inspiration sites – Adham Dannaway (2026) [ênfase em propósito do portfólio, "About" forte e estudos de caso detalhados].
3. 15+ Inspiring Design Portfolio Websites – Pixpa [coleção de portfólios com home em grid, galerias e páginas de projeto].
4. 23 Best Graphic Design Portfolios – HubSpot Blog [reforça a importância de seções Projetos, Sobre mim e Contato].
5. 35 Best Graphic Design Portfolio Examples – Shillington Education [foco em curadoria de poucos projetos fortes e apresentação do processo].
6. Graphic Designers' Portfolio Websites That Look Amazing – Muffin Group [ênfase em storytelling visual, contexto e mockups].
7. Coleções de portfólios em sites de inspiração (Bestfolios, Dribbble, Behance) com foco em designers gráficos e de marca.
8. Portfólios pessoais com destaque em tipografia e storytelling (ex.: Jessica Walsh via Behance, citada por HubSpot).
9. Portfólios de designers multidisciplinares com case studies extensos (ex.: exemplos de Pixpa e Shillington).
10. Portfólios de estúdios e coletivos com filtros por categoria e navegação simples (referências em Pixpa e Todaymade/Blog).

> Observação: as referências foram usadas para extrair padrões de layout, conteúdo e UX, e não para copiar identidade visual ou código.

### 2.2 Elementos-chave identificados

Com base nas referências analisadas, os seguintes elementos foram identificados como essenciais para um portfólio de designer gráfico atual:

- **Home focada em trabalhos:**
  - Destaque visual imediato dos principais projetos (hero com 1–3 trabalhos em destaque ou grid curado).
  - Visibilidade rápida de áreas de atuação (branding, editorial, digital, ilustração etc.).
- **Galeria de projetos organizada:**
  - Grid responsivo com thumbnails grandes e legíveis.
  - Filtros por categoria (branding, identidades visuais, editorial, social media, UX/UI, ilustração, etc.).
  - Página de detalhe do projeto com: contexto/briefing, papel do designer, processo (esboços, variações), resultados (mockups, aplicações reais) e créditos quando houver equipe.
- **Seção "Sobre mim":**
  - Biografia curta e objetiva, com foco em competências, estilo e diferenciais.
  - Foto ou avatar profissional.
  - Lista sintética de habilidades (softwares, tipos de projeto) e possíveis clientes/segmentos.
- **Contato e oportunidades:**
  - Página/área com formulário funcional (nome, email, mensagem, tipo de projeto).
  - Informações diretas de contato (email clicável, localização aproximada, disponibilidade).
  - Links para redes profissionais (Behance, Dribbble, LinkedIn, Instagram profissional, eventualmente GitHub se relevante).
- **Credibilidade e contexto:**
  - Possibilidade de incluir depoimentos curtos de clientes ou mentores.
  - Destaque para prêmios, exposições ou publicações, quando existirem.
- **Experiência de navegação:**
  - Navegação simples e previsível: menu fixo com âncoras ou páginas separadas.
  - Layout limpo, tipografia legível, bom contraste e foco no trabalho (backgrounds neutros ou discretos).
  - Animações sutis e não intrusivas (hover states, transições suaves de seções).

Esses elementos orientarão a arquitetura de informação e os requisitos funcionais do projeto.

## 3. Objetivos do Projeto

### 3.1 Objetivos de negócio

- Aumentar a chance de contratação de serviços de design gráfico (freelancer ou fixo) ao fornecer um portfólio claro e profissional.
- Facilitar o compartilhamento do portfólio em processos seletivos, propostas comerciais e redes sociais.
- Consolidar a identidade visual do designer e posicioná-lo como profissional confiável e atualizado.

### 3.2 Objetivos de usuário

- Permitir que recrutadores, diretores de arte e potenciais clientes avaliem rapidamente a qualidade e a diversidade dos trabalhos.
- Tornar fácil encontrar projetos por categoria/tipo de trabalho.
- Oferecer um canal de contato simples e funcional.
- Garantir boa experiência de navegação em qualquer dispositivo (mobile-first).

## 4. Escopo Funcional

### 4.1 Páginas e seções principais

1. **Página Inicial (Home)**

   - Hero com destaque dos melhores trabalhos (1–3 projetos em destaque com imagem e título).
   - Chamada principal (headline + subheadline) comunicando o tipo de trabalho do designer.
   - Seção de destaques recentes (mini-galeria ou grid com 6–8 projetos principais).
   - Link/CTA para ver todos os projetos.

2. **Seção "Sobre"**

   - Biografia profissional resumida (foco em trajetória, especialidades, abordagem de trabalho).
   - Foto ou ilustração representando o designer.
   - Lista de habilidades (softwares, tipos de projeto, setores atendidos).
   - Opcional: linha do tempo breve (anos de experiência, formação relevante).

3. **Galeria de Projetos**

   - Grid responsivo de projetos com thumbnail, título e categoria.
   - Filtros por categoria (ex.: Todos, Branding, Editorial, Digital, Social Media, Ilustração, Outros).
   - Interação: clique em um projeto abre página de detalhe ou modal detalhado.

4. **Página de Detalhe do Projeto (template)**

   - Seção de cabeçalho com título do projeto, categoria, ano e papel do designer.
   - Bloco de contexto: briefing do cliente/problema.
   - Bloco de processo: etapas principais, decisões de design, sketches, variações relevantes.
   - Bloco de resultado: mockups, imagens finais, aplicações (impresso, digital, embalagens, etc.).
   - Opcional: resultados/impacto (métricas, feedback do cliente, prêmios).

5. **Página de Contato**

   - Formulário funcional com campos obrigatórios: nome, email, tipo de projeto (select ou radio), mensagem.
   - Validação básica em front-end (campos obrigatórios e formato de email).
   - Envio via serviço externo (ex.: EmailJS ou similar) ou uso de mailto: (fallback mínimo), considerando que o site é estático.
   - Mensagem de sucesso/erro acessível (aria-live).

6. **Footer global**
   - Links para redes sociais profissionais (Behance, Dribbble, Instagram profissional, LinkedIn, GitHub opcional).
   - Email de contato.
   - Copyright com nome do designer e ano.

### 4.2 Requisitos de responsividade

- Layout **mobile-first**, escalando do viewport mínimo (~320px) até desktops grandes (≥1440px).
- Breakpoints sugeridos: 480px, 768px, 1024px, 1280px.
- Navegação:
  - Mobile: menu tipo hamburguer ou navegação em coluna com âncoras.
  - Desktop: menu horizontal fixo no topo.
- Galeria:
  - Mobile: 1 coluna.
  - Tablet: 2 colunas.
  - Desktop: 3–4 colunas, dependendo da largura útil.

### 4.3 Funcionalidades de interação

- Filtros na galeria:
  - Implementados em JavaScript puro, manipulando classes/data-attributes.
  - Estado visual do filtro selecionado.
- Estados de hover e foco:
  - Destaque em links, botões e cards de projeto.
  - Foco visível para navegação por teclado.
- Scroll suave para seções internas (âncoras) quando aplicável.

## 5. Requisitos Técnicos

### 5.1 Tecnologias

- **Frontend:**
  - HTML5 semântico (header, main, section, article, nav, footer, etc.).
  - CSS3 organizado (preferencialmente modularizado por seções/componentes em um ou mais arquivos .css).
  - JavaScript puro (ES6+), sem frameworks ou bibliotecas externas.

### 5.2 Estrutura de pastas sugerida

- `/` (raiz)
  - `index.html` (home + seções principais).
  - `projects.html` (opcional, caso galeria completa fique em página separada).
  - `contact.html` (opcional, se o formulário não estiver na single-page).
  - `assets/`
    - `css/` (arquivos CSS, ex.: `styles.css`, `home.css`, `projects.css`).
    - `js/` (arquivos JS, ex.: `main.js`, `filters.js`, `contact-form.js`).
    - `img/` (imagens otimizadas, SVGs, ícones sociais).

### 5.3 Performance e Lighthouse (meta ≥ 90)

- Otimizar peso das imagens (compressão, formatos adequados, dimensionamento correto, `srcset` e `sizes` quando pertinente).
- Evitar bloqueio de renderização:
  - Carregar scripts ao final do body ou com `defer`.
  - Minimizar arquivos CSS (combinar e minificar em ambiente de build simples, se necessário).
- Utilizar cache do navegador (configuração padrão do GitHub Pages já ajuda; opcionalmente usar nomes de arquivos versionados para assets).
- Evitar JS desnecessário e reflows custosos.
- Testar com Lighthouse em modo Mobile e Desktop e iterar até alcançar score ≥ 90 em Performance, Acessibilidade, Boas Práticas e SEO sempre que possível.

### 5.4 SEO básico

- Tags `<title>` únicas e descritivas por página.
- Meta description em todas as páginas principais.
- Uso adequado de headings (um `<h1>` por página, hierarquia clara com `<h2>`, `<h3>` etc.).
- URLs amigáveis (conforme limitações do GitHub Pages).
- **Schema Markup (JSON-LD):**
  - Implementar `Person` (designer) e/ou `CreativeWork`/`VisualArtwork` para projetos principais.
- Meta tags Open Graph e Twitter Cards para compartilhamento em redes sociais.
  - Imagem de destaque compartilhável (social preview) otimizada.

### 5.5 Acessibilidade

- Seguir diretrizes básicas da WCAG:
  - Contraste mínimo entre texto e fundo.
  - Tamanho de fonte confortável (>= 16px para texto principal).
  - Navegação completa via teclado (foco visível, ordem lógica de tabulação).
  - Textos alternativos (`alt`) em todas as imagens relevantes (especialmente thumbnails e mockups chave).
  - Uso de `aria-label`/`aria-labelledby` quando necessário (botões de filtro, ícone de menu, etc.).
  - Para mensagens dinâmicas (ex.: envio de formulário), uso de região com `aria-live="polite"`.

## 6. Hospedagem e Deploy (GitHub Pages)

### 6.1 Repositório no GitHub

- Criar repositório público com nome sugestivo, ex.: `portfolio-designer-grafico`.
- Estruturar branches:
  - `main` ou `master`: branch de produção.
  - `dev`: branch opcional para desenvolvimento.

### 6.2 Configuração do GitHub Pages

- Ativar GitHub Pages nas configurações do repositório.
- Fonte do site:
  - Branch: `main`.
  - Pasta: `/root` ou `/docs` (a definir conforme conveniência; por padrão, raiz do repositório).
- Verificar URL gerada, ex.: `https://usuario.github.io/portfolio-designer-grafico/`.

### 6.3 Domínio customizado (opcional)

- Registrar domínio próprio (ex.: `nomedodesigner.com`).
- Configurar DNS com CNAME apontando para `usuario.github.io` conforme documentação do GitHub Pages.
- Adicionar arquivo `CNAME` no repositório com o domínio customizado.

### 6.4 HTTPS e redirecionamentos

- Ativar opção "Enforce HTTPS" nas configurações do GitHub Pages.
- Garantir redirecionamento automático de HTTP para HTTPS (nativo do GitHub Pages quando HTTPS está ativo).
- Se usar domínio próprio, conferir se o certificado foi corretamente provisionado.

## 7. Requisitos de Conteúdo

### 7.1 Conteúdos obrigatórios

- Texto de apresentação na home (headline + subtítulo) deixando claro:
  - O que o designer faz (ex.: "Designer gráfico especializado em branding e design editorial").
  - Que tipo de clientes/projetos busca.
- Biografia na página/ seção "Sobre":
  - Formação principal (curso/tipo).
  - Foco de atuação (branding, editorial, digital, etc.).
  - Breve visão sobre estilo/abordagem.
- Galeria com pelo menos 6 projetos bem finalizados.
- Texto contextual mínimo para cada projeto (briefing, solução, resultado).
- Texto e mensagens do formulário de contato em português brasileiro, com tom profissional e amigável.

### 7.2 Tom de voz

- Profissional, claro e direto.
- Evitar jargão técnico excessivo; quando usar, contextualizar.
- Falar em primeira pessoa quando fizer sentido (ex.: "Trabalho com...", "Ajudo marcas a...").

## 8. Requisitos Não Funcionais

### 8.1 Usabilidade

- Tempo para entender a proposta do site (quem é o designer e o que faz) ≤ 5 segundos.
- Número de cliques para ver um projeto detalhado a partir da home: idealmente ≤ 2.
- Formulário de contato simples (poucos campos, todos justificáveis).

### 8.2 Manutenibilidade

- Estrutura de HTML, CSS e JS organizada para facilitar futuras atualizações de conteúdo (adição/remoção de projetos e categorias).
- Separar dados de conteúdo sempre que possível (ex.: lista de projetos representada em JSON inline no JS, facilitando edição).

### 8.3 Segurança

- Nenhum dado sensível no código-fonte.
- Se for usado serviço de envio de e-mail, não expor segredos diretamente no repositório público; quando houver necessidade de chave/ID, usar variáveis de ambiente/serviços que abstraiam segredos.
- Proteger o email do designer de scraping simples (ex.: formatar como link, mas evitar padrões de texto puros em demasia).

## 9. Entregáveis

1. **Código-fonte no GitHub**

   - HTML, CSS e JS organizados conforme estrutura definida.
   - Commits com mensagens claras e históricas de evolução.

2. **Documentação técnica no README.md** (arquivo separado, não tratado neste PRD)

   - Descrição do projeto.
   - Instruções de uso/clonagem.
   - Estrutura de pastas.
   - Como publicar/atualizar no GitHub Pages.

3. **Guia de estilo**

   - Paleta de cores (hex / RGB).
   - Tipografia (fontes, pesos, tamanhos, hierarquia).
   - Componentes principais (cards de projeto, botões, estados de hover/foco).
   - Regras gerais de espaçamento e grid.

4. **Versão publicada no GitHub Pages**
   - URL pública funcional.
   - Formulário testado (comportamento de sucesso/erro).
   - Teste básico em navegadores modernos (Chrome, Firefox, Edge, Safari) e em dispositivos mobile.

## 10. Cronograma Proposto

Baseado no requisito fornecido, o cronograma será o seguinte:

1. **Pesquisa e definição de requisitos – 2 dias**

   - Consolidação deste PRD.
   - Definição da arquitetura de informação e mapa de navegação.

2. **Desenvolvimento do layout – 5 dias**

   - Criação do guia de estilo (paleta, tipografia, componentes).
   - Montagem dos layouts base em HTML + CSS (sem funcionalidades avançadas).
   - Ajustes de responsividade iniciais.

3. **Implementação de funcionalidades – 3 dias**

   - Implementação dos filtros da galeria via JavaScript.
   - Implementação da navegação (scroll suave, menu responsivo).
   - Implementação do formulário de contato (validação e envio).

4. **Testes e ajustes – 2 dias**

   - Testes de responsividade (mobile, tablet, desktop).
   - Ajustes de acessibilidade básica (foco, leitores de tela, contrastes).
   - Otimização de performance (imagens, CSS/JS, Lighthouse).

5. **Deploy e documentação – 1 dia**
   - Configuração do GitHub Pages.
   - (Opcional) Configuração de domínio customizado e HTTPS.
   - Escrita/ajuste do README e confirmação da versão final publicada.

## 11. Critérios de Aceite

Para considerar o projeto concluído, todos os critérios abaixo devem ser atendidos:

- Site publicado no GitHub Pages, acessível via URL pública.
- Home com destaque para principais trabalhos, biografia acessível, galeria de projetos e acesso claro à página de contato.
- Filtros da galeria funcionando corretamente.
- Formulário de contato funcional, com feedback visual e textual de sucesso/erro.
- Layout responsivo e utilizável em mobile, tablet e desktop.
- Score mínimo de 90 em Performance e SEO no Lighthouse (modo Mobile) em página principal.
- Implementação de meta tags básicas, schema markup e Open Graph.
- Acessibilidade básica verificada (labels, foco visível, texto alternativo em imagens principais).
- Código organizado, sem dependência de frameworks, usando apenas HTML5, CSS3 e JavaScript puro.
