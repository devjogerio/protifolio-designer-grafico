import { markFieldAsInvalid, markFieldAsValid, showFeedback } from '../ui/form-ui.js';

/**
 * Valida os campos do formulário antes do envio.
 * @param {HTMLFormElement} form 
 * @returns {boolean} True se válido, False se inválido.
 */
export function validateForm(form) {
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
