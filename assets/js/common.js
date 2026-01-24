/**
 * Módulo Common (Lógica Compartilhada)
 * ------------------------------------
 * Este arquivo contém funcionalidades que são usadas em múltiplas páginas do site,
 * como a inicialização do tema (Dark Mode), o menu mobile e o rodapé.
 *
 * Ele exporta a função 'initCommon' que atua como um ponto de entrada único
 * para configurar esses elementos globais.
 */

// Importa os módulos necessários para gerenciar o tema e o formulário
import StorageAdapter from './modules/StorageAdapter.js';
import ThemeManager from './modules/ThemeManager.js';
import { initContactForm } from './modules/ContactForm.js';

/**
 * Função principal de inicialização global.
 * Deve ser chamada no início do carregamento de cada página (main.js e project.js).
 */
export function initCommon() {

    // =========================================================================
    // 1. Configuração do Sistema de Temas (Dark/Light Mode)
    // =========================================================================

    // Cria a instância do adaptador de armazenamento (para salvar a preferência no localStorage)
    const storageAdapter = new StorageAdapter();

    // Cria o gerenciador de temas, injetando o adaptador de storage
    const themeManager = new ThemeManager(storageAdapter);

    // Inicializa o tema:
    // Verifica se já existe uma preferência salva ou usa a configuração do sistema operacional
    themeManager.init();

    // Configura o ouvinte de evento (click) para o botão de alternar tema
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Verifica se o botão existe na página antes de adicionar o evento (evita erros em páginas sem o botão)
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Chama o método que inverte o tema atual
            themeManager.toggleTheme();
        });
    }

    // =========================================================================
    // 2. Menu Mobile (Responsividade)
    // =========================================================================

    // Referência ao botão "hambúrguer" do menu em telas pequenas
    const menuToggle = document.getElementById('menu-toggle');
    // Referência ao container da lista de links do menu
    const mobileMenu = document.getElementById('mobile-menu');

    // Só executa a lógica se ambos os elementos existirem no DOM
    if (menuToggle && mobileMenu) {
        // Evento de clique no botão do menu
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'hidden' (Tailwind) para mostrar ou esconder o menu
            mobileMenu.classList.toggle('hidden');

            // Acessibilidade (A11y):
            // Atualiza o atributo aria-expanded para informar leitores de tela sobre o estado do menu
            const isExpanded = !mobileMenu.classList.contains('hidden');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // UX (Experiência do Usuário):
        // Fecha o menu automaticamente quando o usuário clica em qualquer link dentro dele.
        // Isso evita que o menu continue cobrindo a tela após a navegação.
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden'); // Esconde o menu
                menuToggle.setAttribute('aria-expanded', 'false'); // Atualiza acessibilidade
            });
        });
    }

    // =========================================================================
    // 3. Atualização Dinâmica do Rodapé
    // =========================================================================

    // Busca o elemento onde o ano deve ser exibido
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        // Define o texto como o ano atual automaticamente (ex: 2026)
        // Evita que o site fique com datas antigas no copyright.
        yearElement.textContent = new Date().getFullYear();
    }

    // =========================================================================
    // 4. Lógica do Formulário de Contato
    // =========================================================================

    // Inicializa o módulo de formulário (validação, máscara e envio AJAX)
    // A lógica foi movida para um módulo separado para manter o código limpo e organizado.
    initContactForm();
}
