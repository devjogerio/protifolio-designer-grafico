# Portfólio Profissional - Designer Gráfico

![Badge Status](https://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=GREEN&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 1. Visão Geral do Projeto

Este projeto é um portfólio profissional moderno e responsivo, desenvolvido para designers gráficos exibirem seus trabalhos de branding, design editorial e mídia digital. A aplicação foi totalmente refatorada para utilizar **Tailwind CSS v4**, garantindo um código limpo, manutenção facilitada e uma interface visualmente consistente com suporte nativo a **Dark Mode** e acessibilidade (WCAG AA).

A arquitetura é baseada em componentes modulares e renderização dinâmica de conteúdo via JavaScript, permitindo fácil atualização dos projetos exibidos sem necessidade de alterar o HTML.

## 2. Índice de Conteúdos

- [1. Visão Geral do Projeto](#1-visão-geral-do-projeto)
- [2. Índice de Conteúdos](#2-índice-de-conteúdos)
- [3. Funcionalidades Implementadas](#3-funcionalidades-implementadas)
- [4. Configuração e Instalação](#4-configuração-e-instalação)
- [5. Uso e Exemplos](#5-uso-e-exemplos)
- [6. Deploy na Vercel](#6-deploy-na-vercel)
- [7. Estrutura do Projeto](#7-estrutura-do-projeto)
- [8. Tecnologias e Dependências](#8-tecnologias-e-dependências)
- [9. Contribuição](#9-contribuição)
- [10. Licença](#10-licença)

## 3. Funcionalidades Implementadas

### Interface e UX

- **Refatoração Completa com Tailwind CSS**: Migração de todo o CSS customizado para classes utilitárias do Tailwind v4.
- **Design Responsivo**: Layout fluido que se adapta perfeitamente a Mobile, Tablet e Desktop.
- **Dark Mode / Light Mode**:
  - Detecção automática da preferência do sistema.
  - Botão de alternância manual com persistência local (`localStorage`).
  - Cores semânticas (`bg-surface`, `text-text`, `border-border`) configuradas via variáveis CSS para consistência total.
  - Conformidade com **WCAG AA** para contraste de texto em ambos os temas.
- **Animações e Transições**: Feedback visual em hover, focus e transições suaves de tema.

### Funcionalidades Core

- **Galeria de Projetos Dinâmica**: Cards de projetos gerados via JavaScript a partir de um arquivo de dados (`data.js`), facilitando a adição de novos trabalhos.
- **Página de Detalhes do Projeto**:
  - Navegação via parâmetros de URL (`project.html?id=X`).
  - Injeção dinâmica de conteúdo (título, descrição, desafios, solução, resultados).
  - Tratamento de erro 404 para IDs inválidos.
- **Filtragem de Projetos**: Sistema de filtros por categoria (Branding, Editorial, UX/UI, Social Media).
- **Formulário de Contato (Backend Serverless)**:
  - **Envio Real via Outlook**: Backend personalizado em Node.js (`api/send-email.js`) utilizando `Nodemailer`.
  - **Proteção Anti-Spam**: Implementação de campo "Honeypot" para filtrar bots.
  - **Segurança**: Variáveis de ambiente (`.env`) para credenciais, evitando exposição no frontend.
  - **Máscara de WhatsApp**: Formatação automática (XX) XXXXX-XXXX.
  - **Feedback Visual**: Animações de sucesso/erro e validação em tempo real.

### Melhorias Recentes

- **Duplicação de Cards**: Funcionalidade implementada para duplicar cards de projetos mantendo integridade visual e funcional.
- **Refatoração Semântica**: Uso de tags HTML5 semânticas (`article`, `section`, `header`, `footer`) combinadas com classes descritivas do Tailwind.

## 4. Configuração e Instalação

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- Gerenciador de pacotes `npm` (incluso no Node.js)
- Conta no [Vercel](https://vercel.com/) (para deploy do backend) ou ambiente que suporte Serverless Functions.

### Configuração do Backend de Email (Obrigatório para o Formulário)

O formulário de contato utiliza uma função serverless (`api/send-email.js`) que requer variáveis de ambiente configuradas.

1.  Renomeie o arquivo `.env.example` para `.env` na raiz do projeto:
    ```bash
    cp .env.example .env
    ```
2.  Edite o arquivo `.env` e adicione suas credenciais do Outlook:
    ```ini
    EMAIL_USER=seu-email@outlook.com.br
    EMAIL_PASS=sua-senha-de-app # Use Senha de Aplicativo se tiver 2FA ativado
    ```
    _Nota: Nunca comite o arquivo `.env` no Git!_

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/devjogerio/portifolio-designer-grafico.git
    cd portifolio-designer-grafico
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Gere o CSS do Tailwind (Build Inicial):**

    ```bash
    npx @tailwindcss/cli -i assets/css/input.css -o assets/css/style.css
    ```

    _Nota: Este passo é necessário para garantir que o arquivo `style.css` final exista antes de rodar o servidor._

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O projeto estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## 5. Uso e Exemplos

### Adicionar um Novo Projeto

Para adicionar um novo projeto ao portfólio, edite o arquivo `assets/js/data.js`:

```javascript
// assets/js/data.js
export const projectsData = [
  // ... projetos existentes
  {
    id: 6, // Novo ID único
    title: 'Nome do Novo Projeto',
    category: 'branding', // branding, editorial, ux-ui, social-media
    shortDescription: 'Descrição curta para o card na home.',
    thumbnail: 'assets/img/novo-projeto.jpg',
    details: {
      briefing: 'O desafio do projeto...',
      solution: 'A solução encontrada...',
      result: 'Os resultados obtidos...',
      images: ['assets/img/detalhe-1.jpg', 'assets/img/detalhe-2.jpg'],
    },
  },
];
```

O sistema renderizará automaticamente o card na Home e criará a página de detalhes.

### Personalizar Cores (Tailwind)

As cores do tema são definidas em `assets/css/input.css` utilizando variáveis CSS e a diretiva `@theme`:

```css
/* assets/css/input.css */
@layer base {
  :root {
    --color-primary: #2563eb; /* Azul padrão */
    /* ... */
  }
  :root.dark {
    --color-primary: #3b82f6; /* Azul mais claro para dark mode */
    /* ... */
  }
}
```

## 6. Deploy na Vercel

O projeto está pronto para ser hospedado na Vercel, que oferece suporte nativo para as funcionalidades Serverless utilizadas no formulário de contato.

### Deploy Automático (Recomendado)

1.  Faça o push do seu código para o GitHub.
2.  Acesse [vercel.com](https://vercel.com) e faça login.
3.  Clique em **"Add New..."** > **"Project"**.
4.  Importe o repositório `portifolio-designer-grafico`.
5.  A Vercel detectará automaticamente que é um projeto Vite. As configurações de Build devem ser:
    - **Framework Preset:** Vite
    - **Root Directory:** `./`
6.  **Importante:** Na seção **Environment Variables**, adicione as variáveis do seu `.env`:
    - `EMAIL_USER`: Seu email do Outlook.
    - `EMAIL_PASS`: Sua senha de aplicativo.
7.  Clique em **Deploy**.

### Deploy via CLI

Se preferir usar a linha de comando:

```bash
npm i -g vercel
vercel login
vercel link
vercel env add EMAIL_USER production
vercel env add EMAIL_PASS production
vercel deploy --prod
```

## 7. Estrutura do Projeto

A organização de pastas segue uma arquitetura modular:

```
/
├── assets/
│   ├── css/
│   │   ├── input.css        # Entrada do Tailwind (Variáveis e Configurações)
│   │   └── style.css        # Saída compilada (NÃO EDITAR MANUALMENTE)
│   ├── img/                 # Imagens do projeto
│   └── js/
│       ├── modules/         # Módulos ES6 (ThemeManager, StorageAdapter)
│       ├── common.js        # Scripts compartilhados (Menu, Tema)
│       ├── data.js          # Base de dados JSON dos projetos
│       ├── main.js          # Lógica da Página Inicial
│       └── project.js       # Lógica da Página de Detalhes
├── index.html               # Página Principal
├── project.html             # Página de Detalhes
├── package.json             # Dependências e Scripts
└── README.md                # Documentação
```

## 8. Tecnologias e Dependências

### Core

- **HTML5**: Estrutura semântica.
- **JavaScript (ES Modules)**: Lógica da aplicação.
- **Tailwind CSS v4**: Framework de estilização utility-first.

### Ferramentas de Desenvolvimento

- **Vite**: Bundler e servidor de desenvolvimento (`^7.3.1`).
- **@tailwindcss/cli**: Compilador do Tailwind (`^4.1.18`).
- **Jest**: Testes unitários (`^29.7.0`).
- **PostCSS / Autoprefixer**: Processamento de CSS.

## 9. Contribuição

Contribuições são bem-vindas! Se você deseja melhorar este projeto:

1.  Faça um **Fork** do projeto.
2.  Crie uma **Branch** para sua feature (`git checkout -b feature/MinhaFeature`).
3.  Faça o **Commit** das suas mudanças (`git commit -m 'Adiciona: MinhaFeature'`).
4.  Faça o **Push** para a branch (`git push origin feature/MinhaFeature`).
5.  Abra um **Pull Request**.

## 10. Licença

Este projeto está licenciado sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido por **Roger Designer** - 2026.
