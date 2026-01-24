# Módulo de Email (EmailJS)

Este diretório contém a implementação modular do serviço de envio de emails utilizando a biblioteca [EmailJS](https://www.emailjs.com/).

## Estrutura de Arquivos

*   **`emailjs-config.js`**: Centraliza a configuração e inicialização do SDK do EmailJS.
*   **`email-service.js`**: Contém a lógica principal de envio (`sendEmail`), orquestrando validação e comunicação com a API.
*   **`email-utils.js`**: Funções auxiliares puras para validação de campos e formatação de dados.
*   **`email-templates.js`**: Mapeia os dados do formulário local para as variáveis esperadas pelo template do EmailJS.

## Configuração

Para que o envio funcione, você precisa configurar as variáveis de ambiente no arquivo `.env` na raiz do projeto.

### 1. Obter Credenciais
Crie uma conta no [EmailJS](https://www.emailjs.com/) e obtenha:
*   **Service ID**: Do serviço de email conectado (ex: Gmail, Outlook).
*   **Template ID**: Do modelo de email criado.
*   **Public Key**: Sua chave pública de API.

### 2. Variáveis de Ambiente
Adicione as seguintes chaves ao seu arquivo `.env`:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
```

> **Nota:** O prefixo `VITE_` é obrigatório para que as variáveis sejam expostas ao frontend durante o build.

## Como Usar

O uso principal é através da função `sendEmail` importada do serviço.

```javascript
import { sendEmail } from './modules/email/email-service.js';

const formData = {
    name: "João Silva",
    email: "joao@exemplo.com",
    message: "Gostaria de um orçamento."
};

sendEmail(formData).then(result => {
    if (result.success) {
        console.log("Sucesso!");
    } else {
        console.error("Erro:", result.message);
    }
});
```

## Templates

No painel do EmailJS, crie um template que espere as seguintes variáveis (definidas em `email-templates.js`):

*   `{{from_name}}`: Nome do remetente.
*   `{{reply_to}}`: Email do remetente.
*   `{{whatsapp}}`: Telefone/WhatsApp.
*   `{{project_type}}`: Tipo de projeto selecionado.
*   `{{message}}`: Conteúdo da mensagem.
