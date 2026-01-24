/**
 * Utilitários de Email (email-utils.js)
 * -------------------------------------
 * Funções auxiliares para validação, formatação e tratamento de dados
 * relacionados ao envio de emails.
 */

/**
 * Valida se o formato do email é válido utilizando uma expressão regular (Regex).
 * @param {string} email - O endereço de email a ser validado.
 * @returns {boolean} - Retorna true se válido, false caso contrário.
 */
export function isValidEmail(email) {
    // Regex padrão para validação de emails (cobre a maioria dos casos comuns)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida se o formulário contém todos os campos obrigatórios preenchidos.
 * @param {Object} data - Objeto contendo os dados do formulário.
 * @param {Array<string>} requiredFields - Lista de chaves que são obrigatórias.
 * @returns {Object} - Objeto { valid: boolean, missing: Array<string> }.
 */
export function validateRequiredFields(data, requiredFields) {
    // Filtra os campos que não estão presentes ou estão vazios no objeto de dados
    const missing = requiredFields.filter(field => !data[field] || !data[field].toString().trim());
    
    return {
        valid: missing.length === 0, // Válido apenas se não houver campos faltando
        missing: missing // Retorna a lista de campos faltantes para feedback
    };
}

/**
 * Formata o número de telefone/WhatsApp para um padrão legível no email.
 * Remove caracteres não numéricos e aplica máscara se possível.
 * @param {string} phone - O número de telefone bruto.
 * @returns {string} - O número formatado.
 */
export function formatPhoneForEmail(phone) {
    if (!phone) return 'Não informado';
    // Remove caracteres não numéricos, mantendo apenas dígitos
    return phone.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

/**
 * Sanitiza o input para evitar injeção de scripts básicos (XSS simples).
 * Útil antes de enviar dados para templates, embora o EmailJS já faça escape.
 * @param {string} text - O texto a ser sanitizado.
 * @returns {string} - O texto sanitizado.
 */
export function sanitizeInput(text) {
    if (typeof text !== 'string') return text;
    // Substitui caracteres especiais por entidades HTML
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
