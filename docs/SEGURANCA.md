# Segurança

- [Introdução](#introdução)
- [Tratamento de dados de formulários](#tratamento-de-dados-de-formulários)
- [Content Security Policy (CSP)](<#content-security-policy-(csp)>)
- [Cross-Site Request Forgery (CSFR)](<#cross-site-request-forgery-(csfr)>)
- [Cross-Site Script Inclusion (XSSI)](<#cross-site-script-inclusion-(xssi)>)
- [Armazenamento de dados sensíveis](#armazenamento-de-dados-sensíveis)
- [Minificação de código fonte](#minificação-de-código-fonte)
- [Vulnerabilidades em dependências de aplicação](#vulnerabilidades-em-dependências-de-aplicação)
- [Referências](#referências)

## Introdução

Qualquer aplicação que é executada no browser pode ter suas variáveis alteradas em run-time (breakpoints, interceptação, etc.), independentemente das tecnologias ou ferramentas utilizadas.
Considerando esta realidade, para minimizar a possibilidade de quebra de segurança devemos seguir os padrões e boas práticas sobre separação de responsabilidades entre camadas (lógica de negócio no server e lógica de apresentação no client).
O objetivo desse documento é apresentar boas práticas de segurança que devem ser utilizadas no desenvolvimento de aplicações SPA com Angular.

## Tratamento de dados de formulários

A principal forma de ataques em aplicações web é feita via formulários, por esse motivo é importante garantir os seguintes pontos:

- Todos os campos de formulários **devem conter** um limite máximo de caracteres (maxlength);
- As validações de formulários feitas no client-side não garantem que o dado esteja 100% validado, por esse motivo é **imprescindível** que a validação seja feita também no server-side;
- Os campos de senha devem sempre utilizar o tipo **password**;
- Campos de envio de arquivos **devem ser validados** previamente no client-side;

### Sanitização de HTML (XSS)

A [sanitização](https://angular.io/api/platform-browser/DomSanitizer#description) consiste no processo de limpeza de valores não confiáveis, removendo trechos de código possivelmente malicioso. Em alguns casos excepcionais pode ser necessário incluir um trecho de HTML que veio de uma resposta de chamada de API,
para isso é utilizado a diretiva **[innerHTML]**, conforme exemplo abaixo:

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  template: '<p [innerHTML]="trechoHTML"></p>'
})
export class ClienteComponent implements OnInit {
  nomeCliente = 'João';
  trechoHTML = 'Olá <strong>{{ nomeCliente }}</strong>, tudo bem? <script>alert('conteúdo malicioso!')</script>';

  constructor() { }

  ngOnInit() {
  }

}
```

Nesses cenários o Angular realiza o processo de limpeza do HTML automaticamente, removendo tags \<script> mas mantendo outras como \<strong>.

**Atenção! Nunca utilizar a função _eval()_ para analisar o JSON no client-side**

## Content Security Policy (CSP)

A **política de segurança de conteúdo (CSP)** é uma técnica de defesa para evitar ataques XSS aplicada no servidor de aplicação para retornar headers HTTP de CSP nas requisições feitas e interpretada pelos browsers. Segue abaixo algumas regras para tornar uma política de segurança efetiva:

- Restringir a execução de scripts somente para fontes confiáveis, geralmente da própria aplicação;
- Bloquear execuções de scripts inline e interpretação dinâmica ("unsafe-eval" e "unsafe-inline");
- Bloquear fontes desconhecidas de tags: embed, object e applet;

Um exemplo de política que respeita essas regras pode ser: "script-src 'self'; object-src 'none'"

Para utilizar os recursos de CSP no Angular é necessário utilizar o modo [AOT](https://angular.io/guide/aot-compiler) (produção).

## Cross-Site Request Forgery (CSFR)

**[CSRF](<https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)>)** é uma técnica de ataque pela qual o invasor pode enganar um usuário autenticado a executar ações no seu site sem saber. O HttpClient do Angular suporta um mecanismo comum usado para impedir ataques XSRF. Ao executar solicitações HTTP, um interceptor lê um token de um cookie, por padrão XSRF-TOKEN, e o define como um cabeçalho HTTP, **X-XSRF-TOKEN**. Como somente o código que é executado em seu domínio pode ler o cookie, o back-end pode ter certeza de que a solicitação HTTP veio de seu aplicativo cliente e não de um invasor.

Por padrão, um interceptor envia esse cookie para todas as solicitações mutantes (POST, etc.) para URLs relativas, mas não para solicitações GET / HEAD ou para solicitações com um URL absoluto.

Para isso funcionar, o servidor precisa definir um token em um cookie de sessão legível JavaScript chamado XSRF-TOKEN na primeira solicitação HTTP GET. Nas próximas requisições XHR o servidor pode verificar se o cookie corresponde ao cabeçalho HTTP X-XSRF-TOKEN. O token deve ser exclusivo para cada usuário e deve ser validado pelo servidor (para evitar que o JavaScript possa criar os seus próprios tokens).

O nome dos cabeçalhos podem ser especificadas usando as propriedades **headerName** e **cookieName** do módulo **HttpClientXsrfModule**, conforme exemplo abaixo:

```ts
imports: [
  HttpClientModule,
  HttpClientXsrfModule.withOptions({
    cookieName: 'My-Xsrf-Cookie',
    headerName: 'My-Xsrf-Header',
  }),
];
```

A fim de evitar colisões em ambientes onde múltiplas aplicações Angular compartilham o mesmo domínio ou subdomínio, recomendamos que cada aplicativo usa o nome de cookie exclusivo. Para mais informações clique [aqui](https://angular.io/guide/http#security-xsrf-protection) para acessar a documentação oficial.

## Cross-Site Script Inclusion (XSSI)

A inclusão de scripts entre sites, também conhecida como vulnerabilidade JSON, pode permitir que o site de um invasor leia dados de uma API JSON. O ataque funciona em navegadores mais antigos, substituindo os construtores de objetos JavaScript nativos e incluindo uma URL de API usando uma tag \<script>.

Esse ataque só será bem-sucedido se o JSON retornado for executável como JavaScript. Os servidores podem evitar um ataque prefixando todas as respostas JSON para torná-las não executáveis, por convenção, usando a conhecida string **")]} ', \ n"**.

A biblioteca [HttpClient](https://angular.io/api/common/http/HttpClient) do Angular reconhece esta convenção e automaticamente tira a string **")]} ', \ n"** de todas as respostas antes de uma análise mais aprofundada.

## Armazenamento de dados sensíveis

Informações sensíveis do usuário, como CPF, dados de conta, etc, **não devem ser armazenadas em localStorage**. Esse recurso deve ser usado apenas como forma de melhorar a usabilidade do usuário, armazenando dados de preferências, por exemplo.

## Minificação de código fonte

O processo padrão do Angular para montagem de pacote de produção realiza, além de outras coisas, a minificação do código-fonte. Esse recurso é voltado principalmente para a melhoria de performance, pois diminui o tamanho do arquivo, porém também é uma técnica que auxilia no ofuscamento do código, evitando exposição de regras dificultando o entendimento da lógica da aplicação.

**Exemplo de código minificado**

```js
sh(t),this.paramsMap.set(e,n)},e.prototype.setAll=function(e){var t=this;e.paramsMap.forEach(function(e,r){var n=t.paramsMap.get(r),s=o.isPresent(n)?n:[];i.ListWrapper.clear(s),s.push(e[0]),t.paramsMap.set(r,s)})},e.prototype.append=function(e,t){var r=this.paramsMap.get(e),n=o.isPresent(r)?r:[];n.push(t),this.paramsMap.set(e,n)},e.prototype.appendAll=function(e){var t=this;e.paramsMap.forEach(function(e,r){for(var n=t.paramsMap.get(r),s=o.isPresent(n)?n:[],a=0;a<e.length;++a)s.push(e[a]);t.paramsMap.set(r,s)})},e.prototype.replaceAll=function(e){var t=this;e.paramsMap.forEach(function(e,r){var n=t.paramsMap.get(r),s=o.isPresent(n)?n:[];i.ListWrapper.clear(s);for(var a=0;a<e.length;++a)s.push(e[a]);t.paramsMap.set(r,s)})},e.prototype.toString=function(){var e=[];return this.paramsMap.forEach(function(t,r){t.forEach(function(t){return e.push(r+"="+t)})}),e.join("&")},e.prototype["delete"]=function(e){this.paramsMap["delete"](e)},e}();return t.URLSearchParams=c,s.define=a,r.exports})
```

## Vulnerabilidades em dependências de aplicação

Ao utilizar componentes 3rdParty nas aplicações é necessário verificar se essas possuem vulnerabilidades de segurança. A partir da versão 6 do NPM é possivel executar o seguinte [comando](https://docs.npmjs.com/getting-started/running-a-security-audit) para realizar essa análise:

```ts
npm audit
```

## Referências

- [Angular - Guia de Segurança](https://angular.io/guide/security)
- [OWASP - Boas práticas de Segurança](https://www.owasp.org/index.php/OWASP_Guide_Project)
- [Google - Fundamentos de Segurança](https://developers.google.com/web/fundamentals/security/csp/)
