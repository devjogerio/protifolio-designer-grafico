/**
 * Configuração do Jest (Framework de Testes)
 * ------------------------------------------
 * Este arquivo define como o Jest deve se comportar ao executar os testes automatizados.
 * Utilizamos a extensão .cjs (CommonJS) porque o projeto está configurado como "type": "module"
 * no package.json, e o Jest ainda opera melhor com módulos CommonJS nativamente em alguns ambientes.
 */

module.exports = {
  // Define o ambiente de teste.
  // 'jsdom': Simula um navegador (DOM) dentro do Node.js. 
  // Essencial para testar manipulação de elementos HTML (document, window) sem abrir um browser real.
  testEnvironment: 'jsdom',

  // Habilita a coleta de cobertura de código (Code Coverage).
  // Isso gera um relatório mostrando quais linhas do seu código foram executadas pelos testes
  // e quais não foram, ajudando a identificar áreas não testadas.
  collectCoverage: true,

  // Define os formatos dos relatórios de cobertura.
  // 'text': Mostra um resumo tabular no próprio terminal após a execução.
  // 'lcov': Gera arquivos HTML detalhados na pasta 'coverage/' para visualização gráfica no navegador.
  coverageReporters: ['text', 'lcov'],

  // Define metas mínimas de cobertura (Quality Gates).
  // Se os testes não cobrirem a porcentagem definida aqui, o comando de teste falhará (exit code 1).
  // Isso é ótimo para CI/CD, garantindo que ninguém suba código sem testes suficientes.
  coverageThreshold: {
    global: {
      branches: 90,   // Exige que 90% dos caminhos de decisão (if/else, switch) sejam testados.
      functions: 90,  // Exige que 90% das funções sejam chamadas pelo menos uma vez nos testes.
      lines: 90,      // Exige que 90% das linhas de código sejam executadas.
      statements: 90  // Exige que 90% das declarações (instruções) sejam executadas.
    }
  },

  // Configuração de transformação (opcional, mas comum em projetos modernos).
  // Se usarmos Babel ou ESBuild, configuraríamos aqui.
  // Como estamos usando Node nativo com ESM experimental ou configurações padrão, o Jest geralmente se vira bem,
  // mas às vezes precisamos de 'transform: {}' para lidar com imports ESM.
  // Neste projeto simples, o padrão funciona.
};
