# Templates e Data Binding

- [Exibindo Dados](#exibindo-dados)
- [Sintaxe do Template](#sintaxe-do-template)
- [Lifecycle Hooks](#lifecycle-hooks)
- [Diretivas de Atributo](#diretivas-de-atributo)
- [Diretivas Estruturais](#diretivas-estruturais)
- [Pipes](#pipes)

## Exibindo Dados

As aplicações Angular podem vincular controles em um template HTML à propriedades de um componente.

### Inline Template

**page-not-found.component.ts**

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  template: `
    <section class="title-headline">
      <h2 class="title">Página não encontrada</h2>
      <p class="description">
        A página solicitada não foi encontrada: <span appHighlight>{{ rota }}</span>
      </p>
    </section>
  `,
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  rota: string = undefined;
  urlSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.urlSubscription = this.route.url.subscribe((url) => (this.rota = url[0].path));
  }

  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe();
  }
}
```

### Template Externo

O template pode estar contido no componente ou pertencer à um arquivo HTML separado. Nesse caso ao invés de usarmos o seletor template usamos o seletor templateUrl e passamos o endereço relativo do arquivo:

**home.component.html**

```html
<section class="title-headline">
  <h2 class="title">Aplicação de Referência</h2>
  <p class="description">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </p>
</section>
```

**home.component.ts**

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
```

A recomendação é sempre utilizar Templates externos para facilitar a manutenção e coesão dos componentes gerados.

### Exibindo items de um array com \*ngFor

Para mostrar todos os items de um array, utilizamos a diretiva estrutural **\*ngFor**:

**cadastro.component.html**

```html
<select class="form-control" id="estadoCivil" name="estadoCivil" formControlName="estadoCivil">
  <option *ngFor="let item of estadosCivis | async" [value]="item.nome">{{ item.nome }}</option>
</select>
```

### Exibição condicional com \*ngIf

Caso queira exibir um conteúdo apenas em algumas condições, podemos usar a diretiva estrutural **\*ngIf**:

**cadastro.component.html**

```html
<div class="has-error" *ngIf="frmCliente.invalid && frmCliente.dirty">
  <p>Favor corrigir os campos inválidos</p>
</div>
```

## Sintaxe do Template

### HTML no Template

A linguagem do template é HTML, a maioria dos elemento são aplicáveis com exceção de:

- `<script>` (para evitar ataques de injeção);
- `<body>`, `<html>` e `<base>` que não tem usabilidade efetiva.

Além disso, utilizamos os elementos criados nos componentes e diretivas, aplicando o nome do seletor.

Segue abaixo um exemplo de utilização do componente **AcnNavbar** do **@acn/ui**:

**app.component.html**

```html
<acn-navbar [settings]="arqtHeaderConfig"></acn-navbar>
```

### Interpolation ({{...}})

Usamos interpolação para vincular objetos do componente dentro do texto entre tags HTML e atribuição de propriedades.
O Angular vai processar a expressão e retornar seu valor como string.

**lista.component.html**

```html
<tr class="table-row" *ngFor="let item of clientes | async">
  <td class="td-item">{{ item.id }}</td>
</tr>
```

### Template Expressions

Uma expressão de template produz um valor e o atribui esse valor à propriedade a que está vinculado.

Essas expressões são escritas de forma muito similar à JavaScript. Muitas expressões JavaScript são aceitas, mas não todas, expressões que contém ou geram efeitos colaterais são **proibidas**, incluindo:

- atribuições (=, +=, -=, ...)
- new
- expressions encadeadas com **;** ou **,**
- operações incrementais e decrementais (++ and --)

Outras diferenças notáveis em relação ao JavaScript são:

- não há suporte para os operadores lógicos | e &
- novas expressões de template, como |, ?. e !.

Operadores && e || continuam sendo suportados porém não são recomendados pois adicionam lógica no template quando a mesma deveria ser escrita no componente

### Statement Expressions

Uma expressão de declaração responde a um evento criado por um alvo vinculativo, como um elemento, componente ou diretiva.

**lista.component.html**

```html
<button (click)="excluir(item.id)">Excluir</button>
```

Esses eventos tem efeitos colaterais.
Assim como Template Expressions, a linguagem se assemelha muito à JavaScript, porém algumas expressões são **proibidas**:

- new
- operações incrementais e decrementais (++ and --)
- operadores de atribuição, como += e -=

## Lifecycle Hooks

Componentes possuem um ciclo de vida gerenciado pelo Angular disponibilizado através de implementação de interfaces, alguns exemplos são _OnInit_, _OnChanges_ ou _OnDestroy_.

Durante o processo de construção das páginas o Angular cria e renderiza o componente, cria e renderiza seus componentes internos (filhos), verifica-o quando suas propriedades vinculadas a dados mudam e o destrói antes de removê-lo do DOM.

Os lifecycle hooks proporcionam visibilidade sobre esses momentos chave do componente e a capacidade de agir quando ocorrem.

Para executar uma ação no inicio do ciclo de vida do componente, por exemplo, podemos usar o método _OnInit_:

**clientes.component.ts**

```ts
export class ClientesComponent implements OnInit {
  title: string;

  ngOnInit() {
    this.title = 'Clientes';
  }
}
```

Clique [aqui](https://angular.io/guide/lifecycle-hooks) para acessar a documentação oficial do Angular e ver todos os lifecycle hooks disponíveis.

## Diretivas de Atributo

**Diretivas de atributos** mudam a aparência ou o comportamento de um elemento do DOM.

### Criando uma diretiva de atributo

**highlight.directive.ts**

```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

### Utilizando uma diretiva de atributo

**page-not-found.component.html**

```html
<p class="description">A página solicitda não foi encontrada: <span appHighlight>{{rota}}</span></p>
```

Para mais informações acesse a [documentação oficial](https://angular.io/guide/attribute-directives).

## Diretivas Estruturais

**Diretivas estruturais** são responsáveis pelo layout do HTML. Eles formam a estrutura do DOM ao adicionar, remover ou manipular seus elementos.
**NgFor**, **NgIf** e **NgSwitch** são exemplos de diretivas estruturais do Angular.

### Criando uma diretiva estrutural

**has-content-access.directive.ts**

```ts
import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appHasContentAccess]',
})
export class HasContentAccessDirective {
  private hasView = false;

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  @Input() set appHasContentAccess(login: string) {
    if (/^[P-p]\d+(\.)\d+$/.test(login) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

### Utilizando uma diretiva estrutural

**cadastro.component.html**

```html
<div class="success" *appHasContentAccess="login">
  Conteúdo exclusivo para usuário com login no formato P[numero].[numero]
</div>
```

As diretivas estruturais padrões do Angular já atendem a maior parte dos requisitos das aplicações, por esse motivo é necessário avaliar muito bem a criação de uma diretiva customizada.

## Pipes

Um **pipe** recebe um dado e o retorna no formato desejado.

**lista.component.html**

```html
<td class="td-item">{{ item.dataNascimento | date:'dd/MM/yyyy' }}</td>
```

Maiores informações sobre pipes, consulte a seção de [Arquitetura do Framework](./ANGULAR_ARQT_FRAMEWORK.md).
