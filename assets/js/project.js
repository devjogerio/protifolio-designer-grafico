/**
 * Arquivo de JavaScript da Página de Detalhes (project.js)
 * --------------------------------------------------------
 * Este script é responsável pela lógica exclusiva da página 'project.html'.
 * Sua principal função é ler o ID do projeto na URL, buscar os dados correspondentes
 * e renderizar o conteúdo detalhado na tela.
 */

// Importa funções e dados compartilhados
import { initCommon } from './common.js';
import { projectsData } from './data.js';

// Aguarda o DOM estar pronto para execução segura
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. Inicialização Global
    // =========================================================================

    // Configura tema e menu mobile (mesma lógica da Home)
    initCommon();

    // =========================================================================
    // 2. Recuperação e Validação do Projeto
    // =========================================================================

    // URLSearchParams: API nativa do navegador para facilitar a leitura da Query String.
    // Exemplo: se a URL for ".../project.html?id=1", window.location.search será "?id=1"
    const urlParams = new URLSearchParams(window.location.search);

    // Obtém o valor do parâmetro 'id' e converte para número inteiro (base 10).
    // A conversão é necessária porque IDs no data.js são números, mas na URL vêm como strings.
    const projectId = parseInt(urlParams.get('id'));

    // Método .find(): Busca no array 'projectsData' o primeiro elemento onde o id seja igual ao projectId.
    const project = projectsData.find(p => p.id === projectId);

    // Seleciona o elemento container onde vamos injetar o HTML
    const container = document.getElementById('project-content');

    // Se o container não existir (erro estrutural no HTML), paramos por aqui para evitar erros de console.
    if (!container) return;

    // =========================================================================
    // 3. Tratamento de Erro (Projeto não encontrado)
    // =========================================================================

    // Se a variável 'project' for undefined (nenhum projeto encontrado com aquele ID),
    // mostramos uma mensagem amigável de erro 404.
    if (!project) {
        container.innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-3xl font-bold text-text mb-4">Projeto não encontrado</h2>
                <p class="text-text-light mb-6">O projeto que você está procurando não existe ou foi removido.</p>
                <a href="index.html" class="text-primary hover:underline font-medium">Voltar para Home</a>
            </div>
        `;
        return; // Interrompe a execução da função
    }

    // =========================================================================
    // 4. Renderização do Conteúdo
    // =========================================================================

    // Atualiza o título da aba do navegador dinamicamente para melhorar SEO e UX.
    document.title = `${project.title} | Portfólio`;

    // Gera o HTML completo da página de detalhes.
    // A estrutura é dividida em: Header, Imagem Principal, Grid de Detalhes, Galeria e Botão Voltar.
    container.innerHTML = `
        <!-- Cabeçalho do Projeto -->
        <div class="mb-12 text-center">
            <!-- Categoria em destaque -->
            <span class="text-primary uppercase font-semibold tracking-wider text-sm">
                ${project.category}
            </span>
            <!-- Título Principal -->
            <h1 class="text-4xl md:text-5xl font-heading font-bold text-text mt-2 mb-4">
                ${project.title}
            </h1>
            <!-- Descrição curta (lead) -->
            <p class="text-lg text-text-light max-w-3xl mx-auto leading-relaxed">
                ${project.shortDescription}
            </p>
        </div>

        <!-- Conteúdo Principal -->
        <div class="grid grid-cols-1 gap-12 mb-16">
            <!-- Imagem de Capa (Thumbnail) -->
            <img src="${project.thumbnail}" 
                 alt="${project.title} - Capa" 
                 class="w-full h-auto rounded-2xl shadow-lg max-h-[600px] object-cover">
            
            <!-- Grid de Informações (Desafio, Solução, Resultado) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <!-- Card: O Desafio -->
                <div class="bg-surface p-6 rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 class="text-xl font-heading font-bold text-text mb-3 flex items-center gap-2">
                        <!-- Indicador visual colorido -->
                        <span class="w-2 h-8 bg-primary rounded-full"></span>
                        O Desafio
                    </h3>
                    <p class="text-text-light leading-relaxed">
                        ${project.details.briefing}
                    </p>
                </div>

                <!-- Card: A Solução -->
                <div class="bg-surface p-6 rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 class="text-xl font-heading font-bold text-text mb-3 flex items-center gap-2">
                        <span class="w-2 h-8 bg-secondary rounded-full"></span>
                        A Solução
                    </h3>
                    <p class="text-text-light leading-relaxed">
                        ${project.details.solution}
                    </p>
                </div>

                <!-- Card: O Resultado -->
                <div class="bg-surface p-6 rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300">
                    <h3 class="text-xl font-heading font-bold text-text mb-3 flex items-center gap-2">
                        <span class="w-2 h-8 bg-primary rounded-full"></span>
                        O Resultado
                    </h3>
                    <p class="text-text-light leading-relaxed">
                        ${project.details.result}
                    </p>
                </div>
            </div>
        </div>

        <!-- Galeria de Imagens Adicionais -->
        <!-- Usamos .map() para iterar sobre o array de imagens e gerar tags <img> para cada uma -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${project.details.images.map(img => `
                <img src="${img}" 
                     alt="Detalhe do projeto" 
                     class="w-full rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 loading='lazy'">
            `).join('')}
        </div>
        
        <!-- Botão de Navegação Inferior -->
        <div class="mt-16 text-center">
            <a href="index.html#projects" class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary rounded-xl hover:bg-secondary transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-1">
                Ver outros projetos
            </a>
        </div>
    `;
});
