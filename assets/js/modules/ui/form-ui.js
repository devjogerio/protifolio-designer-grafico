/**
 * Módulo de Interface do Usuário (Form UI)
 * Gerencia feedback visual, estados de carregamento e estilos de validação.
 */

/**
 * Exibe mensagens de feedback (Sucesso ou Erro) na interface.
 * Cria dinamicamente os elementos se não existirem.
 */
export function showFeedback(type, message) {
    const form = document.getElementById('contact-form');
    let feedbackContainer = document.getElementById('form-feedback');

    // Se o container não existir, cria e insere no formulário
    if (!feedbackContainer) {
        feedbackContainer = document.createElement('div');
        feedbackContainer.id = 'form-feedback';
        feedbackContainer.className = 'mt-4 text-center p-4 rounded-lg hidden transition-all duration-300';
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

/**
 * Alterna o estado de carregamento do botão de envio.
 */
export function setLoadingState(btn, isLoading, originalText = '') {
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
 * Aplica estilos visuais de erro em um campo.
 */
export function markFieldAsInvalid(input) {
    input.classList.add('border-red-500', 'focus:border-red-500');
    input.classList.remove('border-border', 'focus:border-primary', 'border-green-500', 'focus:border-green-500');
}

/**
 * Aplica estilos visuais de sucesso/validação em um campo.
 */
export function markFieldAsValid(input) {
    input.classList.remove('border-red-500', 'focus:border-red-500', 'border-border', 'focus:border-primary');
    input.classList.add('border-green-500', 'focus:border-green-500');
}

/**
 * Remove estilos de validação de todos os campos (usado após reset).
 */
export function resetFieldStyles(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.remove('border-red-500', 'focus:border-red-500', 'border-green-500', 'focus:border-green-500');
        input.classList.add('border-border', 'focus:border-primary');
    });
}
