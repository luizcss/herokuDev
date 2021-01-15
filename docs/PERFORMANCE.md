# Performance

Esta seção descreve configurações, boas práticas e técnicas que otimizem uma aplicação Angular em sua disponibilização, execução e navegação.

* [Execução da Aplicação](#execucao-da-aplicacao)
* [Build da Aplicação](#build-da-aplicacao)
* [Server-Side Rendering](#server-side-rendering)

## Execução da Aplicação

Em uma aplicação Angular de larga escala sempre é necessário aprimorar o aplicativo tanto em termos de padrões de codificação quanto de desempenho. Para isso devemos seguir práticas recomendadas  que visam a otimização do tempo de carregamento da página e o desempenho geral. Nesta seção também falaremos sobre algumas diretrizes gerais de codificação para tornar o aplicativo mais limpo.

Clique [aqui](./PERFORMANCE_EXECUCAO_APLICACAO.md) para mais detalhes.

## Build da Aplicação

Nesta seção falamos sobre práticas para a otimização do tamanho do pacote da aplicação.

Clique [aqui](./PERFORMANCE_BUILD_APLICACAO.md) para mais detalhes.

## Server-Side Rendering

Server-Side Rendering (SSR) é um processo onde as aplicações são pré-processadas no servidor e o conteúdo é servido de forma estática. Normalmente, as aplicações SPA são executadas no navegador e renderizam as páginas no DOM em resposta às ações do usuário. Quando utilizamos as técnicas de SSR, as páginas são geradas e servidas estaticamente em resposta às requisições do navegador no servidor.

Clique [aqui](./PERFORMANCE_SSR.md) para mais detalhes.