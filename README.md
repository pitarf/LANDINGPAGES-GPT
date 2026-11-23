# Landingpages GPT

Dois modelos premium de landing pages, independentes e preparados para personalização assistida por IA.

## Aplicações

| Projeto | Caminho | Direção visual |
| --- | --- | --- |
| Aesthetic Studio (Maison Aura) | \`apps/aesthetic-studio\` | Editorial, orgânico, tons naturais e tipografia serifada |
| Dental Atelier (Atelier Oral) | \`apps/dental-atelier\` | Contemporâneo, clínico sofisticado, azul profundo e tipografia geométrica |

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger, Motion e Lucide.

## Executar localmente

Cada pasta é uma aplicação independente:

\`\`\`bash
cd apps/aesthetic-studio
npm install
npm run dev
\`\`\`

Para a segunda aplicação, use \`apps/dental-atelier\`.

## Personalização antes de publicar

Os nomes, textos, imagens, horários, endereço, redes sociais e contatos usados aqui são conteúdo demonstrativo. Atualize-os com os dados reais do cliente. Substitua o número de WhatsApp de exemplo, valide as imagens/licenças e configure domínio e metadados antes da publicação.

Os serviços odontológicos devem ser revisados pelo responsável técnico e adequados às normas vigentes do conselho profissional. Não foram incluídos preços, promessas de resultado ou depoimentos fictícios.

## Princípios de implementação

- Identidades visuais diferentes, não apenas variações de cor.
- Seções e conteúdo fáceis de localizar e adaptar.
- Responsividade, navegação por teclado e suporte a preferência por movimento reduzido.
- Animações com GSAP/ScrollTrigger e microinterações com Motion, sem depender delas para acessar conteúdo.
- Chamadas para ação destacadas e pontos de contato configuráveis.
- Imagens remotas de demonstração que devem ser substituídas por ativos autorizados do cliente.
