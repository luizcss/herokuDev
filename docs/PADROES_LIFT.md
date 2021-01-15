# Padrões de Codificação - Princípios de Estruturação de Código

Esta seção contém a descrição de algumas regras importantes para a estruturação do código do projeto (padrão LIFT):

1. ["Localizar"](https://angular.io/guide/styleguide#locate) código da aplicação facilita a manutenibilidade em run-time, diminuindo o time-to-market de trobleshooting.

2. ["Identificar"](https://angular.io/guide/styleguide#identify) intuitivamente módulos da aplicação que devem ser alterados/desenvolvidos facilita o paralelismo no desenvolvimento.

3. A estrutura de projeto deve ser a mais ["Flat"](https://angular.io/guide/styleguide#flat) o possível.

4. Manter padrões tipicamente conhecidos pela comunidade de desenvolvimento facilita a curva de aprendizagem das novas fábricas de desenvolvimento, reduzindo a dependência de suporte do time de arquitetura (["TRY to stick to DRY"](https://angular.io/guide/styleguide#t-dry-try-to-be-dry)- Don’t Repeat Yourself).

5. Cada [módulo](https://angular.io/guide/styleguide#rule-of-one) da aplicação deve conter apenas uma [única responsabilidade](https://angular.io/guide/styleguide#single-responsibility) e ser composto por [funções pequenas](https://angular.io/guide/styleguide#small-functions) para promover o reuso de código, sua legibilidade e manutenção. Códigos desacoplados mitigam riscos de impactos colaterais indesejados, além de reduzir o esforço de troubleshooting e bug fix, melhorando time-to-market.

6. Uma estruturação modular de projeto facilita a [extensibilidade](https://angular.io/guide/styleguide#feature-modules) (inclusão de novas features) fomentando metodologias ágeis e entregas graduais de funcionalidades ao negócio.

7. Código [modularizado](https://angular.io/guide/styleguide#overall-structural-guidelines) fomenta reuso, além de facilitar a gestão de dependências, agilizar os testes unitários e lazy-load aumentando a percepção de melhor performance da aplicação.

8. Criar uma estrutura com [contexto funcional](https://angular.io/guide/styleguide#folders-by-feature-structure) facilita o entendimento da aplicação, sem a necessidade de consulta à documentação técnica.

9. Cada aplicação requer no mínimo um [NgModule raiz](https://angular.io/guide/styleguide#app-root-module).

10. Criar um [módulo para features compartilhadas](https://angular.io/guide/styleguide#shared-feature-module) onde componentes, pipes e diretivas possam ser reusados e referenciados por componentes declarados em outros feature modules.

11. Criar um [módulo para funcionalidades core](https://angular.io/guide/styleguide#core-feature-module) que engloba todas as classes auxiliares e uso único pois ajuda a simplificar a estrutura visual do feature module.

12. [Prevenir a re-importação do Core Module](https://angular.io/guide/styleguide#prevent-re-import-of-the-core-module) para não criar muitas instâncias de recursos singleton.

13. Criar uma estrutura de pastas para o conteúdo que será carregado através de [lazy loading](https://angular.io/guide/styleguide#lazy-loaded-folders) para facilitar encontrar o conteúdo carregado e isolá-lo. Sua estrutura tipicamente é composta por um componente de rotas, seus componentes filhos, assets e módulos relacionados.

14. Nunca [importe diretamente](https://angular.io/guide/styleguide#never-directly-import-lazy-loaded-folders) módulos carregados através de lazy loading. Ao fazer isso o módulo será carregado imediatamente, ao invés de ser sob demanda.

15. Micro aplicações devem definir seus componentes reutilizáveis dentro do projeto da biblioteca, deixando a aplicação principal apenas como agregadora desses módulos. Esses componentes podem conter inclusive um fluxo de páginas que podem ser compartilhados.
