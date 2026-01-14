# Portfólio Profissional - Designer Gráfico

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![Deploy Status](https://github.com/devjogerio/portifolio-designer-grafico/actions/workflows/deploy.yml/badge.svg)

Este projeto é um portfólio profissional desenvolvido para designers gráficos, focado em apresentar trabalhos de branding, editorial e design digital de forma elegante e responsiva.

## 🚀 Tecnologias Utilizadas

- **HTML5 Semantic:** Estrutura acessível e otimizada para SEO.
- **CSS3 Moderno:** Uso de Flexbox, CSS Grid e Variáveis CSS (Custom Properties) para estilização modular e responsiva.
- **JavaScript (ES6+):** Lógica modularizada utilizando ES Modules.
- **Vite:** Ferramenta de build e servidor de desenvolvimento ultrarrápido.
- **Jest:** Framework de testes unitários para garantir a estabilidade do código.
- **GitHub Actions:** Automação de CI/CD para deploy contínuo.

## 📋 Funcionalidades

- **Design Responsivo:** Layout adaptável para Mobile, Tablet e Desktop.
- **Sistema de Temas:** Suporte completo a Dark Mode e Light Mode com persistência de preferência do usuário (localStorage) e detecção automática do sistema.
- **Galeria Dinâmica:** Renderização de projetos via JavaScript a partir de uma estrutura de dados JSON.
- **Página de Detalhes:** Navegação para página interna de projeto com carregamento de conteúdo via URL Parameters.
- **Formulário com Validação:** Máscara de entrada para WhatsApp e feedback visual de envio.

## 🔧 Configuração e Instalação

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    cd nome-do-repositorio
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O projeto estará acessível em `http://localhost:3000` (ou outra porta indicada).

## 📦 Build e Deploy

O projeto está configurado para deploy automático no **GitHub Pages** utilizando GitHub Actions.

### Comandos Disponíveis

- `npm run dev`: Inicia o servidor local.
- `npm run build`: Gera a versão de produção otimizada na pasta `dist/`.
- `npm run preview`: Visualiza localmente a versão de produção gerada.
- `npm test`: Executa os testes unitários.

### Processo de Deploy Automático

1.  Certifique-se de que a opção de **GitHub Pages** nas configurações do repositório esteja desativada ou apontando para a branch `gh-pages` (que será criada automaticamente).
2.  Faça o push das alterações para a branch `main`.
3.  A action **Deploy to GitHub Pages** será disparada automaticamente.
4.  Após a conclusão, seu site estará no ar em `https://seu-usuario.github.io/nome-do-repositorio/`.

## 🧪 Testes

Para executar os testes unitários dos módulos de lógica (ThemeManager, StorageAdapter):

```bash
npm test
```

## 📂 Estrutura de Pastas

```
/
├── .github/workflows/   # Configurações de CI/CD
├── assets/
│   ├── css/             # Estilos globais e variáveis
│   └── js/              # Lógica da aplicação
│       ├── modules/     # Módulos reutilizáveis (ESM)
│       ├── common.js    # Lógica comum a todas as páginas
│       ├── data.js      # Fonte de dados dos projetos
│       ├── main.js      # Entry point da Home
│       └── project.js   # Entry point da Página de Projeto
├── tests/               # Testes unitários (Jest)
├── dist/                # Arquivos de produção (gerado pelo build)
├── index.html           # Página inicial
├── project.html         # Página de detalhes
├── vite.config.js       # Configuração do bundler
└── package.json         # Dependências e scripts
```

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar.
