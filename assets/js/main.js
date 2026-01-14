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
        // Retorna uma string template literal com a estrutura do card
        // Inclui data-category para facilitar a filtragem
        return `
            <article class="project-card" data-category="${project.category}" onclick="window.location.href='project.html?id=${project.id}'" role="button" tabindex="0">
                <div style="overflow: hidden;">
                    <img src="${project.thumbnail}" alt="${project.title}" class="project-image" loading="lazy">
                </div>
                <div class="project-info">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-light);">${project.shortDescription}</p>
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

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            button.classList.add('active');

            // Obtém o valor do filtro selecionado (ex: 'branding', 'all')
            const filterValue = button.getAttribute('data-filter');

            // Seleciona os cards novamente para garantir que pegamos os elementos DOM atuais
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                // Obtém a categoria do card
                const cardCategory = card.getAttribute('data-category');

                // Lógica de filtragem:
                // Se filtro for 'all' OU a categoria do card for igual ao filtro -> Mostra
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                    // Adiciona uma animação simples de fade-in
                    card.style.opacity = '0';
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    // Caso contrário -> Esconde
                    card.style.display = 'none';
                }
                // =========================================
    // Animação da Lista de Habilidades
    // =========================================

    // Seleciona todos os itens da lista de habilidades
    const skillItems = document.querySelectorAll('.skill-item');

    // Verifica se existem itens para animar
    if (skillItems.length > 0) {
        // Criação do IntersectionObserver para detectar quando os elementos entram na tela
        const observerOptions = {
            root: null, // Usa a viewport como referência
            rootMargin: '0px', // Sem margem adicional
            threshold: 0.1 // Dispara quando 10% do elemento estiver visível
        };

        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Verifica se o elemento entrou na viewport
                if (entry.isIntersecting) {
                    // Seleciona o elemento que entrou
                    const container = entry.target;
                    
                    // Encontra todos os itens dentro deste container (se observarmos a lista)
                    // OU se observarmos cada item individualmente.
                    // Estratégia: Observar o pai (ul) para disparar a cascata
                }
            });
        }, observerOptions);
        
        // Estratégia Refinada: Observar a lista inteira para disparar a sequência
        const skillsList = document.querySelector('.skills-list');
        
        if (skillsList) {
            const listObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Inicia a sequência de animação para cada item
                        skillItems.forEach((item, index) => {
                            // Aplica um atraso escalonado (cascata)
                            // 100ms * índice do item
                            setTimeout(() => {
                                // Adiciona a classe que ativa o CSS animation
                                item.classList.add('visible');
                            }, index * 100);
                        });
                        
                        // Para de observar após ativar a animação (executa apenas uma vez)
                        listObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Começa a observar a lista
            listObserver.observe(skillsList);
        }
    }
});
        });
    });
});
