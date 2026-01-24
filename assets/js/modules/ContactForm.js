import { showFeedback, setLoadingState, resetFieldStyles } from './ui/form-ui.js';
import { validateForm } from './validation/form-validation.js';

/**
 * Módulo de Formulário de Contato (ContactForm.js)
 * -----------------------------------------------
 * Este módulo gerencia toda a lógica do formulário de contato, incluindo:
 * 1. Validação dos campos em tempo real e no envio.
 * 2. Máscara de formatação para o campo de WhatsApp.
 * 3. Envio assíncrono (AJAX) dos dados para o Backend (/api/send-email).
 * 4. Feedback visual para o usuário (sucesso, erro, carregando).
 */

/**
 * Inicializa o formulário de contato.
 * Deve ser chamado quando o DOM estiver pronto.
 */
export function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    // Se o formulário não existir na página (ex: página de detalhes), encerra a execução.
    if (!contactForm) return;

    // Configura a máscara do WhatsApp
    setupWhatsappMask();

    // Configura o interceptador de envio (submit)
    contactForm.addEventListener('submit', handleFormSubmit);
}

/**
 * Configura a máscara de formatação para o input de telefone/WhatsApp.
 * Formato esperado: (XX) XXXXX-XXXX
 */
function setupWhatsappMask() {
    const whatsappInput = document.getElementById('whatsapp');
    if (!whatsappInput) return;

    whatsappInput.addEventListener('input', (e) => {
        // Remove tudo que não for número
        let value = e.target.value.replace(/\D/g, '');

        // Limita a 11 dígitos (DDD + 9 números)
        if (value.length > 11) value = value.slice(0, 11);

        // Aplica a formatação progressiva
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length > 7) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`; // Ajuste para formato móvel correto
        }

        // Atualiza o valor no input
        e.target.value = value;

        // Validação visual simples (borda verde se completo)
        if (value.length >= 14) { // (XX) XXXXX-XXXX tem 15 chars, (XX) XXXX-XXXX tem 14
            whatsappInput.classList.remove('border-border', 'focus:border-primary');
            whatsappInput.classList.add('border-green-500', 'focus:border-green-500');
        } else {
            whatsappInput.classList.remove('border-green-500', 'focus:border-green-500');
            whatsappInput.classList.add('border-border', 'focus:border-primary');
        }
    });
}

/**
 * Manipula o evento de envio do formulário.
 * @param {Event} e - O evento de submit disparado.
 */
async function handleFormSubmit(e) {
    e.preventDefault(); // Impede o recarregamento da página

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // 1. Validação Básica
    if (!validateForm(form)) {
        return;
    }

    // 2. Preparação para Envio
    setLoadingState(submitBtn, true);

    // Coleta os dados do formulário e converte para Objeto JSON
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // 3. Envio Assíncrono via Fetch API (Backend Serverless)
        // -----------------------------------------------------
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Analisa a resposta JSON
        const result = await response.json();

        if (response.ok && result.success) {
            // Sucesso
            showFeedback('success', result.message || 'Mensagem enviada com sucesso!');
            form.reset(); // Limpa os campos

            // Remove validações visuais (bordas verdes/vermelhas)
            resetFieldStyles(form);
        } else {
            // Erro retornado pelo backend
            throw new Error(result.error || result.message || 'Erro desconhecido ao enviar.');
        }

    } catch (error) {
        // 4. Tratamento de Erros
        console.error('Erro no fluxo de envio:', error);
        showFeedback('error', error.message || 'Ocorreu um erro ao enviar. Tente novamente.');

    } finally {
        // 5. Finalização
        // Restaura o botão para o estado original (habilitado e com texto original)
        setLoadingState(submitBtn, false, originalBtnText);
    }
}
