# Documentação Técnica: Sistema de Temas (Dark Mode)

## 1. Visão Geral

Esta funcionalidade implementa um sistema de alternância de temas (Claro/Escuro) robusto, persistente e acessível. Foi desenvolvida seguindo princípios de Clean Architecture, separando a lógica de negócios da manipulação do DOM e da persistência de dados.

## 2. Arquitetura

A implementação foi dividida em três camadas principais:

### 2.1 StorageAdapter (`assets/js/modules/StorageAdapter.js`)
- **Responsabilidade:** Abstrair o acesso ao `localStorage` (ou `sessionStorage`).
- **Características:**
  - Tratamento de erros robusto (try/catch) para falhas de cota ou segurança.
  - Interface unificada `setItem`, `getItem`, `removeItem`.
  - Método `isAvailable()` para verificação de ambiente.

### 2.2 ThemeManager (`assets/js/modules/ThemeManager.js`)
- **Responsabilidade:** Gerenciar a lógica de decisão do tema.
- **Fluxo de Decisão:**
  1. Verifica se há preferência salva no Storage.
  2. Se não, verifica preferência do sistema operacional (`prefers-color-scheme`).
  3. Fallback para tema Claro (`light`).
- **Funcionalidades:**
  - `toggleTheme()`: Alterna e salva a nova preferência.
  - `applyTheme()`: Manipula o DOM (adiciona classe CSS).

### 2.3 Camada de Apresentação (`assets/css/variables.css` e `index.html`)
- **CSS:** Uso de Variáveis CSS (`--bg-color`, `--text-color`) que são redefinidas quando o seletor `html.dark` está ativo.
- **HTML:** Botão de toggle acessível com `aria-label`.

## 3. Testes e Qualidade

O projeto utiliza **Jest** para testes unitários.

### Cobertura de Código
- **Global:** > 96%
- **Branches:** > 80% (limitações de ambiente universal UMD/CommonJS)
- **Funções:** 100%

### Como Rodar os Testes
```bash
npm test
```

## 4. Integração Contínua (CI)

Um workflow do GitHub Actions (`.github/workflows/ci.yml`) foi configurado para:
1. Instalar dependências.
2. Rodar a suíte de testes.
3. Verificar se a cobertura mínima é atingida.

## 5. Guia de Implementação

Para adicionar novos temas ou variáveis:

1. Edite `assets/css/variables.css`.
2. Adicione as novas cores dentro de `html.dark { ... }`.
3. Para componentes complexos, use a classe `.dark .seu-componente` para overrides específicos.

## 6. Métricas de Qualidade

- **Manutenibilidade:** Alta (Módulos desacoplados).
- **Performance:** Uso de CSS nativo para trocas de cor (sem repaint custoso via JS).
- **Compatibilidade:** Funciona em todos os navegadores modernos (Edge, Chrome, Firefox, Safari).
