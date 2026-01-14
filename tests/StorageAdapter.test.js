/**
 * Testes Unitários para o StorageAdapter.
 * Garante que a abstração do localStorage funcione e trate erros.
 */

import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import StorageAdapter from '../assets/js/modules/StorageAdapter.js';

describe('StorageAdapter', () => {
    let adapter;
    let mockLocalStorage;

    beforeEach(() => {
        // Mock do localStorage nativo
        mockLocalStorage = {
            store: {},
            getItem: jest.fn((key) => mockLocalStorage.store[key] || null),
            setItem: jest.fn((key, value) => {
                mockLocalStorage.store[key] = value + ''; // Simula comportamento de string
            }),
            removeItem: jest.fn((key) => {
                delete mockLocalStorage.store[key];
            }),
            clear: jest.fn(() => {
                mockLocalStorage.store = {};
            })
        };
        
        adapter = new StorageAdapter(mockLocalStorage);
    });

    test('Deve salvar e recuperar um item com sucesso', () => {
        const key = 'testKey';
        const value = { id: 1, name: 'Teste' };

        const saved = adapter.setItem(key, value);
        expect(saved).toBe(true);
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));

        const retrieved = adapter.getItem(key);
        expect(retrieved).toEqual(value);
    });

    test('Deve retornar null se a chave não existir', () => {
        const retrieved = adapter.getItem('nonexistent');
        expect(retrieved).toBeNull();
    });

    test('Deve tratar erro ao salvar (QuotaExceeded)', () => {
        // Simula erro no setItem
        mockLocalStorage.setItem.mockImplementation(() => {
            throw new Error('QuotaExceededError');
        });

        const result = adapter.setItem('key', 'value');
        
        expect(result).toBe(false); // Deve retornar false em vez de explodir
    });

    test('Deve tratar erro ao recuperar JSON inválido', () => {
        // Simula dado corrompido no storage
        mockLocalStorage.store['corrupted'] = '{invalid-json}';
        
        // Evita poluir o console do teste com o console.error esperado
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        const result = adapter.getItem('corrupted');
        
        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalled();
        
        consoleSpy.mockRestore();
    });

    test('Deve validar chave inválida no setItem', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        const result = adapter.setItem(null, 'value');
        
        expect(result).toBe(false);
        
        consoleSpy.mockRestore();
    });

    test('Deve remover item corretamente', () => {
        adapter.setItem('key', 'value');
        const result = adapter.removeItem('key');
        
        expect(result).toBe(true);
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('key');
        expect(adapter.getItem('key')).toBeNull();
    });
    
    test('Deve tratar erro ao remover item', () => {
        mockLocalStorage.removeItem.mockImplementation(() => {
            throw new Error('AccessDenied');
        });
        
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        const result = adapter.removeItem('key');
        expect(result).toBe(false);
        
        consoleSpy.mockRestore();
    });

    test('isAvailable deve retornar true se storage funcional', () => {
        expect(adapter.isAvailable()).toBe(true);
    });

    test('isAvailable deve retornar false se storage falhar', () => {
        mockLocalStorage.setItem.mockImplementation(() => {
            throw new Error('SecurityError');
        });
        
        expect(adapter.isAvailable()).toBe(false);
    });

    test('Deve usar localStorage padrão se nenhum mecanismo for fornecido', () => {
        const defaultAdapter = new StorageAdapter();
        // Verifica se a propriedade interna 'storage' é o localStorage global do JSDOM
        expect(defaultAdapter.storage).toBe(localStorage);
    });
});
