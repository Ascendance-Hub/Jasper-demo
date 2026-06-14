# Jasper — Especificação Técnica da Demo (para Claude Code)

> Objetivo: construir um **mockup navegável estático** do Jasper para apresentação a líderes de clube. Código descartável, sem backend, dados fixos. Sobe no GitHub Pages.
> Esta spec é auto-contida. Leia tudo antes de começar.

---

## 1. O que é o Jasper (contexto)

Jasper é um SaaS de gestão para Clubes de Desbravadores (movimento de jovens de 10–15 anos ligado à Igreja Adventista do Sétimo Dia, popular no Brasil). Ajuda a diretoria a administrar pessoas, autorizações de saída, eventos, finanças, e dá uma área para o desbravador ver seu progresso.

Esta demo serve para **apresentar a ideia** a um líder de clube. Não é o produto real — é uma vitrine navegável.

---

## 2. Restrições técnicas (IMPORTANTES)

- **Stack:** HTML + CSS + JavaScript puro (vanilla). NADA de React, Vue, frameworks, ou build step.
- **Sem backend.** Todos os dados são fixos (hardcoded em JS ou direto no HTML).
- **Sem dependências externas pesadas.** Pode usar uma fonte do Google Fonts (Inter) e, se precisar de ícones, uma lib de ícones via CDN (ex.: Lucide via CDN) ou SVGs inline. Para gráficos, use SVG inline ou um `<canvas>` simples — NÃO instale bibliotecas via npm.
- **Tem que rodar abrindo o `index.html` no navegador**, sem servidor. Por isso, navegação entre telas via âncoras/JS, sem rotas de servidor.
- **Deve funcionar no GitHub Pages** (que serve arquivos estáticos). Página inicial = `index.html`.
- **Responsivo:** as telas de desktop e as de celular precisam funcionar bem. Algumas telas são mobile (mostradas dentro de um "frame" de celular), outras são desktop.

---

## 3. Estrutura de arquivos sugerida

```
/
├── index.html              (landing simples + entrada na demo)
├── /css
│   └── styles.css          (design system: cores, tipografia, componentes)
├── /js
│   ├── data.js             (TODOS os dados de exemplo, num só lugar)
│   ├── navigation.js       (troca de telas, seletor de "vendo como")
│   └── components.js        (funções que montam partes repetidas: sidebar, header)
├── /screens
│   ├── dashboard-resolver.html
│   ├── dashboard-visao-geral.html
│   ├── autorizacoes-lista.html
│   ├── autorizacoes-detalhe.html
│   ├── autorizacao-assinatura-mobile.html
│   ├── pessoas-desbravadores.html
│   ├── pessoas-lideranca.html
│   ├── pessoas-externos.html
│   ├── ficha-desbravador.html
│   ├── ficha-lideranca.html
│   ├── ficha-externo.html
│   ├── busca-instrutor.html
│   ├── cartao-desbravador-mobile.html
│   └── ...
└── /assets                 (imagens, logos placeholder)
```

Se for mais simples manter tudo num único `index.html` com as telas como `<section>` que aparecem/somem via JS, **isso é aceitável e até preferível** para uma demo — evita problema de navegação entre arquivos no Pages. Decida pelo que ficar mais limpo, mas priorize: navegação tem que FUNCIONAR ao abrir o index.

---

## 4. Sistema de design

Replica o visual já validado no Claude Design (anexar prints como referência ao rodar).

**Cores:**
- Primária (azul-marinho): `#1B2A4A` a `#243B6B` — sidebar, cabeçalhos, botões primários
- Destaque (dourado/âmbar): `#E0A82E` / `#F5C518` — conquistas, selos positivos, com parcimônia
- Sucesso (verde): `#2E7D5B` — "assinado", "em dia", confiança
- Alerta (vermelho): `#C0392B` — urgências, recusas, atrasos
- Neutros: fundo `#F7F8FA`, texto principal `#111827`, texto secundário `#6B7280`, bordas `#E5E7EB`, branco nos cards

**Tipografia:** Inter (Google Fonts). Títulos pesados, corpo confortável, rótulos pequenos em cinza maiúsculo.

**Forma:** cantos arredondados 8–12px, espaçamento generoso, sombras sutis (não exageradas), ícones de traço simples.

**Tom:** sério e institucional (confiável como banco) + acolhedor e humano (comunidade). EVITAR visual "IA-like": sem gradiente roxo-azul, sem glassmorphism, sem glow neon, sem emoji em títulos, sem sombras flutuantes.

**Layout desktop:** sidebar fixa à esquerda (azul-marinho) com: logo "Clube Águias Reais", navegação (Início, Pessoas, Eventos, Autorizações, Financeiro, Comunicação), e no rodapé o usuário logado ("Renata Soares · Secretária"). Conteúdo à direita.

**Seletor "Vendo como":** no canto superior direito de todas as telas, um seletor com opções Secretário / Responsável / Desbravador. Ao trocar, muda a perspectiva (ver seção 6). É recurso de demonstração.

---

## 5. Telas a construir

Replicar as telas já desenhadas (anexar prints). Lista:

### Dashboard (visão diretoria)
1. **Para resolver** (tela inicial): saudação "Bom dia, Renata!", e blocos por urgência: autorizações urgentes (evento chegando + assinaturas faltando, vermelho/âmbar), frequência em queda (desbravadores que faltaram, âmbar, tom de cuidado — texto "Talvez valha um contato carinhoso", SEM a frase sobre diagnóstico), financeiro (mensalidades em atraso, discreto), eventos próximos, aniversariantes da semana (com botão "enviar parabéns"). Rodapé "Tudo certo por aqui. Bom sábado, Renata."
2. **Visão geral**: toggle no topo entre "Para resolver" e "Visão geral". Big numbers (desbravadores ativos, presença média, especialidades no ano, saldo do mês) + gráficos (frequência ao longo do ano em linha, distribuição por unidade em barras, progresso de classes em barras horizontais, financeiro do mês entradas x saídas). Gráficos em SVG/canvas, paleta sóbria.

### Autorizações
3. **Lista de autorizações** (desktop): eventos com barra de progresso "X de Y assinadas", status colorido, prazo.
4. **Detalhe da autorização** (desktop): resumo "X assinadas / Y pendentes / Z recusadas", abas (Todos/Pendentes/Assinadas/Recusadas), lista de desbravadores com foto, responsável, status, botão reenviar lembrete.
5. **Assinatura mobile** (frame de celular): saudação ao responsável, card do evento, termo, dados do desbravador, botões "Autorizar" / "Não autorizar". Ao autorizar → confirmação por nome/checkbox → tela de sucesso com selo dourado. Fluxo de recusa com motivo opcional → "Recusa registrada".

### Pessoas (três sub-seções: Liderança, Desbravadores, Externos)
6. **Lista de Desbravadores**: busca por nome + agrupador/filtro por unidade (Falcões, Águias, Panteras, Leões, Tigres). Linhas com foto, nome, unidade, idade. Clicar abre a ficha.
7. **Ficha do Desbravador** (3 abas): Informações gerais / Progresso (classes NÃO-lineares — várias em andamento ao mesmo tempo, idade só referência; especialidades com gráfico por categoria e galeria com busca) / Dados sensíveis (protegida por PIN — tela "digite PIN", qualquer 4 dígitos liberam, "acesso liberado nesta sessão / bloquear novamente").
8. **Lista de Liderança**: linhas com foto, nome, papéis em tags (multi-papel normal), contato. Busca + filtro por papel.
9. **Ficha de Liderança** (3 abas, = ficha do desbravador + adicionais): Informações gerais (foco em cargos/papéis, permissões, contato de emergência se 18+, responsáveis se menor) / Progresso (classes e especialidades REGULARES como o desbravador + blocos de liderança: classes Líder/Líder Master/Líder Master Avançado, especialidades que pode instruir) / Dados sensíveis com PIN. Mostrar caso de líder menor de 18 (conselheiro 16-17) com selo "Menor de 18" e aviso de proteção de menor.
10. **Lista de Externos**: linhas com foto, nome, especialidade, selo de confiança ("Atuou em N clubes · M atividades"), última atuação. Botões "Convidar externo" e "Buscar instrutor".
11. **Ficha do Externo**: cabeçalho com contato, especialidades, selos "Reconhecido por N clubes" e "Consentiu em compartilhar histórico", nota "registro de contato — não acessa o sistema". Em destaque: histórico de atuação entre clubes (clube, atividade, papel, data). Botões "Convidar para evento" e "Gerar relatório de comprovação".
12. **Busca reversa de instrutor**: campo "do que você precisa?", filtros, resultados de externos com selo de confiança e botão convidar.

### Área do desbravador (mobile)
13. **Cartão do desbravador** (frame de celular): cabeçalho com foto e resumo de orgulho, jornada de classes (não-linear), especialidades (gráfico por categoria + galeria com busca), botão "compartilhar meu cartão". Tom motivador.

---

## 6. Comportamento do seletor "Vendo como"

- **Secretário** (padrão): vê tudo — dashboard, pessoas, autorizações, financeiro.
- **Responsável**: vê a perspectiva do pai/responsável — foco na assinatura de autorizações (mobile), no(s) filho(s), pagamentos. Esconde gestão interna do clube.
- **Desbravador**: vê só a área do desbravador — o cartão de especialidades, calendário, suas autorizações. Esconde tudo de gestão.

Implementar como um estado em JS que mostra/esconde telas e itens de menu conforme a perspectiva. É só demonstração visual.

> Nota: no produto real isso NÃO existe (a perspectiva vem das permissões no servidor). Aqui é artifício de demo.

---

## 7. Dados de exemplo (CONSISTENTES — usar exatamente estes)

- **Clube:** Clube Águias Reais
- **Secretária logada:** Renata Soares (também Instrutora)
- **Unidades:** Falcões, Águias, Panteras, Leões, Tigres
- **Desbravador de referência:** Lucas Andrade Silva, 12 anos, Unidade Falcões, no clube desde fev/2023. Responsável: Marta Andrade Silva (mãe) e Carlos Andrade Silva (pai). Classe: Pesquisador e Pioneiro em andamento, Amigo e Companheiro concluídas. 15 especialidades, 3 em andamento.
- **Evento de referência:** Acampamento de Inverno 2026, 10 a 13 de julho, Sítio Recanto da Serra — Campos do Jordão/SP, prazo de assinatura 17/06, 30 desbravadores (23 assinadas, 5 pendentes, 2 recusadas).
- **Liderança:** Marcelo Andrade (Diretor), Patrícia Gomes (Diretora associada · Instrutora), Renata Soares (Secretária · Instrutora), Roberto Lima (Tesoureiro), e Letícia Campos (Conselheira associada, 16 anos — exemplo de líder menor).
- **Externo de referência:** Anderson Reis (Primeiros Socorros, Salvamento Aquático, Saúde e Ciência), reconhecido por 4 clubes, com histórico em vários clubes.
- **Categorias de especialidade:** ADRA, Artes e Habilidades Manuais, Atividades Agrícolas, Atividades Missionárias e Comunitárias, Atividades Profissionais, Atividades Recreativas, Ciência e Saúde, Estudos da Natureza, Habilidades Domésticas.

Centralize tudo em `data.js` para garantir consistência entre telas.

---

## 8. O que NÃO fazer

- NÃO usar React, Vue, Angular, ou qualquer framework.
- NÃO criar backend, API, ou banco de dados.
- NÃO usar localStorage/sessionStorage (não é necessário; estado em variável JS basta).
- NÃO instalar pacotes npm. Só CDN para fonte e, se quiser, ícones.
- NÃO reproduzir as artes oficiais das insígnias dos Desbravadores (são registradas) — usar representações genéricas: círculos coloridos pela categoria com ícone simples.
- NÃO usar visual "IA-like" (gradientes roxos, glow, glassmorphism, emoji em títulos).

---

## 9. Entregável

Um conjunto de arquivos estáticos que, ao abrir `index.html` no navegador (ou no GitHub Pages), apresenta a demo navegável completa: dá para circular pelo menu, abrir fichas, ver as autorizações, trocar a perspectiva no "vendo como", e ver as telas mobile dentro de frames de celular. Tudo com os dados de exemplo consistentes.

Comece montando o design system (CSS) e a estrutura de navegação, depois construa as telas uma a uma, reaproveitando componentes (sidebar, header, cards).
