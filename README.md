# Jasper — Demo navegável

Mockup estático e navegável do **Jasper**, um SaaS de gestão para Clubes de
Desbravadores. É uma vitrine para apresentar a ideia a líderes de clube — **não
é o produto real**: não há backend, todos os dados são fixos e o código é
descartável.

Clube de referência: **Clube Águias Reais** · Secretária logada: **Renata Soares**.

## Como rodar

Basta **abrir o `index.html` no navegador** (duplo clique). Não precisa de
servidor, build, nem instalar nada.

Também funciona no **GitHub Pages**: publique a pasta e a página inicial será o
`index.html`.

## Navegação

- **Menu lateral**: Início, Pessoas, Eventos, Autorizações, Financeiro, Comunicação.
- **Seletor "Vendo como"** (canto superior direito): troca a perspectiva —
  - **Secretário** (padrão): vê tudo (dashboard, pessoas, autorizações, financeiro).
  - **Responsável**: vê o fluxo de assinatura de autorização no celular.
  - **Desbravador**: vê o cartão de especialidades no celular.
  > No produto real isso não existe — a perspectiva vem das permissões no
  > servidor. Aqui é só um artifício de demonstração.

### Telas
- **Dashboard** — "Para resolver" (urgências do dia) e "Visão geral" (big numbers + gráficos).
- **Autorizações** — lista de eventos, detalhe com progresso de assinaturas, e o
  fluxo de **assinatura pelo responsável** no celular (autorizar / não autorizar).
- **Pessoas** — Liderança, Desbravadores e Externos (listas + fichas). A ficha do
  desbravador tem abas Informações / Progresso / Dados sensíveis (com PIN — na
  demo, qualquer 4 dígitos liberam). Há o caso de **líder menor de 18** (Letícia
  Campos) e a **busca reversa de instrutor**.
- **Cartão do desbravador** — área mobile motivadora com jornada de classes e
  especialidades por categoria.

### Deep-links (opcional)
A demo aceita âncoras para abrir direto numa tela, ex.:
`index.html#autorizacao-detalhe`, `index.html#visao-geral`,
`index.html#cartao-desbravador`.

## Estrutura

```
index.html              shell + carrega CSS/JS
css/styles.css          design system (cores, tipografia, componentes)
js/data.js              TODOS os dados de exemplo (consistentes)
js/components.js        ícones (SVG inline) + blocos reaproveitáveis (sidebar, header, cards)
js/screens.js           cada tela como função de render
js/app.js               roteamento por JS + estado do "Vendo como"
prints/                 referência visual (telas desenhadas no Claude Design)
```

## Stack

HTML + CSS + JavaScript puro (vanilla). Sem frameworks, sem build, sem npm. Única
dependência externa: a fonte **Inter** via Google Fonts. Ícones são SVG inline e
os gráficos são SVG/HTML — sem bibliotecas.

> As insígnias dos Desbravadores são representadas de forma **genérica** (círculo
> colorido por categoria + ícone simples); as artes oficiais são registradas e
> não foram reproduzidas.
