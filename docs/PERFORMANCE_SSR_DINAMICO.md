# Performance - SSR : Server-Side Render Dinâmico

* [Introdução](#introducao)
* [Como funciona](#como-funciona)
* [Quando utilizar esta técnica](#quando-utilizar-esta-tecnica)
* [Como configurar uma rota dinâmica](#como-configurar-uma-rota-dinamica)

## Introdução

Esta seção tem como objetivo detalhar o uso da técnica de **SSR Dinâmico** na presente arquitetura.

## Como funciona

Nesta abordagem, as páginas são geradas dinamicamente a partir de um servidor **node.js** no momento em que o navegador faz uma requisição. Esse servidor funciona como uma camada entre o navegador e as APIs consultadas que devolve ao cliente o conteúdo da página já em formato estático pronto para ser exibido. 

O servidor simula um navegador, mas não tem acesso aos objetos de navegação, como Window, Navigator, Location. Para que o código continue funcionando normalmente é necessário acrescentar uma validação específica que permite que aquela parte de código seja rodada apenas quando estiver no navegador:

**app.component.ts**
```ts
(...)

if (isPlatformBrowser(this._plataformId))

(...)
```

A decisão de utilizar SSR dinâmico deve ser bem planejada pois todas as partes que invocam objetos do navegador, inclusive bibliotecas de terceiros, precisam estar mapeadas dentro da validação de **isPlatformBrowser**, caso contrário o código irá quebrar.

Para buildar o projeto com essa técnica em aplicações **geradas a partir do gerador de aplicações** basta executar o comando:

```
npm run universal:build:prod
```

Para **servir** o projeto gerado:

```
npm run ssr:server
```

## Quando utilizar esta técnica

* A aplicação e suas rotas são bastante dinâmicas.
* Em rotas que dependem de autenticação e autorização (área fechada).
* A aplicação possui dados dinâmicos que são alterados com frequência a cada renderização (ex.lista de produtos).
* A estrutura de render da aplicação é baseada em arquivos JSON ou em tags de CMS onde o conteúdo pode ser modificado a qualquer momento.

## Como configurar uma rota dinâmica

Para aplicações geradas a partir do gerador de aplicações a configuração é transparente. Basta incluir as chamadas aos módulos da aplicação dentro das rotas filhas do [módulo Shell](./PWA_APP_SHELL.md) (**Shell.childRoutes([])**)  dentro do arquivo **app-routing.module.ts** conforme exemplo abaixo:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from './shell/shell.service';
import { AcnAuthorizationGuard, AcnChannelResolver, AcnChannelGuard } from '@acn/angular';
import { MainLayoutComponent } from './shell/main-layout/main-layout.component';
import { PageNotFoundComponent } from '@shared';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: {
      reuse: true,
      redirectAfterRender: '/landing'
    }
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./features/landing/landing.module').then(m => m.LandingModule),
    data: {
      channel: 'app'
    },
    resolve: {
      channel: AcnChannelResolver
    }
  },
  {
    path: 'totem',
    loadChildren: () =>
      import('./features/landing/landing.module').then(m => m.LandingModule),
    data: {
      channel: 'totem'
    },
    resolve: {
      channel: AcnChannelResolver
    }
  },
  Shell.childRoutes([
    // AcnAuthenticationGuard
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./features/dashboard/dashboard.module').then(
          m => m.DashboardModule
        ),
      data: {
        breadcrumb: 'dashboard.breadcrumb.home'
      }
    },
    ...
    }
  ]),
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  }
];

// @dynamic
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      enableTracing: false // debug
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

```

Todas as sub-rotas devem ser configuradas como módulos e sub-módulos através de **lazy-loading** para serem carregadas apenas quando requisitadas.

Em seguida deve-se habilitar a flag **enableServerSideRender** dentro do arquivo **environment.ts** (e **environment.prod.ts**):

```ts
import { ConfigurationModel, LogLevel } from '@acn/angular';
 
/**
 * Variável com as configurações do environment
 */
export const environment: ConfigurationModel = {
  production: true,
  enablePreRender: true,
  enableServerSideRender: false,
  ...
};
```

As técnicas de **pre-render** e **ssr dinâmico** podem ser utilizadas simultaneamente desde que o arquivo **index.html** principal da aplicação seja retirado da configuração inicial do pré-render.
