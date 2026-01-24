/**
 * Configuração do EmailJS (emailjs-config.js)
 * -------------------------------------------
 * Este arquivo centraliza as configurações e a inicialização da biblioteca EmailJS.
 * Utiliza variáveis de ambiente (Vite) para manter as credenciais seguras.
 */

// Importa a biblioteca oficial do EmailJS para navegadores
import emailjs from '@emailjs/browser';

/**
 * Objeto de configuração que busca as credenciais das variáveis de ambiente.
 * No Vite, variáveis de ambiente expostas ao cliente devem começar com VITE_.
 * Adicionamos fallback para objeto vazio para evitar erros em ambientes de teste (Jest).
 */
const env = (import.meta && import.meta.env) ? import.meta.env : {};

export const emailConfig = {
    // Service ID: Identificador do serviço de email configurado no painel (ex: Gmail, Outlook)
    serviceId: env.VITE_EMAILJS_SERVICE_ID,

    // Template ID: Identificador do modelo de email criado no painel do EmailJS
    templateId: env.VITE_EMAILJS_TEMPLATE_ID,

    // Public Key: Chave pública da API (antigo User ID) necessária para autenticação
    publicKey: env.VITE_EMAILJS_PUBLIC_KEY,
};

/**
 * Inicializa a biblioteca EmailJS com a chave pública.
 * Deve ser chamada uma única vez, preferencialmente no carregamento da aplicação.
 */
export function initEmailJS() {
    // Verifica se a chave pública está definida antes de tentar inicializar
    if (emailConfig.publicKey) {
        // Verifica se é um placeholder
        if (emailConfig.publicKey.includes('xxxxxx')) {
            console.warn('⚠️ AVISO: A chave pública do EmailJS parece ser um placeholder. Verifique o arquivo .env.');
        }

        // Inicializa o EmailJS globalmente
        emailjs.init(emailConfig.publicKey);
        console.log('✅ EmailJS inicializado com sucesso.');
    } else {
        // Loga um erro se a configuração estiver faltando (ajuda no debug)
        console.error('❌ Erro: VITE_EMAILJS_PUBLIC_KEY não encontrada no arquivo .env');
    }
}
