/**
 * Módulo StorageAdapter
 * ---------------------
 * Este módulo atua como um "wrapper" (envelope) para a API de armazenamento do navegador
 * (localStorage ou sessionStorage).
 *
 * Objetivo:
 * - Centralizar o acesso a dados persistentes.
 * - Tratar erros de forma segura (ex: modo anônimo, cota excedida).
 * - Prover métodos utilitários para serialização (JSON) automática.
 */

export default class StorageAdapter {
    /**
     * Construtor da classe.
     * @param {Storage} storageMechanism - O mecanismo a ser usado. Padrão: localStorage.
     * Permitimos a injeção do mecanismo para facilitar testes (mocks) ou trocar para sessionStorage.
     */
    constructor(storageMechanism = localStorage) {
        // Armazena a referência ao mecanismo escolhido (ex: window.localStorage)
        this.storage = storageMechanism;
    }

    /**
     * Salva um valor no armazenamento.
     * @param {string} key - A chave única para identificar o dado.
     * @param {any} value - O dado a ser salvo (objeto, array, string, number).
     * @returns {boolean} - Retorna true se salvou com sucesso, false se houve erro.
     */
    setItem(key, value) {
        // Bloco try-catch para capturar exceções que podem ocorrer ao salvar
        try {
            // Validação defensiva: garante que a chave é uma string válida
            if (!key || typeof key !== 'string') {
                // Log de erro para ajudar o desenvolvedor a identificar chamadas incorretas
                console.error('StorageAdapter: Chave inválida fornecida.');
                return false; // Interrompe a operação
            }

            // Serialização: Converte o valor (objeto JS) para string JSON.
            // O localStorage só aceita strings, então essa conversão é obrigatória.
            const serializedValue = JSON.stringify(value);

            // Tenta efetivamente salvar no navegador
            this.storage.setItem(key, serializedValue);

            // Se chegou aqui, deu tudo certo
            return true;
        } catch (error) {
            // Captura erros como 'QuotaExceededError' (armazenamento cheio)
            // ou erros de permissão (bloqueio de cookies/storage)
            console.error(`StorageAdapter: Erro ao salvar item "${key}".`, error);

            // Retorna false para que a aplicação saiba que o dado não foi persistido
            return false;
        }
    }

    /**
     * Recupera um valor do armazenamento.
     * @param {string} key - A chave do dado que queremos ler.
     * @returns {any|null} - Retorna o dado original (desserializado) ou null se não encontrar.
     */
    getItem(key) {
        // Bloco try-catch para proteger contra erros de leitura ou parsing
        try {
            // Busca o valor bruto (string) no armazenamento
            const serializedValue = this.storage.getItem(key);

            // Se o valor for null, significa que a chave não existe no storage
            if (serializedValue === null) {
                return null; // Retorno explícito de 'nada encontrado'
            }

            // Desserialização: Converte a string JSON de volta para objeto JavaScript real.
            // Isso permite recuperar arrays e objetos prontos para uso.
            return JSON.parse(serializedValue);
        } catch (error) {
            // Se o JSON estiver corrompido ou inválido, o JSON.parse vai falhar.
            // Nesse caso, logamos o erro e retornamos null para não quebrar a aplicação.
            console.error(`StorageAdapter: Erro ao recuperar item "${key}".`, error);
            return null;
        }
    }

    /**
     * Remove um item específico do armazenamento.
     * @param {string} key - A chave do item a ser deletado.
     * @returns {boolean} - True se a operação foi tentada sem erros críticos.
     */
    removeItem(key) {
        try {
            // Chama o método nativo para remover a chave
            this.storage.removeItem(key);
            return true; // Sucesso
        } catch (error) {
            // Captura erros raros de acesso
            console.error(`StorageAdapter: Erro ao remover item "${key}".`, error);
            return false;
        }
    }

    /**
     * Limpa TODO o armazenamento associado a este domínio.
     * Use com cuidado.
     */
    clear() {
        try {
            this.storage.clear();
            return true;
        } catch (error) {
            console.error('StorageAdapter: Erro ao limpar armazenamento.', error);
            return false;
        }
    }

    /**
     * Verifica se o mecanismo de armazenamento está disponível e funcionando.
     * Útil para detectar modo anônimo ou bloqueios de navegador.
     * @returns {boolean}
     */
    isAvailable() {
        try {
            const testKey = '__storage_test__';
            this.storage.setItem(testKey, testKey);
            this.storage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }
}
