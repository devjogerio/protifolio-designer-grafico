/**
 * Testes para o módulo ContactForm.js
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';

// Mocks para módulos ESM devem usar unstable_mockModule e ser definidos antes dos imports
jest.unstable_mockModule('../assets/js/modules/email/email-service.js', () => ({
    sendEmail: jest.fn()
}));

jest.unstable_mockModule('../assets/js/modules/email/emailjs-config.js', () => ({
    initEmailJS: jest.fn(),
    emailConfig: {}
}));

// Importações dinâmicas após a definição dos mocks
const { initContactForm } = await import('../assets/js/modules/ContactForm.js');
const emailService = await import('../assets/js/modules/email/email-service.js');
const emailConfig = await import('../assets/js/modules/email/emailjs-config.js');

describe('ContactForm Module', () => {
    let form;
    let submitBtn;
    let whatsappInput;

    beforeEach(() => {
        // Limpa o DOM
        document.body.innerHTML = '';

        // Cria estrutura do formulário
        document.body.innerHTML = `
            <form id="contact-form">
                <input type="text" name="name" required>
                <input type="email" name="email" required>
                <input type="tel" id="whatsapp" name="whatsapp">
                <textarea name="message" required></textarea>
                <button type="submit">Enviar</button>
            </form>
        `;

        form = document.getElementById('contact-form');
        submitBtn = form.querySelector('button');
        whatsappInput = document.getElementById('whatsapp');

        // Limpa mocks
        jest.clearAllMocks();
    });

    test('initContactForm deve inicializar o EmailJS e adicionar listener de submit', () => {
        initContactForm();

        expect(emailConfig.initEmailJS).toHaveBeenCalledTimes(1);
    });

    test('Deve formatar máscara de WhatsApp corretamente', () => {
        initContactForm();

        // Simula digitação
        whatsappInput.value = '11999998888';
        whatsappInput.dispatchEvent(new Event('input'));

        expect(whatsappInput.value).toBe('(11) 99999-8888');
    });

    test('Deve chamar sendEmail ao submeter formulário válido', async () => {
        // Mock da resposta de sucesso
        emailService.sendEmail.mockResolvedValue({ success: true, message: 'Sucesso' });

        initContactForm();

        // Preenche campos
        form.querySelector('input[name="name"]').value = 'Teste';
        form.querySelector('input[name="email"]').value = 'teste@teste.com';
        form.querySelector('textarea[name="message"]').value = 'Mensagem';

        // Submete
        form.dispatchEvent(new Event('submit'));

        // Aguarda promises
        await new Promise(process.nextTick);

        expect(emailService.sendEmail).toHaveBeenCalled();
    });
});
