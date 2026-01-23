/**
 * Módulo ThemeManager
 * Responsável pela lógica de negócio do sistema de temas (Dark/Light Mode).
 * Gerencia estado, persistência e detecção de preferências do sistema operacional.
 */

export default class ThemeManager {
    /**
     * Construtor da classe ThemeManager.
     * @param {Object} storageAdapter - Instância de adaptador para persistência (ex: StorageAdapter).
     */
    constructor(storageAdapter) {
        this.storage = storageAdapter;
        this.storageKey = 'user_theme_preference';
        this.THEME_DARK = 'dark';
        this.THEME_LIGHT = 'light';
        this.currentTheme = null;
    }

    /**
     * Inicializa o gerenciador de temas.
     * Determina o tema inicial baseado em persistência ou preferência do sistema.
     * @returns {string} - O tema que foi aplicado inicialmente.
     */
    init() {
        const savedTheme = this.storage.getItem(this.storageKey);

        if (savedTheme) {
            this.applyTheme(savedTheme);
            return savedTheme;
        }

        if (typeof window !== 'undefined' && window.matchMedia) {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = systemPrefersDark ? this.THEME_DARK : this.THEME_LIGHT;
            this.applyTheme(initialTheme);
            return initialTheme;
        }

        this.applyTheme(this.THEME_LIGHT);
        return this.THEME_LIGHT;
    }

    /**
     * Alterna entre os temas disponíveis (Dark <-> Light).
     * @returns {string} - O novo tema ativo após a alternância.
     */
    toggleTheme() {
        const newTheme = this.currentTheme === this.THEME_DARK ? this.THEME_LIGHT : this.THEME_DARK;
        this.applyTheme(newTheme);
        this.saveThemePreference(newTheme);
        return newTheme;
    }

    /**
     * Aplica um tema específico ao documento e atualiza o estado interno.
     * @param {string} theme - O identificador do tema ('dark' ou 'light').
     */
    applyTheme(theme) {
        this.currentTheme = theme;

        if (typeof document !== 'undefined') {
            const rootElement = document.documentElement;
            
            if (theme === this.THEME_DARK) {
                rootElement.classList.add('dark');
            } else {
                rootElement.classList.remove('dark');
            }
            
            rootElement.setAttribute('data-theme', theme);
        }
    }

    /**
     * Salva a preferência do usuário no armazenamento persistente.
     * @param {string} theme - O tema a ser salvo.
     */
    saveThemePreference(theme) {
        this.storage.setItem(this.storageKey, theme);
    }

    /**
     * Retorna o tema que está ativo no momento.
     * @returns {string|null} - O tema atual.
     */
    getCurrentTheme() {
        return this.currentTheme;
    }
}
