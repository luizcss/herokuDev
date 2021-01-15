# Estrutura de Projeto - Angular

A aplicação base é composta de outras micro aplicações Angular, sendo essas modularizadas e independentes, importadas para a aplicação base, a seguir estão listados os artefatos criados para ambas aplicações, base e micro aplicação, ao se utilizar do Angular CLI.

- [Raiz do Projeto](#raiz-do-projeto)
- [Estrutura Aplicação Base](#estrutura-aplicação)
- [Estrutura Biblioteca](#estrutura-biblioteca)

## Raiz do Projeto

- **src:** contém os arquivos fonte das aplicação base
- **projects:** contém os arquivos fonte das bibliotecas / micro-aplicaçãoes existentes associadas ao projeto
- **node_modules:** contém as dependências do projeto, as demais aplicações micro-frontend dependentes serão armazenadas nesse diretório da aplicação base
- **dist:** diretório criado ao executar o build, possui a versão distribuível da aplicação
- **coverage:** diretório criado ao executar os testes unitários com a opção de gerar relatório, contém o relatorio de cobertura do código
- **docs:** diretório que contém qualquer documentação relevante não atrelada específicamente ao código do projeto
- **.editorconfig:** padroniza configurações de estilo de código entre editores
- **.gitignore:** estabelece quais arquivos não serão versionados pelo git
- **.angulardoc.json:** arquivo de configuração da documentação do código do projeto
- **.htmlhintrc:** arquivo de configuração da análise estática de arquivos html
- **.prettierrc:** arquivo de configuração da análise estática de arquivos json
- **.stylelintrc:** arquivo de configuração da análise estática de arquivos css
- **.versionrc:** arquivo de configuração da análise estática de versionamento de código
- **.vscode:** pasta com as configurações para a execução do projeto em tempo de desenvolvimento
- **packages:** pasta que contém bibliotecas externas desenvolvidas em outros repositórios
- **universal:** contém os arquivos para utilização de [server-side rendering](./SSR.md).
- **e2e:** contém o conjunto de testes end to end da aplicação
- **angular.json:** possui a configuração dos projetos Angular presentes no workspace
- **package.json:** define a lista de dependências, no caso da aplicação base contém as micro aplicações utilizadas
- **package-lock.json:** arquivo suporte a árvore de dependências do package.json
- **babel.config.js:** arquivo de configuração do transpilador de código javascript
- **jest.base.setup.ts:** arquivo de inicialização do jest, engine de testes unitários
- **jest.config.js:** arquivo de configuração global dos testes unitários
- **jest.lib.config.js:** arquivo de configuração global dos testes unitários
- **scss-bundle.config.js:** arquivo de configuração do módulo de estilos do projeto
- **transloco.config.js:** arquivo de configuração do módulo de internacionalização (i18n)
- **tsconfig.json:** configuração do TypeScript global do projeto
- **tslint.json:** contém a configuração global dos filtros que serão utilizados na análise estática do código
- **ngsw-config.json:** arquivo de configuração de service-workers
- **sonar-project.properties:** arquivo de configurações do projeto no sonar utilizado na análise estática do código
- **README.md:** contém instruções básicas de como utilizar o projeto presente no repositório

## Estrutura Aplicação Base

### Pasta **e2e/**

- **protractor.conf.js:** configuração para os testes end to end do framework Protractor
- **tsconfig.e2e.json:** configuração para a compilação dos testes end to end
- **src:** contém os testes escritos pelo desenvolvedor

### Pasta **src/**

- **app:** contém os módulos, componentes e serviços da aplicação, o html do componente app-root da aplicação, junto do NgModule responsável pelo bootstrap da aplicação
- **assets:** contém imagens utilizadas na aplicação, junto de fontes, estilos e entradas de i18n
- **environments:** contém arquivos que definem variáveis para o build da aplicação, tanto para ambiente local como para produtivo
- **config:** diretório de configurações de componentes externos da aplicação
- **index.html:** UI central da aplicação, utiliza a tag app-root
- **styles.scss:** arquivo de entrada de estilo global da aplicação
- **main.ts:** define o módulo a ser utilizado pelo bootstrap da aplicação no lado do navegador
- **favicon.ico:** ícone exibido na aba do browser
- **browserslist:** contém configurações definidas para browsers específicos
- **polyfills.ts:** configuração de compatibilidade dos browsers
- **main.browser.ts:** define o módulo a ser utilizado pelo bootstrap da aplicação no lado do navegador
- **main.server.ts:** define o módulo a ser utilizado pelo bootstrap da aplicação no lado do servidor
- **tslint.json:** contém os filtros que serão utilizados para a análise estática do código, importa os demais filtros do arquivo de mesmo nome presente no diretório da aplicação
- **tsconfig.app.json:** configurações para a compilação do código TypeScript do app para desenvolvimento
- **tsconfig.server.json:** arquivo de configuração do compilador do módulo do servidor, utilizado quando há server-side rendering.
- **tsconfig.prod.json:** configurações para a compilação do código TypeScript do app para produção
- **tsconfig.spec.json:** configurações para a compilação do código TypeScript dos testes unitários
- **manifest.json:** arquivo de configuração de comportamento mobile

### Pasta **src/app/**

- **core:** diretório que contém singletons, componentes e serviços globais utilizados para instanciar a aplicação
- **features:** diretório que contém os módulos utilizados na aplicação (são elegíveis a virarem uma micro aplicação)
- **shared:** diretório que contém componentes utilizados por mais de um módulo da aplicação (são elegíveis a virarem uma lib)
- **shell:** diretório que contém os componentes com o esqueleto de layout da aplicação (header, sidebar e footer)
- **store:** diretório que contém states, actions, e facades quando a aplicação está estruturada com gerenciamento de estados
- **app-routing.module.ts:** Arquivo gerenciador de rotas da aplicação
- **app.component.ts:** componente da tag app-root
- **app.component.html:** UI do componente principal
- **app.component.spec.ts:** testes unitários do componente principal
- **app.module.ts:** módulo principal da aplicação
- **app-browser.module.ts:** arquivo que contém a configuração dos componentes e módulos a serem renderizados pelo navegador (client-side rendering - CSR).
- **app-server.module.ts:** arquivo que contém a configuração dos componentes e módulos a serem renderizados pelo servidor node.js na execução da técnica de [SSR Dinâmico](./PERFORMANCE_SSR_DINAMICO.md).

### Pasta **universal/**

- **prerender.ts:** script que [pre-renderiza](./PERFORMANCE_SSR_PRERENDER.md) as páginas.
- **static.path.ts:** arquivo de configuração das páginas que serão pré-renderizadas.
- **server.ts:** servidor node.js utilizado como middleware para execução da técnica de [SSR Dinâmico](./PERFORMANCE_SSR_DINAMICO.md).
- **webpack.server.config.js:** arquivo com as configurações utilizadas pelo webpack para buildar o servidor node.js.

## Estrutura Biblioteca

Dentro da pasta **projects/sigla-lib/** podem existir múltiplos projetos, mas todos devem possuir a estrutura descrita a seguir:

### Pasta **biblioteca/src/lib/**

- **src:** contém os arquivos fonte da biblioteca
- **jest.config.json:** arquivo de configuração dos testes unitários específicos para a aplicação
- **package.json:** define a lista de dependências, no caso da aplicação base contém as micro aplicações utilizadas
- **ng-package.json:** direciona o arquivo de entrada da lib (public_api.ts) junto de configurações
- **tsconfig.lib.json:** configuração do TypeScript específica para a biblioteca
- **tsconfig.spec.json:** configuração do TypeScript específica do compilador de testes para a biblioteca
- **tslint.json:** contém a configuração dos filtros específicos para a aplicação que serão utilizados na análise estática do código
- **README.md:** contém instruções básicas de como utilizar o projeto presente no repositório
- **public-api.ts:** direcionamentos da api da biblioteca
- **index.ts:** arquivo barrel
