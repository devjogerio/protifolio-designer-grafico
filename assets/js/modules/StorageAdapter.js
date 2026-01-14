/**
 * Módulo StorageAdapter
 * Responsável por abstrair a interação com mecanismos de persistência (localStorage/sessionStorage).
 * Implementa tratamento de erros robusto para casos de falha de acesso ou cota excedida.
 */

export default class StorageAdapter {
    /**
     * Construtor da classe.
     * @param {Storage} storageMechanism - O mecanismo de armazenamento a ser usado (padrão: localStorage).
     * Permite injeção de dependência para facilitar testes unitários.
     */
    constructor(storageMechanism = localStorage) {
        // Armazena a referência ao mecanismo de storage (localStorage ou sessionStorage)
        this.storage = storageMechanism;
    }

    /**
     * Salva um valor no armazenamento.
     * @param {string} key - A chave identificadora do dado.
     * @param {any} value - O valor a ser salvo (será serializado para JSON).
     * @returns {boolean} - Retorna true se salvou com sucesso, false caso contrário.
     */
    setItem(key, value) {
        // Inicia bloco de tentativa para capturar erros de quota ou permissão
        try {
            // Verifica se a chave é válida (não nula ou vazia)
            if (!key || typeof key !== 'string') {
                // Loga erro de validação no console para depuração
                console.error('StorageAdapter: Chave inválida fornecida.');
                // Retorna false indicando falha na operação
                return false;
            }

            // Serializa o valor para string JSON para permitir salvar objetos complexos
            const serializedValue = JSON.stringify(value);
            
            // Tenta salvar o item no mecanismo de armazenamento configurado
            this.storage.setItem(key, serializedValue);
            
            // Retorna true indicando sucesso total
            return true;
        } catch (error) {
            // Captura erros específicos, como QuotaExceededError
            console.error(`StorageAdapter: Erro ao salvar item "${key}".`, error);
            // Retorna false para que o chamador saiba que a persistência falhou
            return false;
        }
    }

    /**
     * Recupera um valor do armazenamento.
     * @param {string} key - A chave identificadora do dado.
     * @returns {any|null} - Retorna o valor desserializado ou null se não existir/erro.
     */
    getItem(key) {
        // Inicia bloco de tentativa para capturar erros de parsing ou acesso
        try {
            // Tenta obter a string bruta do armazenamento
            const serializedValue = this.storage.getItem(key);

            // Verifica se o valor retornado é nulo (chave não existe)
            if (serializedValue === null) {
                // Retorna null explicitamente
                return null;
            }

            // Tenta fazer o parse do JSON de volta para objeto/valor original
            return JSON.parse(serializedValue);
        } catch (error) {
            // Captura erros de parsing JSON (caso o dado esteja corrompido)
            console.error(`StorageAdapter: Erro ao recuperar item "${key}".`, error);
            // Retorna null como fallback seguro
            return null;
        }
    }

    /**
     * Remove um item específico do armazenamento.
     * @param {string} key - A chave do item a ser removido.
     * @returns {boolean} - True se operação não gerou exceção.
     */
    removeItem(key) {
        // Inicia bloco de tentativa
        try {
            // Executa a remoção do item
            this.storage.removeItem(key);
            // Retorna true indicando que o comando foi executado
            return true;
        } catch (error) {
            // Loga erro caso haja problemas de permissão
            console.error(`StorageAdapter: Erro ao remover item "${key}".`, error);
            // Retorna false indicando falha
            return false;
        }
    }

    /**
     * Verifica se o armazenamento está disponível e funcional.
     * Útil para detectar modo anônimo ou políticas de segurança restritas.
     * @returns {boolean} - True se disponível, false caso contrário.
     */
    isAvailable() {
        // Inicia bloco de tentativa
        try {
            // Define uma chave de teste temporária
            const testKey = '__storage_test__';
            // Tenta salvar a chave de teste
            this.storage.setItem(testKey, testKey);
            // Tenta remover a chave de teste logo em seguida
            this.storage.removeItem(testKey);
            // Se chegou aqui sem erro, o storage está funcional
            return true;
        } catch (e) {
            // Se houve erro (ex: quota excedida, acesso negado), retorna false
            return false;
        }
    }
}
