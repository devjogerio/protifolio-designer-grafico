/**
 * Módulo ThemeManager
 * -------------------
 * Gerencia a lógica de temas (Dark Mode vs Light Mode) da aplicação.
 *
 * Responsabilidades:
 * 1. Verificar preferências do sistema operacional (prefers-color-scheme).
 * 2. Verificar preferências salvas pelo usuário (localStorage).
 * 3. Alternar o tema e aplicar as classes CSS necessárias.
 * 4. Persistir a escolha do usuário para visitas futuras.
 */

export default class ThemeManager {
    /**
     * Construtor da classe.
     * @param {Object} storageAdapter - Instância de um adaptador de storage (ex: StorageAdapter).
     * Recebemos o storage por injeção de dependência para desacoplar a lógica de persistência.
     */
    constructor(storageAdapter) {
        // Armazena o adaptador para uso nos métodos
        this.storage = storageAdapter;

        // Define a chave que será usada no localStorage
        this.storageKey = 'user_theme_preference';

        // Constantes para evitar "magic strings" e erros de digitação
        this.THEME_DARK = 'dark';
        this.THEME_LIGHT = 'light';

        // Estado interno para saber qual tema está ativo
        this.currentTheme = null;
    }

    /**
     * Inicializa o gerenciador de temas.
     * Deve ser chamado assim que a página carregar.
     *
     * Lógica de Decisão:
     * 1. Se tem tema salvo no storage, usa ele.
     * 2. Se não, verifica a preferência do sistema operacional.
     * 3. Se nada for detectado, assume o tema claro (light).
     *
     * @returns {string} - O tema que foi aplicado.
     */
    init() {
        // Tenta recuperar uma preferência salva anteriormente
        const savedTheme = this.storage.getItem(this.storageKey);

        // Cenário 1: Usuário já escolheu um tema antes
        if (savedTheme) {
            this.applyTheme(savedTheme); // Aplica o tema salvo
            return savedTheme;
        }

        // Cenário 2: Nenhuma preferência salva, verifica o Sistema Operacional
        // window.matchMedia verifica media queries via JS
        if (typeof window !== 'undefined' && window.matchMedia) {
            // Verifica se o OS prefere modo escuro
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            // Decide o tema inicial baseado no sistema
            const initialTheme = systemPrefersDark ? this.THEME_DARK : this.THEME_LIGHT;

            this.applyTheme(initialTheme);
            return initialTheme;
        }

        // Cenário 3: Fallback padrão (Tema Claro)
        this.applyTheme(this.THEME_LIGHT);
        return this.THEME_LIGHT;
    }

    /**
     * Alterna (toggle) entre Claro e Escuro.
     * Usado quando o usuário clica no botão de tema.
     *
     * @returns {string} - O novo tema ativo.
     */
    toggleTheme() {
        // Se o atual é dark, vira light. Se não, vira dark. (Operador ternário)
        const newTheme = this.currentTheme === this.THEME_DARK ? this.THEME_LIGHT : this.THEME_DARK;

        // Aplica visualmente o novo tema
        this.applyTheme(newTheme);

        // Salva a nova escolha no storage para persistir no reload
        this.saveThemePreference(newTheme);

        return newTheme;
    }

    /**
     * Aplica as alterações no DOM para ativar o tema.
     * Adiciona ou remove a classe 'dark' na tag <html>.
     * O Tailwind CSS v4 usa essa classe (.dark) para aplicar os estilos dark:*.
     *
     * @param {string} theme - O tema a ser aplicado ('dark' ou 'light').
     */
    applyTheme(theme) {
        // Atualiza o estado interno
        this.currentTheme = theme;

        // Verifica se estamos num ambiente de navegador (tem document)
        if (typeof document !== 'undefined') {
            const rootElement = document.documentElement; // Tag <html>

            // Lógica de classes CSS
            if (theme === this.THEME_DARK) {
                // Adiciona a classe .dark para ativar variáveis CSS de modo escuro
                rootElement.classList.add('dark');
            } else {
                // Remove a classe .dark para voltar ao modo claro
                rootElement.classList.remove('dark');
            }

            // Adiciona um atributo data-theme para facilitar seletores CSS complexos se necessário
            rootElement.setAttribute('data-theme', theme);
        }
    }

    /**
     * Salva a preferência do usuário.
     * Encapsula a chamada ao storageAdapter.
     * @param {string} theme - O tema a ser salvo.
     */
    saveThemePreference(theme) {
        this.storage.setItem(this.storageKey, theme);
    }

    /**
     * Getter para o tema atual.
     * @returns {string|null}
     */
    getCurrentTheme() {
        return this.currentTheme;
    }
}
