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
        container.innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-3xl font-bold text-slate-900 mb-4">Projeto não encontrado</h2>
                <a href="index.html" class="text-blue-600 hover:underline">Voltar para Home</a>
            </div>
        `;
        return;
    }

    // Atualiza o título da página (tag <title>) para SEO
    document.title = `${project.title} | Portfólio`;

    // Gera o HTML do conteúdo dinamicamente
    // Estrutura: Cabeçalho do projeto -> Detalhes (Grid) -> Galeria de Imagens
    container.innerHTML = `
        <div class="mb-12 text-center">
            <span class="text-blue-600 uppercase font-semibold tracking-wider text-sm">${project.category}</span>
            <h1 class="text-4xl md:text-5xl font-heading font-bold text-slate-900 mt-2 mb-4">${project.title}</h1>
            <p class="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">${project.shortDescription}</p>
        </div>

        <div class="grid grid-cols-1 gap-12 mb-16">
            <img src="${project.thumbnail}" alt="${project.title} - Capa" class="w-full h-auto rounded-2xl shadow-lg max-h-[600px] object-cover">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span class="w-2 h-8 bg-blue-500 rounded-full"></span>
                        O Desafio
                    </h3>
                    <p class="text-slate-600 leading-relaxed">${project.details.briefing}</p>
                </div>
                <div class="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span class="w-2 h-8 bg-indigo-500 rounded-full"></span>
                        A Solução
                    </h3>
                    <p class="text-slate-600 leading-relaxed">${project.details.solution}</p>
                </div>
                <div class="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h3 class="text-xl font-heading font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span class="w-2 h-8 bg-purple-500 rounded-full"></span>
                        O Resultado
                    </h3>
                    <p class="text-slate-600 leading-relaxed">${project.details.result}</p>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${project.details.images.map(img => `
                <img src="${img}" alt="Detalhe do projeto" class="w-full rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
            `).join('')}
        </div>
        
        <div class="mt-16 text-center">
            <a href="index.html#projects" class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transform hover:-translate-y-1">
                Ver outros projetos
            </a>
        </div>
    `;
});
