
import express from 'express';
import dotenv from 'dotenv';
import sendEmailHandler from './api/send-email.js';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = 3005;

// Middleware para JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor Backend Local Rodando!');
});

// Endpoint de API que simula a função Serverless da Vercel
app.post('/api/send-email', async (req, res) => {
    console.log('📨 Recebida requisição POST em /api/send-email');
    console.log('Dados recebidos:', req.body);
    
    // Chama o handler original (adaptando req/res se necessário, mas o Express é compatível)
    try {
        await sendEmailHandler(req, res);
    } catch (error) {
        console.error('❌ Erro no handler:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erro interno no servidor local.' });
        }
    }
});

// Inicia servidor
app.listen(PORT, () => {
    console.log(`🚀 Backend local rodando em http://localhost:${PORT}`);
    console.log(`📡 Endpoint de email: http://localhost:${PORT}/api/send-email`);
});
