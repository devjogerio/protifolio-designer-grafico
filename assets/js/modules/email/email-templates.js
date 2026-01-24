/**
 * Templates de Email (email-templates.js)
 * ---------------------------------------
 * Define a estrutura de dados esperada pelos templates configurados no painel do EmailJS.
 * Mapeia os dados do formulário local para as variáveis do template remoto.
 */

/**
 * Cria o objeto de parâmetros para o template de "Novo Contato".
 * Mapeia os campos do formulário (HTML) para as variáveis do template {{variavel}} no EmailJS.
 * 
 * @param {Object} formData - Dados brutos extraídos do formulário.
 * @returns {Object} - Objeto formatado pronto para envio.
 */
export function createContactTemplateParams(formData) {
    return {
        // Nome de quem está enviando (mapeado para {{from_name}} no template)
        from_name: formData.name,
        
        // Email de resposta (mapeado para {{reply_to}} no template)
        reply_to: formData.email,
        
        // Número de WhatsApp (mapeado para {{whatsapp}} no template)
        whatsapp: formData.whatsapp || 'Não informado',
        
        // Tipo de Projeto/Assunto (mapeado para {{project_type}} ou {{subject}})
        project_type: formData['project-type'] || 'Contato Geral',
        
        // Mensagem principal (mapeado para {{message}} no template)
        message: formData.message,
        
        // Data e hora do envio (útil para registro)
        sent_at: new Date().toLocaleString('pt-BR')
    };
}
