
import { jest } from '@jest/globals';

// Mock do nodemailer
const mockSendMail = jest.fn();
const mockCreateTransport = jest.fn(() => ({
    sendMail: mockSendMail
}));

jest.unstable_mockModule('nodemailer', () => ({
    default: {
        createTransport: mockCreateTransport
    }
}));

// Importa o handler (usando import dinâmico após o mock)
const { default: handler } = await import('../api/send-email.js');

describe('API Serverless /api/send-email', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            method: 'POST',
            body: {
                name: 'Teste',
                email: 'teste@exemplo.com',
                message: 'Mensagem de teste'
            }
        };
        res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        process.env.EMAIL_USER = 'test@outlook.com';
        process.env.EMAIL_PASS = 'password';
    });

    test('Deve retornar 405 se método não for POST', async () => {
        req.method = 'GET';
        await handler(req, res);
        expect(res.status).toHaveBeenCalledWith(405);
    });

    test('Deve retornar 400 se campos obrigatórios faltarem', async () => {
        req.body.name = '';
        await handler(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('Deve detectar Honeypot e não enviar email', async () => {
        req.body._honey = 'spam';
        await handler(req, res);
        expect(mockSendMail).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200); // Finge sucesso
    });

    test('Deve enviar email com sucesso (200)', async () => {
        mockSendMail.mockResolvedValue({ messageId: '123' });
        await handler(req, res);
        expect(mockCreateTransport).toHaveBeenCalled();
        expect(mockSendMail).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('Deve tratar erro do Nodemailer (500)', async () => {
        mockSendMail.mockRejectedValue(new Error('Erro SMTP'));
        await handler(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Falha ao enviar email.' }));
    });
});
