
import nodemailer from 'nodemailer';

/**
 * Handler para função Serverless (Vercel) ou Servidor Local (Express).
 * Recebe requisição POST com dados do formulário e envia email via Nodemailer.
 */
export default async function handler(req, res) {
    // Adiciona headers CORS para permitir requisições de qualquer origem (necessário para APIs públicas)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Trata requisições OPTIONS (Preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Aceita apenas método POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, whatsapp, message, _honey } = req.body;

    // 1. Proteção Honeypot (Anti-Spam simples)
    if (_honey) {
        console.warn('🍯 Spam detectado via honeypot.');
        return res.status(200).json({ success: true, message: 'Enviado com sucesso.' });
    }

    // 2. Validação Básica
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }

    try {
        // 3. Configuração do Transporter (Outlook/SMTP)
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false, // true para 465, false para outras portas
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            authMethod: 'LOGIN',
            tls: {
                minVersion: 'TLSv1.2'
            }
        });

        // 4. Montagem do Email
        const mailOptions = {
            from: process.env.EMAIL_USER, // O remetente DEVE ser o email autenticado
            to: process.env.EMAIL_USER,   // Envia para si mesmo (admin)
            replyTo: email,               // Responder para o email do usuário
            subject: `Novo contato de: ${name}`,
            text: `
                Nome: ${name}
                Email: ${email}
                WhatsApp: ${whatsapp || 'Não informado'}
                
                Mensagem:
                ${message}
            `,
            html: `
                <h3>Novo Contato do Portfólio</h3>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>WhatsApp:</strong> ${whatsapp || 'Não informado'}</p>
                <br>
                <p><strong>Mensagem:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        // 5. Envio
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email enviado:', info.messageId);

        return res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });

    } catch (error) {
        console.error('❌ Erro no envio:', error);
        return res.status(500).json({ error: 'Falha ao enviar email.', details: error.message });
    }
}
