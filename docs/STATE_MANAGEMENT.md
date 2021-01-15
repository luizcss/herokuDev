# State Management

Esta seção contempla uma visão geral dos principais conceitos de gerenciamento de estados.

## O que é State Management ?

É uma abordagem de programação volta para controlar o fluxos de dados de uma aplicação. Ela deve ser utilizada quando o sistema possui muitos componentes acessando e modificando os mesmos modelos de dados por diversos lugares diferentes.

## Vantagens e Desvantagens

### Vantagens

- Separar as operações que leem dados de operações que atualizam dados usando interfaces separadas. Isso pode maximizar o desempenho, escalabilidade e segurança.
- Suporta a evolução do sistema ao longo do tempo através de maior flexibilidade.
- Evita que comandos de atualização provoquem conflitos de mesclagem no nível de domínio.

### Desvantagens

- **Complexidade:** A ideia básica é simples, mas poderá resultar em um design de aplicativo mais complexo.
- **Mensagens:** Embora não haja a necessidade, é comum usar mensagens para comandos de processo e publicar eventos de atualização. Neste caso, o aplicativo deve tratar as falhas de mensagem ou as mensagens duplicadas.

## Quando utilizar ?

Considere gerenciamento de estados para os seguintes cenários:

- Domínios colaborativos em que muitos usuários acessam os mesmos dados em paralelo. O gerenciamento de estados permite que você defina comandos com granularidade suficiente para minimizar os conflitos de mesclagem no nível de domínio, e os conflitos que surgem podem ser mesclados pelo comando.
- Interfaces de usuário baseadas em tarefas, onde os usuários são guiados por um processo complexo como uma série de etapas ou com modelos de domínio complexos. O modelo de gravação tem uma stack completa de processamento de comandos com lógica de negócios, validação de entrada e validação de negócios. O modelo de gravação pode tratar um conjunto de objetos associados como uma única unidade para alterações de dados e garantir que esses objetos estejam sempre em um estado consistente. O modelo de leitura não tem nenhuma lógica de negócios ou stack de validação e apenas retorna um DTO para uso em um modelo de exibição. O modelo de leitura é, eventualmente, consistente com o modelo de gravação.
- Cenários em que o desempenho de leituras de dados deve ser ajustado separadamente do desempenho de gravações de dados, especialmente quando o número de leituras é muito maior do que o número de gravações.
- Cenários onde uma equipe de desenvolvedores pode se concentrar no modelo de domínio complexo que faz parte do modelo de gravação e outra equipe pode se concentrar no modelo de leitura e nas interfaces de usuário.
- Cenários onde o sistema deve evoluir ao longo do tempo e pode conter várias versões do modelo, ou onde as regras de negócio mudam regularmente.
- Integração com outros sistemas, especialmente em combinação com _event sourcing_, onde a falha temporal de um subsistema não deve afetar a disponibilidade dos outros.

Esse padrão **não é recomendado** quando:

- O domínio ou as regras de negócio são simples.
- Uma interface do usuário simples como um CRUD e operações de acesso a dados são suficientes.

## Próximos Passos

- [Biblioteca NGXS](./STATE_MANAGEMENT_NGXS.md)
- [Boas Práticas de implementação](./STATE_MANAGEMENT_BOAS_PRATICAS.md)
