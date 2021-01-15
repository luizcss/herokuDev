# Arquitetura do Framework

- [Módulos](#modulos)
- [Componentes](#componentes)
- [Template](#template)
- [Data Binding](#data-binding)
- [Diretivas](#diretivas)
- [Pipes](#pipes)
- [Services](#services)
- [Injeção de Dependências](#injeção-de-dependências)

## Módulos

O Angular é uma plataforma e framework designada a criação de aplicações HTML utilizando de TypeScript como sua linguagem primária. A ideia por trás do Angular é a modularização, dessa forma suas aplicações são compostas de _NgModules_, também chamados de Angular Modules. Toda aplicação Angular possui no mínimo um NgModule, sendo esse o módulo principal, comumente chamado de _AppModule_ e presente dentro do **app.module.ts**, podendo possuir diversos outros módulos, denominados de feature modules.

Todo módulo possui um decorator **@NgModule** que define as propriedades do módulo em questão, a seguir temos as principais propriedades que esse decorator recebe:

- **declarations** – contêm declarações de classes de view (componentes, diretivas e pipes) referentes ao módulo.
- **imports** – contêm os outros módulos de outras classes exportadas necessárias para templates e componentes desse módulo.
- **providers** – contêm os serviços desse módulo na coleção global de serviços, onde se tornam acessíveis por qualquer parte do código.
- **exports** – conjunto de módulos que serão exportados por esse módulo, ou seja, que estarão acessíveis por outros módulos.
- **bootstrap** – é a principal view da aplicação, sendo restrita apenas a uma única view, dessa forma apenas o root module deve possuir essa propriedade.

Para mais informações, consulte a documentação oficial do Angular sobre módulos:

- [Arquitetura de Módulos](https://angular.io/guide/architecture-modules)
- [Guia sobre NgModules](https://angular.io/guide/ngmodules)
- [API NgModule](https://angular.io/api/core/NgModule)

Segue abaixo exemplos de definições de módulos no Angular:

**app.module.ts**

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClientesModule } from './clientes/clientes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ClientesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**cliente.module.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { ClienteService } from './cliente.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ClienteComponent],
  providers: [ClienteService],
})
export class ClienteModule {}
```

Para a aplicação funcionar é necessário realizar o seu _bootstrap_, o que ocorre no arquivo **main.ts** referenciando um _NgModule_, que é definido na maioria dos casos no **app.module.ts** e por convenção chamado de _AppModule_ como antes mencionado.

**main.ts**

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { ClienteService } from './cliente.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ClienteComponent],
  providers: [ClienteService],
})
export class ClienteModule {}
```

## Componentes

Da mesma forma como nos módulos, cada aplicação possuí no mínimo um componente, normalmente nomeado de **app.component.ts**, sendo esse o componente raiz que será utilizado no DOM do HTML, normalmente pela tag <app-root>.

Todo componente é um objeto que exporta uma classe, possuindo um decorator _@Component_ que define as seguintes propriedades principais:

- **selector** - nome do seletor que será utilizado no template para invocar o componente.
- **templateUrl** - path do arquivo HTML correspondente ao template do componente.
- **styleUrls** - lista de paths dos arquivos de estilo correspondente ao componente.
- **providers** - conjunto de serviços relacionados ao componente que necessitam ser fornecidos pelo injetor de dependências do Angular.

A classe exportada será utilizada quando o selector do componente for utilizado no DOM. A lógica do componente fica contida dentro dessa classe exportada, com seus métodos, variáveis e **lifecycle hooks** do próprio Angular ali declarados, o método **ngOnInit** é um exemplo desses _lifecycle hooks_.

Para mais informações, consulte a documentação oficial do Angular sobre componentes:

- [Arquitetura de Componentes](https://angular.io/guide/architecture-components)
- [API Component](https://angular.io/api/core/Component)

Segue abaixo exemplo de componente no Angular:

**cliente.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  clientes: string[];

  constructor(private service: ClientesService) {}

  ngOnInit() {}
}
```

## Template

O **template** de uma _view_ possui diretivas e marcadores Angular responsáveis por guiar a renderização do componente antes que ele seja exposto na aplicação. Sendo assim, composto dos trechos HTML da _view_ do componente e marcadores Angular que serão apresentados mais adiante.

Como exemplo o componente base criado pelo Angular CLI:

**app.component.html**

```html
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img
    width="300"
    alt="Angular Logo"
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
  />
</div>
<h2>Here are some links to help you start:</h2>
<ul>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
  </li>
  <li>
    <h2>
      <a target="_blank" rel="noopener" href="https://github.com/angular/angular-cli/wiki"
        >CLI Documentation</a
      >
    </h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
  </li>
</ul>

<router-outlet></router-outlet>
```

Para maiores informações sobre Templates, consulte a seção [específica](./ANGULAR_TEMPLATES_DATA_BINDING.md).

## Data Binding

O **data binding** é um recurso fundamental do Angular, possibilitando a troca de informações entre o DOM e seus componentes – e componentes entre si – passando inputs e updates do usuário para a aplicação, de forma simplificada e consistente, reduzindo possíveis erros visto a implementação repetitiva de um recurso inerente a aplicações visuais responsivas.

Existem três tipos de **data binding unidirecional**:

- **interpolação** - passa o valor de uma variável presente na classe do componente para ser inserida no template;
- **propriedade** - passa um valor a ser utilizado em uma propriedade de um elemento do template;
- **evento** - chama o método criado definido na classe exportada pelo componente.

```html
<!-- Interpolação -->
<li>{{cliente}}</li>

<!-- Binding de propriedade -->
<app-client [clientes]="clientes"></app-client>

<!-- Binding de evento-->
<li (click)="selectCliente(cliente)"></li>
```

O **data binding bidirecional** por sua vez combina os _bindings_ de propriedade e evento em uma única notação, usado na diretiva _ngModel_ por exemplo. Esta diretiva quando utilizada emite um _binding_ de evento para a classe do componente e a retorna como _binding_ de propriedade para o template, emulando o data binding bidirecional do AngularJS, atualizando em ambos locais, template – carregado no DOM – e componente ao mesmo tempo.

```html
<input [(ngModel)]="cliente" />
```

O Angular processa todos eventos de binding de uma vez por ciclo de eventos do JavaScript, desde a raiz do componente principal até todos os seus filhos.
Para maiores informações sobre Data Binding, consulte a seção [específica](./ANGULAR_TEMPLATES_DATA_BINDING.md).

## Diretivas

As diretivas no Angular possuem um seletor assim como os componentes, entretando elas são utilizadas na definição de propriedades de elementos existentes no DOM.

Sendo assim separadas em dois tipos:

### Diretivas Estruturais

Assim como sugere o nome, as **diretivas estruturais** modificam a estrutura do DOM, ou seja o seu layout. Isso ocorre no processo de adicionar e remover elementos no DOM, duas diretivas estruturais muito utilizadas são o **\*ngIf** e **\*ngFor** - de funcionalidades equivalentes ao if e for lógicos respectivamente - utilizadas diretamente no template da view.

**cliente.component.html**

```html
<ul *ngIf="clientes.length > 0">
  <li *ngFor="let cliente of clientes">{{cliente}}</li>
</ul>
```

O **\*ngIf** irá mostrar a lista somente se o número de clientes for maior que 0, já o **\*ngFor** irá criar um &lt;li&gt; para cada cliente.

### Diretivas de Atribuição

As **diretivas de atribuição** são utilizadas para se alterar a aparência ou funcionamento de elementos já presentes no DOM, sendo adicionadas como atributos dos elementos no próprio HTML do template.

A _ngModel_ antes mencionada na seção de data-binding é um exemplo de uma diretiva de atribuição importada do **@angular/forms** muito utilizada visto o seu caráter bidirecional, ela possibilita a alteração do conteúdo mostrado no elemento ao mesmo tempo que repassa as mudanças para o seu componente correspondente.

Existem outras diretivas – estruturais e de atribuição – já implementadas no Angular, mas a criação de diretivas customizadas para ambas é possível.

**cliente.component.html**

```html
<input [(ngModel)]="cliente" />
```

## Pipes

**Pipes** alteram a forma como uma informação será exibida na aplicação, algumas pipes já vem implementadas no próprio Angular, como é o caso da **LowerCasePipe** e **UpperCasePipe**, mas é possível criar pipes customizadas, que podem receber ou não parâmetros para regular o resultado final exibido. O uso de pipes pode ser feito de maneira singular ou encadeada, aplicando as mudanças na ordem que as pipes são utilizadas.

**cliente.component.html**

```html
<ul *ngIf="clientes.length > 0">
  <li *ngFor="let cliente of clientes">{{cliente | UpperCasePipe}}</li>
</ul>
```

A lista completa das pipes inclusas no Angular pode ser acessada [aqui](https://angular.io/api?type=pipe).

## Services

**Serviços** assim como componentes possuem uma funcionalidade de processamento, entretanto eles se separam quanto ao motivo de seu processamento. Enquanto o papel de um componente está altamente entrelaçado as necessidades da view que ele gerencia um serviço possui um propósito restrito e bem definido, como por exemplo, fazer o log da aplicação, acessar dados de um servidor remoto, configurar aplicações, entre vários outros.

Os serviços possuem um decorator **@Injectable** que define onde o serviço será injetado na aplicação utilizando da injeção de dependências.

**cliente.service.ts**

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor() {}

  /*...*/
}
```

## Injeção de Dependências

A **injeção de dependências** possibilita o consumo de serviços pelos componentes da aplicação, disponibilizando o acesso às funcionalidades providas pelo serviço ao componente ao qual ele é injetado. Entretanto serviços não são as únicas dependências que um componente pode ter, qualquer classe com o decorator **@Injectable** pode ser considerada uma dependência na criação de um componente.

O processo de injeção de dependências ocorre na criação de um componente, se um componente possuí dependência de um serviço ela estará presente no construtor daquele componente.

**cliente.component.ts**

```ts
constructor(private service: ClientesService) { }
```

Dessa forma o injetor de serviços procura por uma instância do serviço em questão antes de instanciar o componente, caso o serviço não tenha sido instanciado ele cria uma instância para ser passada como argumento na criação do componente, dessa forma garantindo que quando criado o componente terá acesso os serviços que necessita.
