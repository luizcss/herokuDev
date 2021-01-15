# Execução da Aplicação

Esta seção descreve práticas recomendadas que visam a otimização do tempo de carregamento da página e o desempenho geral.

- [Utilize a estratégia OnPush](#utilize-a-estratégia-onpush)
- [Sempre use "trackBy" na diretiva "ngFor"](#sempre-use-"trackBy"-na-diretiva-"ngFor")
- [Evite chamar funções nas Views](#evite-chamar-funções-nas-views)
- [Procure sempre utilizar Pipes puros](#procure-sempre-utilizar-pipes-puros)
- [Use RxJS](#use-rxjs)

## Utilize a estratégia OnPush

Por padrão, em cada evento assíncrono, o Angular realiza uma verificação total, executando o ciclo de detecção de alteração para toda a árvore de componentes. Essa verificação pode ser muito pesada para aplicativos de médio a grande porte. É possível pode reduzir drasticamente a detecção de alterações definindo **"ChangeDetectionStrategy"** como **"OnPush"**.

Maiores informações sobre a estratégia de detecção adequada podem ser consultadas no tópico [Estratégias de Dectecção de Alteração](./PERFORMANCE_ESTRATEGIAS_DETECCAO_ALTERACAO.md).

## Sempre use "trackBy" na diretiva "ngFor"

O objetivo do **uso de trackBy** é direcionar o Angular a associar o item de uma coleção a um elemento DOM por uma chave, portanto, quando a coleção é alterada / classificada, os elementos DOM podem ser reutilizados. Por padrão, no uso do ngFor sem trackby, o ngFor rastreia a coleção de objetos alterando a identidade do objeto. Portanto, se uma nova referência de objetos for passada, mesmo que a coleção esteja com os mesmos valores, o Angular não poderá detectá-los, já que estão apresentados no DOM atual. Em vez disso, os elementos antigos serão removidos e a nova coleção com os mesmos valores será redesenhada. Essa recomendação sempre deve ser aplicada, pois há um grande ganho performance quando não é necessário redesenhar a arvore de dados completamente, principalmente quando a aplicação renderiza uma grande quantidade de dados.

### Antes

**track-by.component.html**

```html
<ul>
  <li *ngFor="let item of collection">{{item.id}}</li>
</ul>
<button (click)="getItems()">Atualizar Lista</button>
```

### Depois

**track-by.component.html**

```html
<ul>
  <li *ngFor="let item of collection;trackBy: trackByFn">{{item.id}}</li>
</ul>
<button (click)="getItems()">Atualizar Lista</button>
```

**track-by.component.ts**

```ts
...
 trackByFn(index, item) {
    return item.id;
 }
...
```

## Evite chamar funções nas Views

Uma prática simples para desenvolver seus componentes é evitar chamar funções diretamente da _view_, as mesmas sobrecarregam a fila de verificações de atualização do Angular, que é otimizado para propriedades. Para ilustrar melhor, exemplificaremos o processo com a view abaixo:

```html
<h1>{{ header }}</h1>
<h5>{{ getSubtitle() }}</h5>
```

Exemplo do que acontece quando a detecção de alterações é executada:

```js
if (header !== previousHeader) {
  // do update
}
if (getSubtitle() !== previousSubtitle) {
  // do update
}
```

Toda vez que a detecção de alterações é executada, não podemos simplesmente checar se a legenda mudou. Em vez disso, precisamos chamar a função, antes de podermos executar a verificação. Chamar funções têm sobrecarga e caso muitas sejam implementadas dessa forma, o efeito começará a ser perceptível.

Na maioria dos casos, os valores são atualizados como parte de um evento ou quando uma solicitação http é retornada, portanto, use-os para armazenar o valor mais recente em uma variável.

```ts
export class PerformanceComponent {
  header: string = 'App Header';
  subtitle: string;

  constructor(private clientesService: ClientesService) {
    this.clientesService.getLinhaProduto((tituloProduto) => (this.subtitle = tituloProduto));
  }
}
```

### Getters / Setters

É bastante comum usar **getters/setters** ao escrever componentes. Podem ser bastante úteis, mas, embora você interaja com eles como faria com qualquer outra variável, é importante lembrar que eles também são funções. Portanto, usar um getter na exibição é o mesmo que chamar uma função como mostrado acima. Evite isso, sempre que possível, use uma variável separada para armazenar o valor acessado pela View.

## Procure sempre utilizar Pipes puros

Os pipes do Angular são uma forma de escrever e exibir dados tratados na tela através de uma declaração HTML:

**app.component.html**

```html
<p>Sua conta vence em {{ dataVencimento | date }}</p>
```

No exemplo acima, o valor da variável **dataVencimento** é interpolado através do operador **pipe (|)** com a função **date** declarada à direita. É possível utilizar os pipes do Angular ou criá-los de maneira customizada através de uma declaração parecida com essa:

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  pure: true,
})
export class CpfPipe implements PipeTransform {
  transform() {
    // Código aqui
  }
}
```

Existem duas categorias de pipes: **puros** ou **impuros**. Por padrão, eles sempre são **puros**, isso significa que são executados apenas quando há uma mudança pura no código, isto é, uma alteração em algum valor primitivo de input (String, Number, Boolean, Symbol) ou em algum objeto referenciado (Date, Array, Function, Object). O Angular ignora as alterações em objetos compostos, ou seja, não irá chamar o pipe caso a modificação ocorra ao alterar o input de um mês, adicionar um item a um array, ou atualizar uma propriedade de um objeto. Isso quer dizer que checagem das referências aos objetos é fica mais rápida dessa forma e assim o Angular consegue determinar muito mais rápido se houve alteração e também por essa razão a utilização de pipes puros é recomendada junto à estratégia de detecção de mudanças.

Pipes **impuros** são detectados a cada mudança do componente durante o ciclo de detecção de mudanças e são invocados com tanta frequência quanto um movimento de mouse ou pressionar de teclas. Devem ser utilizados com grande cautela para não destruir a experiência do usuário.

## Use RxJS

RxJS é uma biblioteca para programação reativa utilizando Observables, facilitando a composição de código assíncrono ou baseado em call-back, permitindo o desenvolvedor paralelizar chamadas não bloqueando aplicação, otimizando a lógica do aplicativo e ainda mantendo o código bem estruturado.

Mais detalhes da utilização e boas práticas estão descritas na seção [RxJS](./PERFORMANCE_RXJS.md).
