# Performance - SSR: Prerender

- [Introdução](#introducao)
- [Como funciona](#como-funciona)
- [Quando utilizar esta técnica](#quando-utilizar-esta-tecnica)
- [Como configurar páginas pré-renderizadas](#como-configurar-paginas-pre-renderizadas)

## Introdução

Esta seção tem como objetivo detalhar o uso da técnica de **Pre-render** na presente arquitetura.

## Como funciona

Nesse modelo, a lista de rotas é pre-renderizada e os arquivos estáticos são criados após o build da aplicação. Por padrão essas rotas são disponibilizadas no servidor HTTPD configurado na nuvem.

## Quando utilizar esta técnica

- A aplicação é majoritariamente estática. Exemplos: landing-page, páginas promocionais e institucionais...
- A aplicação não necessita de atualizações constantes.
- Páginas não-logadas que não consultem serviços externos para seu carregamento, utilizem bibliotecas de terceiros ou possuam interação com o navegador através do objeto Window.

## Como configurar páginas pré-renderizadas

As rotas estáticas devem ser configuradas dentro do arquivo **app-routing.module.ts**, fora das rotas filhas do módulo **ShellRouting**.

As rotas configuração dentro do [shell da aplicação](./PWA_APP_SHELL.md) podem ser carregadas através técnica de [SSR Dinâmico](./PERFORMANCE_SSR_DINAMICO.md) pois o contéudo dessas páginas não é estritamente estático e depende da chamada de APIs.

O exemplo abaixo pode ser encontrado na Aplicação de Referência:

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

A rota **login** se encaixa nos critérios estabelecidos previamente sobre quando utilizar. Para configurar as rotas como rota a ser pré-renderizada dentro dos critérios de build da aplicação também é necessário adicioná-las ao arquivo **static.paths.ts** na raiz do projeto **dentro da pasta universal**:

```ts
// Dentro do array ROUTES devemos colocar todas as declarações de rota estáticas que queremos que sejam pre-renderizadas
export const ROUTES = ['/', '/login'];
```

A flag **enablePreRender** dentro do arquivo **environment.ts** (e **environment.prod.ts**) vem habilitada por padrão:

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

Para verificar a criação da rota devemos executar o script **prerender.ts** através do comando:

```ts
npm run prerender:build
```

O resultado esperado é que dentro da pasta dist passe a existir uma estrutura correspondente à da rota declarada contendo um arquivo **index.html** com conteúdo todo inline já renderizado:

```ts
dist / static / hot - site / index.html;
```

Para testar a navegação da rota criada basta rodar o servidor, inserir a rota no navegador e abrir o inspetor de código para visualizar o código criado.

Nenhuma rota que precise acessar conteúdo de área logada ou acesso à informações do servidor pode ser pré-renderizada, mesmo que seja apenas html.
