/**
 * Arquivo Principal de JavaScript (Home).
 * Responsável por inicializar a lógica comum e renderizar a galeria da Home.
 */

import { initCommon } from './common.js';
import { projectsData } from './data.js';

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // Inicializa lógica comum (Menu, Tema, Form)
    initCommon();

    // =========================================
    // Renderização da Galeria de Projetos (Apenas Home)
    // =========================================

    // Seleciona o container onde os projetos serão inseridos
    const projectsGrid = document.getElementById('projects-grid');

    /**
     * Função para criar o HTML de um card de projeto.
     * @param {Object} project - Objeto com dados do projeto.
     * @returns {String} HTML string do card.
     */
    function createProjectCard(project) {
        // Retorna uma string template literal com a estrutura do card estilizado com Tailwind
        return `
            <article class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full cursor-pointer" 
                     data-category="${project.category}" 
                     onclick="window.location.href='project.html?id=${project.id}'" 
                     role="button" 
                     tabindex="0">
                <div class="relative overflow-hidden aspect-video">
                    <div class="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors z-10"></div>
                    <img src="${project.thumbnail}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy">
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <div class="flex items-center gap-2 mb-3">
                         <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                         <span class="text-xs font-bold uppercase tracking-wider text-blue-600">${project.category}</span>
                    </div>
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">${project.title}</h3>
                    <p class="text-slate-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">${project.shortDescription}</p>
                    <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                         <span class="font-medium text-slate-500 group-hover:text-blue-600 transition-colors">Ver Detalhes</span>
                         <svg class="w-5 h-5 text-blue-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                </div>
            </article>
        `;
    }

    // Verifica se o container existe e se há dados disponíveis
    if (projectsGrid && projectsData) {
        // Mapeia o array de dados para strings HTML e junta tudo
        projectsGrid.innerHTML = projectsData.map(project => createProjectCard(project)).join('');
    }

    // =========================================
    // Filtros da Galeria
    // =========================================

    // Seleciona todos os botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Classes para estados ativo e inativo
    const activeClasses = ['bg-primary', 'text-white', 'shadow-md'];
    const inactiveClasses = ['bg-surface', 'text-text-light', 'hover:bg-background', 'border', 'border-border'];

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove estilos de ativo de todos e aplica inativo
            filterButtons.forEach(btn => {
                btn.classList.remove(...activeClasses);
                btn.classList.add(...inactiveClasses);
            });

            // Aplica estilos de ativo no botão clicado e remove inativo
            button.classList.remove(...inactiveClasses);
            button.classList.add(...activeClasses);

            // Obtém o valor do filtro selecionado (ex: 'branding', 'all')
            const filterValue = button.getAttribute('data-filter');

            // Seleciona os cards novamente para garantir que pegamos os elementos DOM atuais
            // Note: Usamos a query baseada na estrutura do card atualizado
            const projectCards = document.querySelectorAll('article[data-category]');

            projectCards.forEach(card => {
                // Obtém a categoria do card
                const cardCategory = card.getAttribute('data-category');

                // Lógica de filtragem:
                // Se filtro for 'all' OU a categoria do card for igual ao filtro -> Mostra
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hidden');
                    card.classList.add('flex'); // Garante display flex para layout
                    // Adiciona uma animação simples de fade-in
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    // Caso contrário -> Esconde
                    card.classList.add('hidden');
                    card.classList.remove('flex');
                }
            });
        });
    });
});
