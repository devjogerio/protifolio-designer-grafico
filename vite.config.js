import { defineConfig } from 'vite'; // Importa a função defineConfig do Vite para obter intellisense na configuração
import { resolve } from 'path'; // Importa o módulo resolve do Node.js para lidar com caminhos de arquivos de forma segura

// Exporta a configuração padrão do Vite
export default defineConfig({
    // Define o caminho base para o deploy. './' garante que os caminhos dos assets sejam relativos,
    // o que é essencial para que o site funcione corretamente no GitHub Pages ou em qualquer subdiretório.
    base: './',

    // Configurações específicas para o processo de build (construção para produção)
    build: {
        // Define o diretório de saída para os arquivos compilados. 'dist' é o padrão da indústria.
        outDir: 'dist',

        // Configurações para o Rollup, o bundler que o Vite usa internamente para produção
        rollupOptions: {
            // Define os pontos de entrada da aplicação (input).
            // Como temos múltiplas páginas HTML, precisamos listar todas elas aqui.
            input: {
                // O ponto de entrada principal (Home)
                main: resolve(__dirname, 'index.html'),
                // O ponto de entrada para a página de detalhes do projeto
                project: resolve(__dirname, 'project.html'),
            },
        },

        // Configura a minificação do código. 'esbuild' é rápido e eficiente.
        // Isso remove espaços em branco e renomeia variáveis para reduzir o tamanho dos arquivos.
        minify: 'esbuild',

        // Garante que o diretório de saída seja limpo antes de cada build
        // para evitar arquivos antigos ou desnecessários.
        emptyOutDir: true,
    },

    // Configurações para o servidor de desenvolvimento local
    server: {
        // Abre o navegador automaticamente quando o servidor iniciar
        open: true,
        // Define a porta do servidor local
        port: 3000,
    }
});
