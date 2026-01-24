/**
 * Arquivo Principal de JavaScript (Home - main.js)
 * ------------------------------------------------
 * Este arquivo é o ponto de entrada principal para a página inicial (index.html).
 * Ele orquestra a inicialização dos componentes globais e gerencia a lógica específica da Home,
 * como a renderização dinâmica da galeria de projetos e o sistema de filtragem.
 *
 * Funcionalidades:
 * 1. Importa e executa a inicialização comum (tema, menu mobile).
 * 2. Importa os dados dos projetos.
 * 3. Renderiza os cards de projetos na tela usando template strings.
 * 4. Gerencia a interatividade dos botões de filtro (Branding, Web, etc.).
 */

// Importa a função de inicialização comum de 'common.js'.
// O uso de módulos (import/export) permite organizar o código em arquivos menores e reutilizáveis.
import { initCommon } from './common.js';

// Importa os dados dos projetos de 'data.js'.
// Separar os dados da lógica (Data-Driven) facilita a manutenção e adição de novos projetos.
import { projectsData } from './data.js';

// Adiciona um ouvinte de evento para quando o DOM (Document Object Model) estiver totalmente carregado.
// Isso garante que não tentaremos manipular elementos HTML que ainda não foram renderizados pelo navegador.
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. Inicialização Global
    // =========================================================================

    // Chama a função que configura o tema (dark/light mode) e o menu mobile.
    // Isso evita duplicação de código entre a Home e a página de Projetos.
    initCommon();

    // =========================================================================
    // 2. Renderização da Galeria de Projetos
    // =========================================================================

    // Seleciona o elemento HTML onde os cards dos projetos serão inseridos.
    // getElementById é o método mais performático para selecionar um elemento pelo ID.
    const projectsGrid = document.getElementById('projects-grid');

    /**
     * Função auxiliar para criar o HTML de um card de projeto individual.
     * 
     * @param {Object} project - Objeto contendo os dados do projeto (id, titulo, imagem, etc).
     * @returns {String} - Uma string contendo o HTML estruturado do card.
     * 
     * Por que usar Template Literals (crases)?
     * Permitem interpolação de variáveis (${}) e múltiplas linhas, tornando o código HTML legível dentro do JS.
     */
    function createProjectCard(project) {
        return `
            <!-- 
                Container do Card (article):
                - group: Permite estilizar elementos filhos baseado no hover do pai (ex: zoom na imagem).
                - cursor-pointer: Indica que o elemento é clicável.
                - onclick: Redireciona via JS (embora <a> seja melhor para SEO, div clicável é comum em cards complexos).
                - data-category: Atributo customizado (dataset) usado para filtrar os projetos depois.
            -->
            <article class="group bg-surface rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border flex flex-col h-full cursor-pointer" 
                     data-category="${project.category}" 
                     onclick="window.location.href='project.html?id=${project.id}'" 
                     role="button" 
                     tabindex="0"
                     aria-label="Ver detalhes do projeto ${project.title}">
                
                <!-- 
                    Container da Imagem:
                    - aspect-video: Mantém a proporção 16:9 automaticamente.
                    - relative/absolute: Usado para criar o efeito de overlay (camada colorida) no hover.
                -->
                <div class="relative overflow-hidden aspect-video">
                    <!-- Overlay: Camada transparente que ganha cor ao passar o mouse -->
                    <div class="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors z-10"></div>
                    
                    <!-- Imagem do Projeto: 
                        - object-cover: Garante que a imagem preencha o espaço sem distorcer.
                        - group-hover:scale-105: Efeito de zoom suave ao passar o mouse no card.
                        - loading="lazy": Melhora performance carregando a imagem apenas quando visível.
                    -->
                    <img src="${project.thumbnail}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" loading="lazy">
                </div>

                <!-- Conteúdo Textual do Card -->
                <div class="p-6 flex flex-col flex-grow">
                    
                    <!-- Categoria (Tag) -->
                    <div class="flex items-center gap-2 mb-3">
                        <span class="w-2 h-2 rounded-full bg-primary"></span>
                        <span class="text-xs font-bold uppercase tracking-wider text-primary">${project.category}</span>
                    </div>

                    <!-- Título -->
                    <h3 class="text-xl font-heading font-bold text-text mb-2 group-hover:text-primary transition-colors">
                        ${project.title}
                    </h3>

                    <!-- Descrição Curta -->
                    <!-- line-clamp-3: Corta o texto após 3 linhas e adiciona reticências (...) -->
                    <p class="text-text-light text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                        ${project.shortDescription}
                    </p>

                    <!-- Rodapé do Card (Link 'Ver Detalhes') -->
                    <div class="pt-4 border-t border-border flex items-center justify-between text-sm">
                        <span class="font-medium text-text-light group-hover:text-primary transition-colors">Ver Detalhes</span>
                        <!-- Ícone de seta que se move para a direita no hover -->
                        <svg class="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </div>
                </div>
            </article>
        `;
    }

    // Verificação de segurança: Só tenta renderizar se o elemento existir e se houver dados.
    // Isso evita erros no console caso o JS seja carregado em uma página sem esse ID.
    if (projectsGrid && projectsData) {
        // map(): Transforma o array de objetos (dados) em um array de strings (HTML).
        // join(''): Junta todas as strings HTML em uma única string grande para inserir no DOM.
        projectsGrid.innerHTML = projectsData.map(project => createProjectCard(project)).join('');
    }

    // =========================================================================
    // 3. Sistema de Filtros (Categorias)
    // =========================================================================

    // Seleciona todos os botões que possuem a classe .filter-btn
    // querySelectorAll retorna uma NodeList (similar a um array).
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Definição das classes CSS para os estados Ativo e Inativo dos botões.
    // Centralizar isso em arrays facilita a manutenção caso queiramos mudar o estilo visual depois.
    const activeClasses = ['bg-primary', 'text-white', 'shadow-md'];
    const inactiveClasses = ['bg-surface', 'text-text-light', 'hover:bg-background', 'border', 'border-border'];

    // Itera sobre cada botão para adicionar o comportamento de clique
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // Passo 1: Resetar visual de TODOS os botões
            filterButtons.forEach(btn => {
                // remove(...array) espalha os itens do array como argumentos individuais
                btn.classList.remove(...activeClasses);
                btn.classList.add(...inactiveClasses);
            });

            // Passo 2: Ativar visual APENAS do botão clicado
            button.classList.remove(...inactiveClasses);
            button.classList.add(...activeClasses);

            // Passo 3: Obter a categoria selecionada (ex: 'branding', 'web', 'all')
            const filterValue = button.getAttribute('data-filter');

            // Seleciona todos os cards de projeto renderizados na tela
            // É importante selecionar aqui dentro para garantir que pegamos os elementos atuais
            const projectCards = document.querySelectorAll('article[data-category]');

            // Passo 4: Mostrar/Esconder cards baseado na seleção
            projectCards.forEach(card => {
                // Obtém a categoria do card atual
                const cardCategory = card.getAttribute('data-category');

                // Lógica: Se filtro for 'all' OU a categoria bater, mostra. Senão, esconde.
                if (filterValue === 'all' || filterValue === cardCategory) {
                    // Remove 'hidden' e adiciona 'flex' para exibir
                    card.classList.remove('hidden');
                    card.classList.add('flex');
                    
                    // Pequena animação de opacidade para suavizar a transição
                    card.style.opacity = '0';
                    // setTimeout com tempo mínimo joga a execução para o próximo ciclo de renderização, permitindo a transição CSS
                    setTimeout(() => card.style.opacity = '1', 50);
                } else {
                    // Adiciona 'hidden' para remover do layout (não ocupa espaço)
                    card.classList.add('hidden');
                    card.classList.remove('flex');
                }
            });
        });
    });
});
