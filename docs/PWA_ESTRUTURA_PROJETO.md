# PWA: Estrutura de Projeto

Esta seção tem como objetivo explicar como as capacidades de PWA estão aplicadas na presente arquitetura.

## Estrutura

O Angular-CLI possui uma funcionalidade que permite adicionar as capacidades PWA a uma aplicação Angular com apenas um comando dentro da pasta do projeto:

```
ng add @angular/pwa
```

A versão mínima do angular suportada pela arquitetura para essas funções é a 6.1.10.

Ao executar esse comando, vemos que alguns arquivos novos foram criados e outros atualizados:

* **ngsw-config.json:** é o arquivo de configuração do service worker. Esse arquivo é utilizado pelo Angular-CLI no momento em que o arquivo do service worker é gerado. Sua função principal é a configuração das estratégias de cacheamento da aplicação.
* **src/assets/icons/icon-xxx.png:** são os arquivos de ícone do app em diferentes resoluções. A utilização desses ícones é configurada no arquivo manifest.json. Esses ícones podem ser utilizados tanto como ícone da aplicação quanto dentro da splash-screen, por exemplo.
* **manifest.json:** manifesto PWA. É o arquivo que fornece todos os metadados do web app. Contém informações como nome, ícone, descrição do app e outras informações exigidas por um PWA.
* Os arquivos atualizados incluem: **index.html**, **app.module.ts**, **angular.json** e **package.json** para incluir as referências e integrações dos arquivos de PWA com a aplicação existente.

A inclusão da referência ao arquivo **manifest.json** dentro da **tag head** do arquivo **index.html** é fundamental para que o navegador considere a aplicação como um PWA.

O Angular-CLI já cria os arquivos do manifesto e do service worker preenchidos com dados padrão e um conjunto de assets com a logo do Angular. Nesta etapa cabe ao desenvolvedor fazer as modificações necessárias de acordo com o seu projeto.

## Configurando o arquivo manifest.json

O arquivo **manifest.json** contém metadados responsáveis pela instalação do app no dispositivo e as informações necessárias para exibir a splash screen. Ao ser carregado a partir de um dispositivo, a partir da home screen a splash screen será exibida. A seguir, a descrição dos campos chave de um manifesto PWA:

* **name:** nome exibido na splash-screen abaixo do ícone da aplicação.
* **short_name:** nome exibido abaixo do atalho para a aplicação seja na área de trabalho ou na home screen.
* **description:** descrição genérica da aplicação.
* **background_color:** cor de fundo da splash screen da aplicação.
* **theme_color:** cor base da aplicação, usada por exemplo, em barras de status caso sejam exibidas.
* **display:** propriedade que especifica o modo de exibição (fullscreen, standalone ou minimal-ui).
* **orientation:** propriedade que permite forçar o uso do aplicativo em alguma orientação específica. Costuma ser opcional pois os usuário preferem escolher a orientação.
* **icons:** lista de ícones da aplicação em diferentes resoluções, utilizados para o atalho e splash screen. O dispositivo irá selecionar automaticamente o melhor tamanho a partir da lista disponibilizada. Obrigatoriamente devem incluir no mínino uma versão com tamanho 192px e outra com 512px.
* **scope:** define o conjunto de url's que o navegador deve considerar parte do app, e é utilizado para decidir quando o usuário deixou o aplicativo e deveria ser redirecionado de volta para uma aba do navegador. Seu valor padrão, caso não seja preenchida, é o diretório onde o arquivo manifest.json é servido.
* **start_url:** informa ao navegador de onde a aplicação deve iniciar quando terminar de ser carregada, e também evita que o usuário comece a partir de qualquer página que ele estivesse navegando antes ou quando o app foi adicionado à sua tela.

Clique [aqui](./PWA_APP_MANIFEST.md) para saber mais detalhes sobre o Web App Manifest.

## Configurando o arquivo de service worker

Ao acrescentar capacidades PWA via Angular-CLI, o Angular fornece um arquivo para configurar o service worker. O arquivo **ngsw-config.js** permite configurar os comportamentos e estratégias de cache. O arquivo é um JSON com 4 entradas, a seguir temos uma breve descrição de cada uma delas:

* **index:** indica o arquivo da página inicial. Geralmente é o arquivo **index.html**.
* **assetsGroups:** inclui os arquivos que fazem parte do app. O Angular considera arquivos do app aqueles que estão versionados junto com o app, assim como arquivos estáticos. Aqui também é onde devemos especificar que recursos devem ser sempre cacheados (**"installMode": "prefetch"**) e quais devem ser cacheados apenas quando carregados na página (**"installMode": "lazy"**).
* **dataGroups:** são todos os recursos que não estão versionados com o app, como por exemplo as urls de API que também podem ser cacheadas. Aqui podemos configurá-las através de duas estratégias: cache first com fallback de rede (**"strategy": "performance"**) e network first com fallback de cache (**"strategy": "freshness"**).
* **appData:** permite passar dados relativos a versão específica em uso do app. O serviço SwUpdate inclui dados para notificações de atualização. Geralmente essa configuração é utilizada para fornecer informações adicionais através de popups, notificando atualizações disponíveis.

Para mais informações e detalhes sobre estratégias de cache clique [aqui](./PWA_SW.md) para a acessar a seção correspondente da documentação.

Na maioria dos casos, as partes da configuração de service worker que variam de projeto para projeto são os assets em **assetsGroup** e a parte **dataGroups**. Abaixo, um exemplo:

**ngsw-config.js**

```json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/favicon.ico", "/index.html", "/*.css", "/*.js"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": ["/assets/**"]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "api",
      "urls": ["https://myapi.org/api/**"],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "3d",
        "timeout": "1m",
        "strategy": "freshness"
      }
    },
    {
      "name": "thumbs",
      "urls": ["https://myapi.org/api/thumb/**"],
      "cacheConfig": {
        "maxSize": 100,
        "maxAge": "3d",
        "timeout": "1m",
        "strategy": "performance"
      }
    }
  ]
}
```

## Como testar

Como service workers são recursos utilizados para trabalhar com cache, as funcionalidades PWA não ficam habilitadas durante o modo de desenvolvimento. Todas as funcionalidades PWA ficam habilitadas em modo produção. Portanto, para testar as configurações de um service worker é necessário buildar a aplicação através do comando:

```
ng build --prod
```

Em seguida, precisaremos utilizar outro servidor de HTTP pois o comando ng serve não funciona com service workers. O exemplo a seguir utilizar a biblioteca [http-server](https://www.npmjs.com/package/http-server) do npm. Para reduzir a possibilidade de conflitos e de distribuição de conteúdo velho, é recomendado testar numa porta à parte e com o cache desabilitado.

Para rodar localmente o projeto dessa forma é preciso alterar o endpoint do arquivo **environment.prod.ts** momentaneamente para http://localhost:9003/, igual ao arquivo **environment.ts**. Ao fazer isso é importante não esquecer de voltar as configurações anteriores antes de buildar o projeto no servidor.

```
npm run pwa
```

O script acima está definido nos projetos criados a partir do gerador de aplicações da arquitetura e vem configurado para rodar na porta 8090 e apontando para um mock na porta 9003.

Para realizar os testes com todas as condições padrões temos que garantir que o app esteja sendo rodado em um servidor de HTTPS estático e com um certificado válido. Caso essas condições não estejam satisfeitas o suporte a PWA será parcial. Por exemplo, o service worker pode estar rodando, mas a instalação será apenas um atalho e o app pode não ser adicionado de fato à lista de apps do sistema operacional.

Atualmente, não existe uma forma eficiente de testar PWA localmente, principalmente pela questão do HTTPS.

## Referências Adicionais

* [Documentação oficial Angular - Service Workers & PWA (inglês)](https://angular.io/guide/service-worker-intro)
