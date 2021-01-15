## Setup de Ambiente

## Ambiente de Execução

O ambiente de execução utilizado para desenvolvimento da aplicação é o NodeJS. A versão base utilizada para o projeto é a **12.13.1**. Recomendamos a instalação da ferramenta [NVM](https://github.com/coreybutler/nvm-windows) para trabalhar durante o desenvolvimento, pois ela permite usar múltiplas versões de node na máquina de desenvolvimento.

### Rodar aplicação local

```ts
npm run start:app
```

#### Como mockar a aplicação

Clonar o projeto [BRK-PORTAL-SERVER](https://innersource.accenture.com/projects/BRKDIG/repos/brk-portal-server/browse) e executar na linha de comando **em modo administrador** os comandos a seguir:

```ts
npm i
grunt debug
```

Caso não possua o **python** instalado na máquina rode o comando abaixo:

```ts
npm i windows-build-tools
```

Caso não possua o **grunt** instalado na máquina rode o comando abaixo:

```ts
npm i -g grunt-cli
```

Em seguida para iniciar o servidor rode:

```ts
npm start
```

Para rodar em **modo debug** basta rodar a aplicação via VS Code clicando em **Run e Debug** + play no item **NodeAPI**.

As configurações de apontamento para o ambiente de desenvolvimento podem ser encontradas em **src/environments/environment.ts**. Para mais informações sobre como criar mocks clique [aqui](./MOCKS.md).

### Rodar aplicação apontando para DES

As configurações de apontamento para o ambiente de desenvolvimento podem ser encontradas em **src/environments/environment.des.ts**.

```ts
npm run start:des
```

### Rodar aplicação apontando para QA

As configurações de apontamento para o ambiente de desenvolvimento podem ser encontradas em **src/environments/environment.qa.ts**.

```ts
npm run start:qa
```

### Build para PRD

As configurações de apontamento para o ambiente de desenvolvimento podem ser encontradas em **src/environments/environment.prod.ts**.

```ts
npm run prerender:build
```
