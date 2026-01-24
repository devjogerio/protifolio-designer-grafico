import nodemailer from 'nodemailer';

/**
 * Serverless Function para envio de emails via Outlook.
 * Compatível com Vercel Functions.
 * 
 * Rotas:
 * POST /api/send-email
 */
export default async function handler(req, res) {
    // 1. Configuração de CORS (Permitir acesso do frontend)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Em produção, substitua '*' pelo seu domínio
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Responde a requisições OPTIONS (Pre-flight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Validação do Método
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }

    try {
        // 3. Extração e Validação dos Dados
        const { name, email, message, whatsapp, _honey } = req.body;

        // Proteção Honeypot (Anti-spam simples)
        if (_honey) {
            console.log('Spam detectado (honeypot preenchido).');
            return res.status(200).json({ success: true, message: 'Email enviado com sucesso!' }); // Falha silenciosa
        }

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando (nome, email ou mensagem).' });
        }

        // 4. Configuração do Transporter (Outlook SMTP)
        // Requer variáveis de ambiente: EMAIL_USER e EMAIL_PASS
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false, // TLS (STARTTLS)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false // Ajuda em alguns ambientes de hospedagem
            }
        });

        // 5. Configuração do Email
        const mailOptions = {
            from: process.env.EMAIL_USER, // O remetente DEVE ser a conta autenticada
            to: process.env.EMAIL_USER,   // Envia para si mesmo (ou para outro destino configurado)
            replyTo: email,               // Permite responder diretamente ao visitante
            subject: `Novo contato do Portfólio: ${name}`,
            text: `
                Você recebeu uma nova mensagem do seu portfólio!

                Nome: ${name}
                Email: ${email}
                WhatsApp: ${whatsapp || 'Não informado'}

                Mensagem:
                ${message}
            `,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Nova Mensagem de Contato</h2>
                    <p><strong>De:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
                    <p><strong>WhatsApp:</strong> ${whatsapp || 'Não informado'}</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="white-space: pre-wrap; color: #555;">${message}</p>
                </div>
            `
        };

        // 6. Envio
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });

    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return res.status(500).json({ error: 'Erro interno ao processar o envio.', details: error.message });
    }
}
