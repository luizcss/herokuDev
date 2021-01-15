# Conceitos Angular

Esta seção contempla uma visão geral dos principais conceitos de Angular:

* [Arquitetura do Framework](#arquitetura-do-framework)
* [Navegação e Roteamento](#navegação-e-roteamento)
* [Formulários](#formulários)
* [Templates e Data-Binding](#templates-e-data-binding)

## Arquitetura do Framework

O Angular é um framework e plataforma para construir aplicações SPA em HTML e TypeScript. 

Uma aplicação Angular é basicamente composta por um conjunto de blocos chamados *NgModules*, que proveêm um contexto de compilação para *componentes*. Um app possui sempre, no mínimo, um *módulo raiz* que permite a inicialização da aplicação, e tipicamente muitos *módulos de features*.

* Componentes definem *views*, que são um conjunto de elementos de tela que o Angular pode exibir e manipular de acordo com a lógica de programação e os dados recebidos.
* Componentes utilizam *services*, que são um conjunto de funções que não estão diretamente relacionadas com as *views*. Provedores de serviços podem ser *injetados* em componentes como *dependências*, tornando o código modular, reutilizável e eficiente.

Clique [aqui](./ANGULAR_ARQT_FRAMEWORK.md) para mais detalhes.

## Navegação e Roteamento

Em aplicações SPA, as páginas são acessadas por meio de rotas (URLs) virtuais que apontam para componentes Angular. Os itens desta seção mostram como configurar uma aplicação com diversas páginas utilizando a técnica de Lazy-Load, ou seja, carregamento de arquivos JavaScript sob-demanda.

Clique [aqui](./ANGULAR_NAVEGACAO_ROTEAMENTO.md) para mais detalhes.

## Formulários

O uso de formulários em aplicações web é bastante comum, podendo se tornar muito complexo e gerando bugs tanto de implementação como de perfomance. O Angular fornece duas formas de manipular formulários, sendo que a recomendação da arquitetura é de formulários reativos, pelas seguintes razões:

* Maior controle sobre a criação de campos em formulários (via TypeScript);
* Suporta validações customizadas de forma mais controladas;
* Mantêm o estado dos valores do formulário, trabalhando com Streams (Observables);
* Maior facilidade para criar testes unitários;

Clique [aqui](./ANGULAR_FORMULARIOS.md) para mais detalhes.

## Templates e Data-Binding

Clique [aqui](./ANGULAR_TEMPLATES_DATA_BINDING.md) para mais detalhes.
