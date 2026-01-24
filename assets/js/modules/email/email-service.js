/**
 * Serviço de Email (email-service.js)
 * -----------------------------------
 * Módulo principal responsável pela lógica de envio de emails.
 * Orquestra a validação, preparação dos dados e comunicação com a API do EmailJS.
 */

import emailjs from '@emailjs/browser';
import { emailConfig } from './emailjs-config.js';
import { createContactTemplateParams } from './email-templates.js';
import { validateRequiredFields, isValidEmail } from './email-utils.js';

/**
 * Envia um email de contato utilizando o EmailJS.
 * 
 * @param {HTMLFormElement} formElement - O elemento HTML do formulário (opcional, para uso com sendForm).
 * @param {Object} formDataObject - Objeto com os dados do formulário (para uso com send).
 * @returns {Promise<{success: boolean, message: string}>} - Promessa com o resultado da operação.
 */
export async function sendEmail(formDataObject) {
    try {
        // 1. Validação dos Dados de Entrada
        // ---------------------------------
        
        // Verifica campos obrigatórios
        const required = ['name', 'email', 'message'];
        const validation = validateRequiredFields(formDataObject, required);
        
        if (!validation.valid) {
            throw new Error(`Campos obrigatórios faltando: ${validation.missing.join(', ')}`);
        }

        // Verifica formato do email
        if (!isValidEmail(formDataObject.email)) {
            throw new Error('O endereço de email fornecido é inválido.');
        }

        // 2. Preparação dos Dados (Template)
        // ----------------------------------
        // Converte os dados do formulário para o formato esperado pelo template do EmailJS
        const templateParams = createContactTemplateParams(formDataObject);

        console.log('📤 Iniciando envio de email...', templateParams);

        // 3. Envio via EmailJS
        // -------------------
        // Utiliza o método .send() que aceita um objeto de parâmetros (não precisa do elemento HTML form)
        const response = await emailjs.send(
            emailConfig.serviceId,  // ID do Serviço (ex: Gmail, Outlook)
            emailConfig.templateId, // ID do Template
            templateParams,         // Variáveis do Template
            emailConfig.publicKey   // Chave Pública
        );

        // 4. Tratamento do Sucesso
        // ------------------------
        if (response.status === 200) {
            console.log('✅ Email enviado com sucesso!', response);
            return { 
                success: true, 
                message: 'Mensagem enviada com sucesso! Em breve entrarei em contato.' 
            };
        } else {
            // Caso raro onde não lança erro mas o status não é 200
            throw new Error(`Falha no envio. Status: ${response.status}`);
        }

    } catch (error) {
        // 5. Tratamento de Erros
        // ----------------------
        console.error('❌ Erro ao enviar email:', error);

        // Mensagem amigável para o usuário final
        let userMessage = 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.';
        
        // Se for um erro de validação que nós criamos, usa a mensagem específica
        if (error.message.includes('Campos obrigatórios') || error.message.includes('email fornecido é inválido')) {
            userMessage = error.message;
        }

        return { 
            success: false, 
            message: userMessage,
            originalError: error 
        };
    }
}
