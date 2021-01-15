# Navegação e Roteamento

## Configuração do componente raiz (AppComponent)

A maior parte das aplicações possuem conteúdos que são exibidos em todas as páginas (cabeçalho, rodapé, menus) e reservam um espaço para o conteúdo que varia dependendo da página acessada. Segue abaixo um exemplo de template (HTML) do componente principal configurado:

```html
<header>
  ...
</header>
<nav>
  <ul>
    <li><a routerLink="/">Home</a></li>
    <li><a routerLink="/clientes">Clientes</a></li>
    <li><a routerLink="/produtos">Produtos</a></li>
  </ul>
</nav>
<main>
  <router-outlet></router-outlet>
</main>
<footer>
  ...
</footer>
```

O componente **router-outlet** é utilizado para exibir outros componentes dependendo da página acessada, já o componente **routerLink** recebe como parâmetro a URL correspondente ao componente que será instanciado e injetado dentro do espaço ocupado pelo **router-outlet**, utilizando para isso as configurações prévias, indicadas a seguir.

## Configuração de rotas por módulo (lazy-loading)

Para que a aplicação possa determinar quais componentes serão instanciados baseado nas rotas chamadas, é necessário criar um arquivo de configuração no módulo principal da aplicação, esse arquivo já é criado pelo Angular CLI no momento da criação do projeto, se o mesmo for criado com a flag _--routing_.

```ts
ng new aplicacao-exemplo --routing
```

Antes de configurar as rotas é necessário criar os componentes **Home** e **Lista de clientes**, para isso execute os comandos do Angular CLI na pasta raiz do projeto:

```ts
ng generate component home
ng generate module clientes --routing
ng generate component clientes/lista
```

Com os arquivos criados, já é possível configurar as rotas da aplicação editando os arquivos **app-routing.module.ts** e **client-routing.module.ts**:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'clientes',
    loadChildren: () => import('./features/clientes/clientes.module').then((m) => m.ClientesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [{ path: '', component: ListaComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
```

Nos exemplos acima, temos dois tipos de carregamentos de componentes: **normal** e **sob-demanda**. A página principal da aplicação utiliza o **HomeComponent** que já é carregado juntamente com a aplicação, já a listagem de clientes é carregada apenas quando a rota é acessada, pois foi configurada com o atributo **loadChildren** apontando para o módulo de clientes. Essa propriedade recebe uma função que retorna uma promessa usando a sintaxe embutida no navegador para códigos carregados via lazy-loading importados com '_import('...')_'. O caminho é a localização do **ClientesModule** relativa ao módulo raiz da aplicação. Após o código ter sido requisitado e carregado, a promessa resolve um objeto que contém um NgModule, que nesse caso é o _ClientesModule_.

Para que seja possível determinar qual componente será carregado ao instanciar o módulo de clientes, é necessário configurar as rotas específicas do módulo, sendo assim o **ListaComponent** é carregado como padrão.

Ao rodar a aplicação através do comando do Angular CLI ng serve, é possível verificar que foi criado um arquivo chunk chamado **clientes-clientes-module**, correspondente aos componentes do módulo de clientes que será carregado ao acessar a rota "/clientes".

Quando o navegador acessa essa rota, ele utiliza a propriedade _loadChildren_ para carregar dinâmicamente o _ClientesModule_. A partir daí adiciona as rotas contidas no _ClientesModule_ à configuração corrente de rotas. Assim, carrega a rota requisitada ao componente destinado. O lazy-loading e a reconfiguração das rotas acontece apenas uma vez, quando a rota é requisitada pela primeira vez; a partir daí o módulo e as rotas ficam imediatamente disponíveis para as requisições subsequentes.

## Configuração de rotas para micro-aplicações (lazy-load)

Com o conceito de micro-frontend, é possível configurar rotas que apontem para outras aplicações, com isso é necessário configurar as rotas de outra forma. Suponha que o link de menu Produtos aponte para uma outra aplicação (@acn/produtos-app). Para que o carregamento sob-demanda funcione para aplicações externas é necessário criar um módulo wrapper:

```ts
ng generate module produtos-wrapper
```

Após a criação do módulo, é necessário informá-lo quais rotas são acessíveis de dentro do módulo através do módulo **forChild**:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosAppModule, routes } from '@acn/produtos-app';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ProdutosAppModule, RouterModule.forChild(routes)],
  declarations: [],
})
export class ProdutosWrapperModule {}
```

A seguir é necessário incluir a rota de produtos na lista de rotas principais da aplicação:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'clientes',
    loadChildren: () => import('./features/clientes/clientes.module').then((m) => m.ClientesModule),
  },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./features/produtos-wrapper/produtos-wrapper.module').then(
        (m) => m.ProdutosWrapperModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

De dentro da aplicação de produtos é necessário indicar que as rotas serão expostas através do método **forChild** ao invés de **forRoot**:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [{ path: '', component: ListaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosRoutingModule {}
```

## Referências

- [Angular - Router](https://angular.io/guide/router)
