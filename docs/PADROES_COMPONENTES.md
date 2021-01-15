# Padrões de Codificação - Componentes Smart e de Apresentação

Esta seção contém a descrição de algumas regras importantes para a estruturação de Componentes quando utilizar um projeto com **gerenciamento de estados e Angular**:

## Componentes Smart

- São responsáveis pelas **actions**. Se um componente de apresentação precisar disparar uma action, ele deve emitir um evento para que o componente smart possa fazer a execução do disparo.
- Não possuem CSS próprio.
- Raramente fazer parte do DOM. Eles encapsulam os componentes de apresentação, que tratam dos elementos do DOM.

## Componentes de Apresentação

- Não dependem diretamente dos arquivos de **action**, uma vez que suas notificações são emitidas via evento. Isso os torna reutilizáveis em diferentes aplicações que possuam outra lógica.
- Contém a implementação visual da aplicação.

## Referências

- [Dan Abramov - Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
