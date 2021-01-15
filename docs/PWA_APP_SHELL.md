# PWA: Shell da Aplicação

O **Shell da Aplicação (App Shell)** é um [padrão de arquitetura](https://pt.wikipedia.org/wiki/Padr%C3%A3o_de_arquitetura) que define um conjunto mínimo de HTML, CSS e Javascript no carregamento da interface do usuário (ex. página inicial). Seu objetivo é separar o conteúdo estático do conteúdo dinâmico para que o primeiro não precise ser carregado novamente a cada requisição da página. Dessa forma é possível melhorar a performance do carregamento da aplicação e por isso sua utilização é recomendada. As principais características de um shell de aplicação são:

Ser carregado rapidamente
Ser cacheado
Exibir conteúdo dinâmico

## Padrão Arquitetural

O modelo de shell de aplicação já vem implementado na aplicação de referência. O único tipo de alteração esperado por parte do desenvolvedor é a customização dos componentes de header, footer (se houver) e layout da aplicação.

### Exemplo: Aplicação de Referência

Na aplicação de referência o padrão está implementado através do módulo Shell que contém os componentes estruturais do layout (header e sidebar) e o arquivo com as rotas para os outros módulos.

Dentro do **AppRoutingModule** definimos que apenas as **rotas filhas do módulo Shell** serão carregadas dinamicamente. As rotas fora desse módulo representam conteúdo estático que já foi gerado no momento do build da aplicação e foi configurado para ser cacheado no service-worker.

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
      redirectAfterRender: '/landing',
    },
  },
  {
    path: 'landing',
    loadChildren: () => import('./features/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  ...Shell.childRoutes([
    // AcnAuthenticationGuard
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
      data: {
        breadcrumb: 'dashboard.breadcrumb.home',
      },
    },
    {
      path: 'forms',
      loadChildren: () => import('./features/forms/forms.module').then((m) => m.FormsModule),
      canActivate: [AcnAuthorizationGuard],
      data: {
        breadcrumb: 'forms.breadcrumb.forms',
      },
    },
    {
      path: 'table',
      loadChildren: () => import('./features/table/table.module').then((m) => m.TableModule),
      canActivate: [AcnAuthorizationGuard],
      data: {
        breadcrumb: 'table.breadcrumb.table',
        accessIn: ['commercial'],
      },
    },
  ]),
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full',
  },
];

// @dynamic
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      enableTracing: false, // debug
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
```

## Por que utilizar?

Ao integrar o modelo proposto com service workers, a aplicação ganha os seguintes benefícios:

- **Performance no carregamento.** Os arquivos estáticos (Shell, Fonts, Scripts e Imagens) são cacheados pelos service workers na primeira visita e assim podem ser carregados instantaneamente nas visitas seguintes.
- **Interações semelhantes a aplicações nativas.** Ao adotar esse modelo, como o carregamento dos arquivos estáticos passa a ser instantâneo, torna-se viável criar uma experiência de navegação e interação completa com suporte offline.
- **Uso de dados econômico.** O Tráfego de dados será reduzido dado que partes da aplicação se encontram cacheadas no navegador, não somente Imagens ou Fontes, restringindo requisições ao back-end a chamadas de API nas próximas visitas.

O shell deve ser estruturado de forma a minimizar o uso de dados necessário, a decisão sobre o que deve ou não ser cacheado precisa ser prudente. O cache de arquivos desnecessários resulta no navegador realizando downloads de mais dados do que o necessário, sobrecarregando o cache do navegador e rede, essa sobrecarga se agrava em localizações em que a conexão de internet é precária ou instável.
