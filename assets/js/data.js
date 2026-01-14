/**
 * Arquivo de dados dos projetos.
 * Contém as informações de todos os projetos exibidos no portfólio.
 * Exporta a constante para uso em outros módulos.
 */

export const projectsData = [
    {
        // Identificador único do projeto
        id: 1,
        // Título do projeto
        title: "Identidade Visual - EcoMarket",
        // Categoria do projeto (usada para filtros)
        category: "branding",
        // Caminho da imagem de thumbnail (Unsplash)
        thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Descrição curta para o card
        shortDescription: "Rebranding completo para uma rede de mercados sustentáveis.",
        // Detalhes completos do projeto
        details: {
            // O desafio/briefing do cliente
            briefing: "A EcoMarket precisava modernizar sua marca para atrair um público mais jovem e consciente, sem perder a essência rústica.",
            // A solução desenvolvida pelo designer
            solution: "Desenvolvemos uma identidade visual baseada em formas orgânicas e uma paleta de cores terrosas vibrantes, aplicável em embalagens e digital.",
            // O resultado alcançado
            result: "Aumento de 30% no engajamento nas redes sociais e feedback positivo sobre a nova sinalização das lojas.",
            // Imagens adicionais do projeto (Unsplash)
            images: [
                "https://images.unsplash.com/photo-1606166187734-a44371b6d588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1595246140625-573b715d11dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        // Identificador único do projeto
        id: 2,
        // Título do projeto
        title: "Revista Urban Arts",
        // Categoria do projeto
        category: "editorial",
        // Imagem de thumbnail
        thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Descrição curta
        shortDescription: "Diagramação e direção de arte para revista de cultura urbana.",
        // Detalhes do projeto
        details: {
            // Briefing
            briefing: "Criar um layout dinâmico que refletisse o caos organizado das grandes cidades para a edição de aniversário.",
            // Solução
            solution: "Uso de grids modulares flexíveis e tipografia experimental para criar ritmo entre as matérias.",
            // Resultado
            result: "A edição esgotou em duas semanas e foi premiada pelo design editorial inovador.",
            // Imagens do projeto
            images: [
                "https://images.unsplash.com/photo-1555431189-0fabf2667795?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        // Identificador único do projeto
        id: 3,
        // Título do projeto
        title: "App Financeiro - FinFlow",
        // Categoria do projeto
        category: "ux-ui",
        // Imagem de thumbnail
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Descrição curta
        shortDescription: "Design de interface e experiência para aplicativo de gestão financeira.",
        // Detalhes do projeto
        details: {
            // Briefing
            briefing: "Simplificar a visualização de gastos complexos para usuários leigos em finanças.",
            // Solução
            solution: "Criação de dashboards intuitivos e uso de cores semânticas para indicar saúde financeira.",
            // Resultado
            result: "Redução de 40% nas chamadas de suporte relacionadas a dúvidas de uso.",
            // Imagens do projeto
            images: [
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        // Identificador único do projeto
        id: 4,
        // Título do projeto
        title: "Café Origem - Embalagem",
        // Categoria do projeto
        category: "branding",
        // Imagem de thumbnail
        thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Descrição curta
        shortDescription: "Design de embalagens para linha de cafés especiais.",
        // Detalhes do projeto
        details: {
            // Briefing
            briefing: "Destacar a origem única de cada grão através da embalagem, competindo em gôndolas premium.",
            // Solução
            solution: "Ilustrações botânicas específicas de cada região produtora integradas ao rótulo minimalista.",
            // Resultado
            result: "Marca reconhecida como 'Best Packaging' em feira local de produtores.",
            // Imagens do projeto
            images: [
                "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        // Identificador único do projeto
        id: 5,
        // Título do projeto
        title: "Campanha Verão - Solare",
        // Categoria do projeto
        category: "social-media",
        // Imagem de thumbnail
        thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Descrição curta
        shortDescription: "Peças para redes sociais divulgando a nova coleção de óculos.",
        // Detalhes do projeto
        details: {
            // Briefing
            briefing: "Gerar buzz e engajamento no Instagram para o lançamento da coleção de verão.",
            // Solução
            solution: "Série de posts animados e stories interativos com estética vibrante e solar.",
            // Resultado
            result: "Alcance de 100k contas orgânicas e aumento de 15% nas vendas diretas pelo link da bio.",
            // Imagens do projeto
            images: [
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    },
    {
        // Identificador único do projeto
        id: 6,
        // Título do projeto
        title: "Festival de Jazz - Poster",
        // Categoria do projeto
        category: "ilustracao",
        // Imagem de thumbnail
        thumbnail: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // Descrição curta
        shortDescription: "Ilustração e design de poster para festival de música local.",
        // Detalhes do projeto
        details: {
            // Briefing
            briefing: "Criar uma imagem icônica que representasse a fusão do jazz clássico com ritmos modernos.",
            // Solução
            solution: "Ilustração vetorial abstrata combinando instrumentos de sopro e formas geométricas.",
            // Resultado
            result: "O poster se tornou item de colecionador e foi a base para toda a identidade do evento.",
            // Imagens do projeto
            images: [
                "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    }
];
