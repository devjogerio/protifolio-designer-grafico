/**
 * Módulo Common (Lógica Compartilhada)
 * ------------------------------------
 * Este arquivo contém funcionalidades que são usadas em múltiplas páginas do site,
 * como a inicialização do tema (Dark Mode), o menu mobile e o rodapé.
 *
 * Ele exporta a função 'initCommon' que atua como um ponto de entrada único
 * para configurar esses elementos globais.
 */

// Importa os módulos necessários para gerenciar o tema
import StorageAdapter from './modules/StorageAdapter.js';
import ThemeManager from './modules/ThemeManager.js';

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

    // Referência ao formulário e ao campo de WhatsApp
    const contactForm = document.getElementById('contact-form');
    const whatsappInput = document.getElementById('whatsapp');

    // Máscara de Entrada para WhatsApp
    if (whatsappInput) {
        whatsappInput.addEventListener('input', (e) => {
            // Remove qualquer caractere que não seja número
            let value = e.target.value.replace(/\D/g, '');

            // Limita o tamanho máximo a 11 dígitos (DDD + 9 dígitos)
            if (value.length > 11) value = value.slice(0, 11);

            // Aplica a formatação visual (XX) XXXXX-XXXX progressivamente
            if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            if (value.length > 10) {
                value = `${value.slice(0, 10)}-${value.slice(10)}`;
            }

            // Atualiza o valor do input com a máscara aplicada
            e.target.value = value;

            // Feedback Visual de Validação:
            // Se o número estiver completo (15 caracteres contando a máscara), fica verde.
            if (value.length === 15) {
                // Remove estilos padrão/erro
                e.target.classList.remove('border-border', 'focus:border-primary');
                // Adiciona estilo de sucesso (borda verde)
                e.target.classList.add('border-green-500', 'focus:border-green-500');
            } else {
                // Remove estilo de sucesso
                e.target.classList.remove('border-green-500', 'focus:border-green-500');
                // Volta ao estilo padrão
                e.target.classList.add('border-border', 'focus:border-primary');
            }
        });
    }

    // Envio do Formulário (Simulação)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Previne o comportamento padrão de recarregar a página
            e.preventDefault();

            // Elementos de feedback visual (mensagens de sucesso/erro)
            const successMsg = document.getElementById('form-success');
            const errorMsg = document.getElementById('form-error');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Estado de "Carregando..."
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true; // Desabilita o botão para evitar duplo envio

            // Simula uma requisição assíncrona (como um fetch para uma API)
            setTimeout(() => {
                // Flag de simulação (sempre sucesso neste demo)
                const isSuccess = true;

                if (isSuccess) {
                    // Mostra mensagem de sucesso e esconde erro
                    successMsg.classList.remove('hidden');
                    errorMsg.classList.add('hidden');
                    // Limpa os campos do formulário
                    contactForm.reset();
                } else {
                    // Mostra mensagem de erro
                    errorMsg.classList.remove('hidden');
                    successMsg.classList.add('hidden');
                }

                // Restaura o botão ao estado original
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Remove a mensagem de feedback após 5 segundos para limpar a tela
                setTimeout(() => {
                    successMsg.classList.add('hidden');
                    errorMsg.classList.add('hidden');
                }, 5000);

            }, 1500); // Delay artificial de 1.5s
        });
    }
}
