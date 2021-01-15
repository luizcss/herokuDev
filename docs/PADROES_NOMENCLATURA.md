# Padrões de Codificação - Nomenclatura

## Introdução

Seguindo o padrão descrito em [Princípios de Estruturação de Código](./PADROES_LIFT.md) foram definidas regras para manter os projetos padronizados.

## Nomenclatura e organização de pastas e arquivos

### Padrão de nomenclatura de pasta raiz do projeto

Os projetos devem seguir o padrão de nomenclatura definido pelo cliente, caso contrário sugerimos a presente estrutura:

**[sigla-cliente]-[sigla-projeto]-[nome-aplicacao]-[modulo?]-[tipo-aplicacao?]**

Exemplo: acn-arqt-appref-frontend, acn-arqt-angular-lib.

### Padrão de nomenclatura de arquivos

Os arquivos que contém o código-fonte dos componentes da aplicação devem ter seu nome escrito em **caracteres minúsculos, sem acento ou caracteres especiais e utilizando hífen** para separar palavras. Isso é importante para evitar possíveis problemas de nomenclatura entre sistemas operacionais distintos, caso um seja case-sensitive e outro não.

### Padrão de estrutura de organização dos módulos de uma aplicação

Para criação de pastas de módulos, é importante utilizar o princípio de **separação de módulos por seu contexto ou funcionalidade**. Ou seja, deve-se criar pastas de módulos de acordo com suas respectivas funcionalidades, de forma que a organização ao nível de módulos fique clara, ágil e intuitiva.

Para a nomenclatura de arquivo, seguir a tabela abaixo:

| Tipo       | Extensão | Nomenclatura                        | Descrição                                       |
| ---------- | -------- | ----------------------------------- | ----------------------------------------------- |
| Componente | TS       | [name].component.ts                 | Componente                                      |
| UI         | HTML     | [name].component.html               | Elemento de UI do componente                    |
| Estilo     | SASS     | [name].component.scss               | Folha de estilo do componente em SASS           |
| Serviço    | TS       | [name].service.ts                   | Serviço respectivo do componente                |
| Interface  | TS       | [name].model.ts                     | Interface de um objeto                          |
| Pipe       | TS       | [name].pipe.ts                      | Pipe                                            |
| Validator  | TS       | [name].validator.ts                 | Validator                                       |
| Teste      | TS       | [name].component.spec.ts            | Teste unitário do componente                    |
| Teste      | TS       | [name].component.integrated.spec.ts | Teste unitário integrado com outros componentes |
| Barrel     | TS       | index.ts                            | Arquivo organizador de Imports                  |

### Padrão de estrutura de organização interna de cada componente

- Para armazenar os componentes de um módulo, deve-se criar uma pasta separada para esse componente contendo minimamente os arquivos de TypeScript, HTML, SCSS e Teste Unitário. O Angular CLI deve ser usado para criação dos componentes:

```ts
ng generate component <nome-do-componente>
```

- Cada arquivo deve representar apenas um componente. Isso torna o componente mais fácil de ler e testar.
- Componentes compartilhados entre módulos devem ser colocados em uma **pasta "shared"**, nivelado com subpastas para cada tipo de componente.
- O arquivo de teste unitário deve estar localizado na mesma pasta e ter o mesmo nome do arquivo que ele testa, seguido do sufixo “.spec”.
- **Arquivos de teste unitário devem ser colocados lado-a-lado com os arquivos que eles de fato testam** para facilitar a escrita dos testes e a visualização dos arquivos. Essa prática facilita a identificação de componentes que possuem ou não arquivos de teste.
- **Arquivos de teste e2e** devem ser colocados dentro da **pasta e2e**.

### Organização de componentes compartilhados entre diferentes módulos

Componentes compartilhados entre módulos devem ser colocados em uma **pasta "shared"**, nivelado com subpastas para cada tipo de componente.
