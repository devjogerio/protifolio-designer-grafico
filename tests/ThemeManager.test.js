/**
 * Testes Unitários para o ThemeManager.
 * Garante que a lógica de negócio de temas funcione corretamente isolada do navegador real.
 * Cobertura alvo: >= 90%.
 */

import { jest, describe, test, expect, beforeEach } from '@jest/globals';

// Importa a classe a ser testada
import ThemeManager from '../assets/js/modules/ThemeManager.js';

// Mock (simulação) do StorageAdapter para não depender do localStorage real
const mockStorageAdapter = {
    getItem: jest.fn(), // Simula a função getItem
    setItem: jest.fn()  // Simula a função setItem
};

describe('ThemeManager', () => {
    let themeManager;

    // Configuração executada antes de cada teste
    beforeEach(() => {
        // Limpa os mocks para garantir testes independentes
        jest.clearAllMocks();
        
        // Reseta o DOM simulado (JSDOM já vem com Jest, mas garantimos limpeza)
        document.documentElement.className = '';
        document.documentElement.removeAttribute('data-theme');
        
        // Instancia a classe injetando o mock
        themeManager = new ThemeManager(mockStorageAdapter);
    });

    test('Deve inicializar com tema salvo no storage se existir', () => {
        // Configura o mock para retornar 'dark' quando getItem for chamado
        mockStorageAdapter.getItem.mockReturnValue('dark');

        // Executa a inicialização
        const result = themeManager.init();

        // Verifica se o resultado foi o tema salvo
        expect(result).toBe('dark');
        // Verifica se o estado interno foi atualizado
        expect(themeManager.getCurrentTheme()).toBe('dark');
        // Verifica se a classe CSS foi aplicada ao HTML
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('Deve inicializar com preferência do sistema (Dark) se storage vazio', () => {
        // Configura storage vazio
        mockStorageAdapter.getItem.mockReturnValue(null);

        // Mock do window.matchMedia para simular preferência do sistema
        window.matchMedia = jest.fn().mockImplementation(query => {
            return {
                matches: query === '(prefers-color-scheme: dark)', // Retorna true para dark
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
        });

        // Executa init
        const result = themeManager.init();

        // Espera que use a preferência do sistema
        expect(result).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('Deve inicializar com preferência do sistema (Light) se storage vazio', () => {
        // Configura storage vazio
        mockStorageAdapter.getItem.mockReturnValue(null);

        // Mock do window.matchMedia para simular preferência LIGHT (return false para dark)
        window.matchMedia = jest.fn().mockImplementation(query => {
            return {
                matches: false, // Não prefere dark
                media: query,
                // ... outros métodos necessários para o mock
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
            };
        });

        const result = themeManager.init();

        expect(result).toBe('light');
        // No Tailwind, Light mode é a ausência da classe 'dark', não a presença da classe 'light'
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('Deve alternar (toggle) de Light para Dark corretamente', () => {
        // Estado inicial Light
        themeManager.currentTheme = 'light';
        
        // Executa toggle
        const newTheme = themeManager.toggleTheme();

        // Verificações
        expect(newTheme).toBe('dark'); // Deve virar dark
        expect(themeManager.getCurrentTheme()).toBe('dark'); // Estado interno
        expect(mockStorageAdapter.setItem).toHaveBeenCalledWith('user_theme_preference', 'dark'); // Deve persistir
        expect(document.documentElement.classList.contains('dark')).toBe(true); // DOM
    });

    test('Deve alternar (toggle) de Dark para Light corretamente', () => {
        // Estado inicial Dark
        themeManager.currentTheme = 'dark';
        document.documentElement.classList.add('dark'); // Simula estado inicial no DOM
        
        // Executa toggle
        const newTheme = themeManager.toggleTheme();

        // Verificações
        expect(newTheme).toBe('light'); // Deve virar light
        expect(themeManager.getCurrentTheme()).toBe('light');
        expect(mockStorageAdapter.setItem).toHaveBeenCalledWith('user_theme_preference', 'light');
        // Garante que 'dark' foi removido. Não checamos por 'light' pois ela não é usada.
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    test('ApplyTheme deve remover classes antigas e adicionar a nova', () => {
        // Simula que já tem a classe dark
        document.documentElement.classList.add('dark');
        document.documentElement.classList.add('random-class');

        // Aplica tema light
        themeManager.applyTheme('light');

        // Verifica limpeza e aplicação
        expect(document.documentElement.classList.contains('dark')).toBe(false); // Removeu dark
        expect(document.documentElement.classList.contains('random-class')).toBe(true); // Manteve outras classes
        expect(document.documentElement.getAttribute('data-theme')).toBe('light'); // Atributo de dados
    });
    
    test('Init deve usar fallback "light" se matchMedia não estiver disponível', () => {
        // Storage vazio
        mockStorageAdapter.getItem.mockReturnValue(null);
        
        // Remove matchMedia temporariamente
        const originalMatchMedia = window.matchMedia;
        delete window.matchMedia; // Simula navegador antigo ou ambiente restrito
        
        const result = themeManager.init();
        
        expect(result).toBe('light'); // Fallback padrão
        
        // Restaura matchMedia para não afetar outros testes (boas práticas)
        window.matchMedia = originalMatchMedia;
    });
});
