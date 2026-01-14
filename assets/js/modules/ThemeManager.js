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
        // Injeta a dependência de armazenamento para desacoplamento
        this.storage = storageAdapter;
        
        // Define a chave usada para salvar a preferência no storage
        this.storageKey = 'user_theme_preference';
        
        // Define as constantes para os temas disponíveis
        this.THEME_DARK = 'dark';
        this.THEME_LIGHT = 'light';
        
        // Estado interno para armazenar o tema atual
        this.currentTheme = null;
    }

    /**
     * Inicializa o gerenciador de temas.
     * Determina o tema inicial baseado em persistência ou preferência do sistema.
     * @returns {string} - O tema que foi aplicado inicialmente.
     */
    init() {
        // Tenta recuperar um tema salvo anteriormente pelo usuário
        const savedTheme = this.storage.getItem(this.storageKey);

        // Verifica se existe um tema salvo válido
        if (savedTheme) {
            // Se existir, aplica esse tema
            this.applyTheme(savedTheme);
            // Retorna o tema aplicado
            return savedTheme;
        }

        // Se não houver salvo, verifica a preferência do sistema operacional
        // window.matchMedia pode não existir em ambiente de teste (Node), então verificamos
        if (typeof window !== 'undefined' && window.matchMedia) {
            // Verifica se o sistema prefere esquema de cores escuro
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            // Define o tema inicial baseado na preferência do sistema
            const initialTheme = systemPrefersDark ? this.THEME_DARK : this.THEME_LIGHT;
            // Aplica o tema decidido
            this.applyTheme(initialTheme);
            // Retorna o tema aplicado
            return initialTheme;
        }

        // Fallback padrão se nada mais funcionar: tema claro
        this.applyTheme(this.THEME_LIGHT);
        // Retorna o tema padrão
        return this.THEME_LIGHT;
    }

    /**
     * Alterna entre os temas disponíveis (Dark <-> Light).
     * @returns {string} - O novo tema ativo após a alternância.
     */
    toggleTheme() {
        // Determina qual será o novo tema baseado no atual
        // Se for escuro, vira claro; se for claro (ou nulo), vira escuro
        const newTheme = this.currentTheme === this.THEME_DARK ? this.THEME_LIGHT : this.THEME_DARK;
        
        // Aplica o novo tema visualmente e no estado
        this.applyTheme(newTheme);
        
        // Salva a preferência do usuário explicitamente
        this.saveThemePreference(newTheme);
        
        // Retorna o novo tema para quem chamou
        return newTheme;
    }

    /**
     * Aplica um tema específico ao documento e atualiza o estado interno.
     * @param {string} theme - O identificador do tema ('dark' ou 'light').
     */
    applyTheme(theme) {
        // Atualiza a variável de estado interno
        this.currentTheme = theme;

        // Verifica se estamos em um ambiente de navegador (para manipular DOM)
        if (typeof document !== 'undefined') {
            // Seleciona o elemento raiz (<html>)
            const rootElement = document.documentElement;
            
            // Remove classes antigas para evitar conflitos
            rootElement.classList.remove(this.THEME_DARK, this.THEME_LIGHT);
            
            // Adiciona a classe correspondente ao tema atual
            rootElement.classList.add(theme);
            
            // Define um atributo data-theme para facilitar seletores CSS alternativos
            rootElement.setAttribute('data-theme', theme);
        }
    }

    /**
     * Salva a preferência do usuário no armazenamento persistente.
     * @param {string} theme - O tema a ser salvo.
     */
    saveThemePreference(theme) {
        // Usa o adaptador de storage para salvar a escolha
        // Isso garante que a preferência persista entre sessões (refresh da página)
        this.storage.setItem(this.storageKey, theme);
    }

    /**
     * Retorna o tema que está ativo no momento.
     * @returns {string|null} - O tema atual.
     */
    getCurrentTheme() {
        // Getter simples para o estado
        return this.currentTheme;
    }
}
