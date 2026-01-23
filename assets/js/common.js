/**
 * Módulo Comum (Common)
 * Contém a lógica compartilhada entre todas as páginas (Menu, Tema, Formulário de Contato).
 */

import StorageAdapter from './modules/StorageAdapter.js';
import ThemeManager from './modules/ThemeManager.js';

export function initCommon() {
    // =========================================
    // 0. Inicialização do Gerenciador de Temas
    // =========================================

    // Instancia o adaptador de armazenamento
    const storageAdapter = new StorageAdapter();
    // Instancia o gerenciador de temas injetando o adaptador
    const themeManager = new ThemeManager(storageAdapter);

    // Inicializa o tema (carrega preferência salva ou do sistema)
    themeManager.init();

    // Configura o botão de alternância
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            themeManager.toggleTheme();
        });
    }

    // =========================================
    // 3. Atualização do Ano no Rodapé
    // =========================================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // =========================================
    // 1. Menu Mobile
    // =========================================

    // Seleciona o botão de toggle do menu
    const menuToggle = document.getElementById('menu-toggle');
    // Seleciona o container do menu mobile
    const mobileMenu = document.getElementById('mobile-menu');

    // Verifica se os elementos existem para evitar erros
    if (menuToggle && mobileMenu) {
        // Adiciona ouvinte de evento de clique no botão
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'hidden' para mostrar/esconder
            mobileMenu.classList.toggle('hidden');

            // Acessibilidade: atualiza o atributo aria-expanded
            const isExpanded = !mobileMenu.classList.contains('hidden');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Fecha o menu ao clicar em um link (melhor UX mobile)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // =========================================
    // 2. Formulário de Contato (Se existir na página)
    // =========================================

    // Seleciona o formulário
    const contactForm = document.getElementById('contact-form');
    // Seleciona o campo de WhatsApp
    const whatsappInput = document.getElementById('whatsapp');

    // Lógica para formatação automática do WhatsApp
    if (whatsappInput) {
        whatsappInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito

            // Aplica a máscara (XX) XXXXX-XXXX
            if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

            if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            if (value.length > 10) {
                value = `${value.slice(0, 10)}-${value.slice(10)}`;
            }

            e.target.value = value;

            // Validação visual simples (muda cor da borda usando Tailwind)
            if (value.length === 15) {
                e.target.classList.remove('border-slate-200', 'focus:border-blue-500');
                e.target.classList.add('border-green-500', 'focus:border-green-500');
            } else {
                e.target.classList.remove('border-green-500', 'focus:border-green-500');
                e.target.classList.add('border-slate-200', 'focus:border-blue-500');
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Previne o envio padrão do formulário (que recarregaria a página)
            e.preventDefault();

            // Seleciona os elementos de feedback
            const successMsg = document.getElementById('form-success');
            const errorMsg = document.getElementById('form-error');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Simulação de estado de "Carregando"
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simulação de envio assíncrono (ex: fetch para API)
            setTimeout(() => {
                // Aqui entraria a lógica real de envio (ex: EmailJS, Formspree)
                // Para este portfólio estático, simulamos sucesso sempre.

                const isSuccess = true; // Flag de controle para teste

                if (isSuccess) {
                    // Mostra mensagem de sucesso
                    successMsg.style.display = 'block';
                    errorMsg.style.display = 'none';
                    // Limpa o formulário
                    contactForm.reset();
                } else {
                    // Mostra mensagem de erro
                    errorMsg.style.display = 'block';
                    successMsg.style.display = 'none';
                }

                // Restaura o botão
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Remove a mensagem após 5 segundos
                setTimeout(() => {
                    successMsg.style.display = 'none';
                    errorMsg.style.display = 'none';
                }, 5000);

            }, 1500); // Delay de 1.5s para simular rede
        });
    }
}
