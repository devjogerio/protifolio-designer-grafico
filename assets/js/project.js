/**
 * Lógica da Página de Detalhes do Projeto.
 * Responsável por recuperar o ID da URL, buscar os dados e renderizar o conteúdo.
 */

import { initCommon } from './common.js';
import { projectsData } from './data.js';

// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

    // Inicializa lógica comum (Menu, Tema)
    initCommon();

    // =========================================
    // Renderização dos Detalhes do Projeto
    // =========================================

    // Obtém os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    // Pega o ID do projeto e converte para número
    const projectId = parseInt(urlParams.get('id'));

    // Encontra o projeto correspondente no arquivo de dados importado
    const project = projectsData.find(p => p.id === projectId);

    // Elemento container onde o conteúdo será injetado
    const container = document.getElementById('project-content');

    // Se o elemento container não existir (erro de estrutura), para a execução
    if (!container) return;

    // Se o projeto não for encontrado (ID inválido), mostra mensagem de erro
    if (!project) {
        container.innerHTML = '<h2>Projeto não encontrado.</h2><a href="index.html" class="btn">Voltar</a>';
        return;
    }

    // Atualiza o título da página (tag <title>) para SEO
    document.title = `${project.title} | Portfólio`;

    // Gera o HTML do conteúdo dinamicamente
    // Estrutura: Cabeçalho do projeto -> Detalhes (Grid) -> Galeria de Imagens
    container.innerHTML = `
        <div style="margin-bottom: 3rem; text-align: center;">
            <span style="color: var(--primary-color); text-transform: uppercase; font-weight: 600; letter-spacing: 1px;">${project.category}</span>
            <h1 style="font-size: 3rem; margin-top: 0.5rem;">${project.title}</h1>
            <p style="font-size: 1.2rem; color: var(--text-light); max-width: 800px; margin: 0 auto;">${project.shortDescription}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 4rem; margin-bottom: 4rem;">
            <img src="${project.thumbnail}" alt="${project.title} - Capa" style="width: 100%; border-radius: var(--border-radius); max-height: 500px; object-fit: cover;">
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div>
                    <h3>O Desafio (Briefing)</h3>
                    <p>${project.details.briefing}</p>
                </div>
                <div>
                    <h3>A Solução</h3>
                    <p>${project.details.solution}</p>
                </div>
                <div>
                    <h3>O Resultado</h3>
                    <p>${project.details.result}</p>
                </div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            ${project.details.images.map(img => `
                <img src="${img}" alt="Detalhe do projeto" style="width: 100%; border-radius: var(--border-radius);">
            `).join('')}
        </div>
        
        <div style="margin-top: 4rem; text-align: center;">
            <a href="index.html#projects" class="btn">Ver outros projetos</a>
        </div>
    `;
});
