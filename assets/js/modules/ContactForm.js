/**
 * Módulo de Formulário de Contato (ContactForm.js)
 * -----------------------------------------------
 * Este módulo gerencia toda a lógica do formulário de contato, incluindo:
 * 1. Validação dos campos em tempo real e no envio.
 * 2. Máscara de formatação para o campo de WhatsApp.
 * 3. Envio assíncrono (AJAX) dos dados para o serviço FormSubmit.co.
 * 4. Feedback visual para o usuário (sucesso, erro, carregando).
 */

import { initEmailJS } from './email/emailjs-config.js';
import { sendEmail } from './email/email-service.js';

/**
 * Inicializa o formulário de contato.
 * Deve ser chamado quando o DOM estiver pronto.
 */
export function initContactForm() {
    // Inicializa o serviço de email (EmailJS)
    initEmailJS();

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
        // 3. Envio Assíncrono via EmailJS
        // -------------------------------
        // A função sendEmail já trata a comunicação com a API e retorna um objeto padronizado
        const result = await sendEmail(data);

        if (result.success) {
            // Sucesso
            showFeedback('success', result.message);
            form.reset(); // Limpa os campos

            // Remove validações visuais (bordas verdes/vermelhas)
            resetFieldStyles(form);
        } else {
            // Erro tratado no serviço (ex: validação ou erro de API)
            throw new Error(result.message);
        }

    } catch (error) {
        console.error('Erro no fluxo de envio:', error);
        showFeedback('error', error.message || 'Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
        // 4. Restaura estado do botão
        setLoadingState(submitBtn, false, originalBtnText);
    }
}

/**
 * Valida os campos do formulário antes do envio.
 * @param {HTMLFormElement} form 
 * @returns {boolean} True se válido, False se inválido.
 */
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
        // Remove espaços em branco extras
        const value = input.value.trim();

        // Verifica se está vazio
        if (!value) {
            markFieldAsInvalid(input);
            isValid = false;
        } else {
            markFieldAsValid(input);
        }

        // Validação específica de Email
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                markFieldAsInvalid(input);
                isValid = false;
            }
        }
    });

    if (!isValid) {
        showFeedback('error', 'Por favor, preencha todos os campos corretamente.');
    }

    return isValid;
}

/**
 * Aplica estilos visuais de erro em um campo.
 */
function markFieldAsInvalid(input) {
    input.classList.add('border-red-500', 'focus:border-red-500');
    input.classList.remove('border-border', 'focus:border-primary', 'border-green-500', 'focus:border-green-500');
}

/**
 * Aplica estilos visuais de sucesso/validação em um campo.
 */
function markFieldAsValid(input) {
    input.classList.remove('border-red-500', 'focus:border-red-500', 'border-border', 'focus:border-primary');
    input.classList.add('border-green-500', 'focus:border-green-500');
}

/**
 * Remove estilos de validação de todos os campos (usado após reset).
 */
function resetFieldStyles(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.remove('border-red-500', 'focus:border-red-500', 'border-green-500', 'focus:border-green-500');
        input.classList.add('border-border', 'focus:border-primary');
    });
}

/**
 * Alterna o estado de carregamento do botão de envio.
 */
function setLoadingState(btn, isLoading, originalText = '') {
    if (isLoading) {
        btn.disabled = true;
        btn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
        `;
        btn.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
        btn.disabled = false;
        btn.textContent = originalText;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
}

/**
 * Exibe mensagens de feedback (Sucesso ou Erro) na interface.
 * Cria dinamicamente os elementos se não existirem.
 */
function showFeedback(type, message) {
    const form = document.getElementById('contact-form');
    let feedbackContainer = document.getElementById('form-feedback');

    // Se o container não existir, cria e insere antes do botão de submit
    if (!feedbackContainer) {
        feedbackContainer = document.createElement('div');
        feedbackContainer.id = 'form-feedback';
        feedbackContainer.className = 'mt-4 text-center p-4 rounded-lg hidden transition-all duration-300';

        // Insere antes do botão de submit (último filho do form)
        // form.appendChild(feedbackContainer) colocaria no final, que é o desejado (abaixo do botão)
        // Mas o design atual tem o botão dentro do form. Vamos colocar DEPOIS do botão.
        // Na verdade, o botão é o último elemento. Vamos dar appendChild no form.
        form.appendChild(feedbackContainer);
    }

    // Configura estilos baseados no tipo
    if (type === 'success') {
        feedbackContainer.className = 'mt-6 text-center p-4 rounded-lg bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800 animate-fade-in';
        feedbackContainer.innerHTML = `
            <div class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span>${message}</span>
            </div>
        `;
    } else {
        feedbackContainer.className = 'mt-6 text-center p-4 rounded-lg bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800 animate-fade-in';
        feedbackContainer.innerHTML = `
            <div class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>${message}</span>
            </div>
        `;
    }

    // Remove classe 'hidden' caso tenha sido resetado
    feedbackContainer.classList.remove('hidden');

    // Auto-esconder após 8 segundos (apenas para sucesso)
    if (type === 'success') {
        setTimeout(() => {
            feedbackContainer.classList.add('hidden');
        }, 8000);
    }
}
