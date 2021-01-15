# Performance

**Server-Side Rendering (SSR)** é um processo onde as aplicações são pré-processadas no servidor e o conteúdo é servido de forma estática. Normalmente, as aplicações SPA são executadas no navegador e renderizam as páginas no DOM em resposta às ações do usuário. Quando utilizamos as técnicas de SSR, as páginas são geradas e servidas estaticamente em resposta às requisições do navegador no servidor.

Recomenda-se a utilização de SSR por três razões:

* SEO *(Search Engine Optimization)*
* Aumentar a performance em dispositivos móveis e com pouca capacidade de processamento
* Garantir que o primeiro carregamento da página será veloz

Esta seção descreve algumas técnicas de **Server-Side Rendering** que são utilizadas para melhorar a performance de renderização de páginas em aplicações SPA.

## Estrutura da Aplicação

A lista de arquivos específicos da configuração de projetos com server-side rendering pode ser encontrada na seção [Estrutura de Projeto Angular](./ESTRUTURA_PROJETO_MONOREPO.md).

## Angular Universal

As técnicas de SSR em aplicações Angular são viabilizadas através da tecnologia [Angular Universal](https://angular.io/guide/universal). Atualmente, sua engine disponibiliza duas técnicas para isso:

* [Pre-render](./PERFORMANCE_SSR_PRERENDER.md)
* [SSR Dinâmico](./PERFORMANCE_SSR_DINAMICO.md)

Por padrão as aplicações geradas **já vem com o modelo de pre-render configurado** pois esta técnica garante mais performance no primeiro carregamento da página, que é a métrica de performance mais relevante para a experiência de acesso à página.