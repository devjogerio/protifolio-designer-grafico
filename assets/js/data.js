/**
 * Arquivo de Dados (Data Source)
 * ------------------------------
 * Este arquivo atua como um "banco de dados" local para a aplicação frontend.
 * Contém um array de objetos onde cada objeto representa um projeto do portfólio.
 *
 * Estrutura:
 * - Exportamos uma constante 'projectsData' que será importada por 'main.js' e 'project.js'.
 * - Isso centraliza as informações, facilitando a adição, remoção ou edição de projetos
 *   sem precisar mexer no código HTML ou na lógica JavaScript.
 */

export const projectsData = [
    {
        // ID único numérico. Usado na URL (ex: project.html?id=1) para identificar o projeto.
        id: 1,

        // Título principal exibido no card e na página de detalhes.
        title: "Identidade Visual - EcoMarket",

        // Categoria usada para o sistema de filtros na Home.
        // Valores possíveis: 'branding', 'editorial', 'ux-ui', 'social-media'.
        category: "branding",

        // URL da imagem de capa (thumbnail). Usamos imagens do Unsplash para demonstração.
        thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",

        // Descrição resumida que aparece no card da Home. Deve ser curta (até ~100 caracteres).
        shortDescription: "Rebranding completo para uma rede de mercados sustentáveis.",

        // Objeto contendo os detalhes completos para a página interna do projeto.
        details: {
            // O problema ou necessidade do cliente.
            briefing: "A EcoMarket precisava modernizar sua marca para atrair um público mais jovem e consciente, sem perder a essência rústica.",

            // A estratégia visual adotada.
            solution: "Desenvolvemos uma identidade visual baseada em formas orgânicas e uma paleta de cores terrosas vibrantes, aplicável em embalagens e digital.",

            // Os métricas ou sucessos obtidos após o projeto.
            result: "Aumento de 30% no engajamento nas redes sociais e feedback positivo sobre a nova sinalização das lojas.",

            // Array de URLs para a galeria de imagens na página de detalhes.
            images: [
                "https://images.unsplash.com/photo-1606166187734-a44371b6d588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1595246140625-573b715d11dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        id: 2,
        title: "Revista Urban Arts",
        category: "editorial",
        thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        shortDescription: "Diagramação e direção de arte para revista de cultura urbana.",
        details: {
            briefing: "Criar um layout dinâmico que refletisse o caos organizado das grandes cidades para a edição de aniversário.",
            solution: "Uso de grids modulares flexíveis e tipografia experimental para criar ritmo entre as matérias.",
            result: "A edição esgotou em duas semanas e foi premiada pelo design editorial inovador.",
            images: [
                "https://images.unsplash.com/photo-1555431189-0fabf2667795?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        id: 3,
        title: "App Financeiro - FinFlow",
        category: "ux-ui",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        shortDescription: "Design de interface e experiência para aplicativo de gestão financeira.",
        details: {
            briefing: "Simplificar a visualização de gastos complexos para usuários leigos em finanças.",
            solution: "Criação de dashboards intuitivos e uso de cores semânticas para indicar saúde financeira.",
            result: "Redução de 40% nas chamadas de suporte relacionadas a dúvidas de uso.",
            images: [
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        id: 4,
        title: "Café Origem - Embalagem",
        category: "branding",
        thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        shortDescription: "Design de embalagens para linha de cafés especiais.",
        details: {
            briefing: "Destacar a origem única de cada grão através da embalagem, competindo em gôndolas premium.",
            solution: "Ilustrações botânicas específicas de cada região produtora integradas ao rótulo minimalista.",
            result: "Marca reconhecida como 'Best Packaging' em feira local de produtores.",
            images: [
                "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    // Projeto duplicado propositalmente conforme solicitação do usuário para preencher a seção Social Media
    {
        id: 5,
        title: "Campanha Verão - Solare",
        category: "social-media",
        // Caminho relativo para imagem local
        thumbnail: "assets/img/03.jpg",
        shortDescription: "Peças para redes sociais divulgando a nova coleção de óculos.",
        details: {
            briefing: "Gerar buzz e engajamento no Instagram para o lançamento da coleção de verão.",
            solution: "Série de posts animados e stories interativos com estética vibrante e solar.",
            result: "Alcance de 100k contas orgânicas e aumento de 15% nas vendas diretas pelo link da bio.",
            images: [
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    // Duplicatas para compor o grid de 4 cards (solicitação de layout)
    {
        id: 5,
        title: "Campanha Verão - Solare",
        category: "social-media",
        thumbnail: "assets/img/03.jpg",
        shortDescription: "Peças para redes sociais divulgando a nova coleção de óculos.",
        details: {
            briefing: "Gerar buzz e engajamento no Instagram para o lançamento da coleção de verão.",
            solution: "Série de posts animados e stories interativos com estética vibrante e solar.",
            result: "Alcance de 100k contas orgânicas e aumento de 15% nas vendas diretas pelo link da bio.",
            images: [
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        id: 5,
        title: "Campanha Verão - Solare",
        category: "social-media",
        thumbnail: "assets/img/03.jpg",
        shortDescription: "Peças para redes sociais divulgando a nova coleção de óculos.",
        details: {
            briefing: "Gerar buzz e engajamento no Instagram para o lançamento da coleção de verão.",
            solution: "Série de posts animados e stories interativos com estética vibrante e solar.",
            result: "Alcance de 100k contas orgânicas e aumento de 15% nas vendas diretas pelo link da bio.",
            images: [
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        id: 5,
        title: "Campanha Verão - Solare",
        category: "social-media",
        thumbnail: "assets/img/03.jpg",
        shortDescription: "Peças para redes sociais divulgando a nova coleção de óculos.",
        details: {
            briefing: "Gerar buzz e engajamento no Instagram para o lançamento da coleção de verão.",
            solution: "Série de posts animados e stories interativos com estética vibrante e solar.",
            result: "Alcance de 100k contas orgânicas e aumento de 15% nas vendas diretas pelo link da bio.",
            images: [
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    }
];
