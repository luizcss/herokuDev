# RxJS

## Visão Geral

**RxJS** é uma biblioteca para programação reativa utilizando Observables, facilitando a composição de código assíncrono ou baseado em call-back, permitindo o desenvolvedor paralelizar chamadas não bloqueando aplicação, otimizando a lógica do aplicativo e ainda mantendo o código bem estruturado.

A partir da versão 6 foram corrigidos deficiências associadas à splitting e tree shaking, que deixavam o pacote final grande.

As seguir descreveremos algumas boas práticas relacionadas a RxJS.

## Unsubscribe Observables

Observables inscritos (subscribe) criam uma área na memória utilizando processamento para tratar e verificar novos eventos, não cancelar essa assinatura ao termino de sua execução irá manter esse processo em execução, podendo acarretar em um problema de utilização de memória (Memory Leak) ou até de performance da aplicação como um todo. Por esse motivo é recomendado sempre cancelar a inscrição de observables quando não mais necessários.

Os métodos recomendados de cancelamento de inscrições são através do componente de arquitetura ou Async Pipe.

### Cancelando através do componente de arquitetura

Componentes que utilizam Observables podem estender a classe **BaseComponent** utilizando o Subject onDestroy (herdado) no pipe takeUntil do mesmo dessa forma quando o hook ngOnDestroy desse componente for executado todas as inscrições serão canceladas.

**cadastro.component.ts**

```ts
export class CadastroComponent extends BaseComponent implements OnInit {
  ngOnInit() {
    this.frmCliente = this.formBuilder.group({
      id: new FormControl(''),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      estadoCivil: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      cpf: new FormControl('', [BvValidators.CPF, Validators.required]),
    });
    this.estadosCivis = this.clientesService.getListaEstadoCivil();

    this.activatedRoute.params
      .pipe(
        takeUntil(this.onDestroy),
        filter((params) => params['id'] !== undefined),
        switchMap((params) => {
          const id = +params['id'];
          return this.clientesService.get(id).pipe(takeUntil(this.onDestroy));
        }),
      )
      .subscribe((item: ClienteModel) => {
        this.frmCliente.setValue(item);
      });
  }
}
```

### Cancelando Manualmente

A inscrição pode ser cancelada manualmente caso o componente de arquitetura não possa ser utilizado, o cancelamento será realizado no hook ngOnDestroy, porém nessa caso é necessário incluir uma variável para cada inscrição realizada como exemplo abaixo;

**page-not-found.component.ts**

```ts
export class PageNotFoundComponent implements OnInit, OnDestroy {
  rota: string = undefined;
  urlSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.urlSubscription = this.route.url.subscribe(
      (url) => (this.rota = url[url.length - 1].path),
    );
  }

  ngOnDestroy(): void {
    if (this.urlSubscription !== undefined && !this.urlSubscription.closed) {
      this.urlSubscription.unsubscribe();
    }
  }
}
```

### Cancelando através de Async Pipe

O pipe Async permite utilizar observáveis RxJS diretamente na View (HTML), deixando a cargo do próprio Angular o cancelamento da inscrição.

Esse Pipe também nos permite fazer um grande uso da detecção de alterações do OnPush, normalmente o Angular espera por um evento e depois verifica se houve alguma alteração, mas com observáveis podemos inverter isso, como sabemos quando ocorreu uma mudança, podemos informar o Angular para atualizar a View - e o pipe Async também faz isso automaticamente.

**diretivas.component.html**

```html
<p *ngIf="gridExemplo1 | async">O usuário logado tem role de ADMIN</p>
```

Async Pipe funciona muito bem com bibliotecas de gerenciamento de estado, como o NGXS, que, se totalmente utilizadas, podem fazer com que todo o nosso aplicativo use a detecção de alterações do OnPush, já que todo o nosso estado é tratado por meio de observáveis.

### Cancelamento após n eventos

A inscrição pode ser cancelada imediatamente após um determinado número de eventos com pipe take como no exemplo abaixo:

**acn-cryptography.service.ts**

```ts
this.http.get(this.cryptographyConfig.api + '/criptografia/publickey').pipe(
  take(1),
  map((response: any) => (this.encrypt = this.savePubKey(response))),
  catchError((error) => {
    this.acnSecurityAccessService.next({
      type: 'invalidKey',
      route: this.cryptographyConfig.api + '/criptografia/publickey',
    });
    return of(error);
  }),
);
```

## Evite encadeamento de subscriptions

Em determinado cenários se faz necessário o retorno de valores de mais de um observável para executar uma ação, neste caso evite inscrever para um observável no bloco de inscrição de outro observável, a recomendação para este cenário é utilizar os operadores de encadeamento apropriados.

Os operadores de encadeamento são executados no pipe do primeiro observável, sendo este que define a sequencia de execução. Alguns operadores de encadeamento são withLatestFrom, combineLatest e switchMap, mais operadores [aqui](https://www.learnrxjs.io/operators/combination/).

### Antes

**cadastro.component.ts**

```ts
this.activatedRoute.params
      .pipe(takeUntil(this.onDestroy))
      .subscribe(params => {
        const id = +params['id'];
        if (id) {
          this.clientesService.get(id)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(
              (item: ClienteModel) => {
                this.frmCliente.setValue(item);
              }
            );
      }
```

### Depois

**cadastro.component.ts**

```ts
this.activatedRoute.params
  .pipe(
    takeUntil(this.onDestroy),
    filter((params) => params['id'] != undefined),
    switchMap((params) => {
      const id = +params['id'];
      return this.clientesService.get(id).pipe(takeUntil(this.onDestroy));
    }),
  )
  .subscribe((item: ClienteModel) => {
    this.frmCliente.setValue(item);
  });
```

## Use operadores RxJs apropriados

Ao usar operadores "flattening" com seus observáveis, use o operador apropriado para a situação.

- **switchMap**: quando quer ignorar as emissões anteriores quando há uma nova emissão
- **mergeMap**: quando quer executar todas as emissões de forma desordenada quando há uma nova emissão
- **concatMap**: quando quer lidar com as emissões uma após a outra conforme elas são emitidas
- **exhaustMap**: quando deseja cancelar todas as novas emissões enquanto processa uma emissão anterior

Outros operadores importantes que reduzem a emissão de eventos são:

- **debounceTime**: Reduzi o número de chamadas na API. Esse operador impedirá que uma função seja executada enquanto ainda estiver sendo chamada freqüentemente (por exemplo, chamando uma API para cada evento de keyup).
- **filter**: Reduz o número de eventos baseados em uma condição

**cryprography.component.ts**

```ts
this.frmContrlDados.valueChanges
  .pipe(
    takeUntil(this.onDestroy),
    debounceTime(200),
    filter((value) => value != undefined),
    switchMap((value) => {
      return this.cryptography.encrypt(value).pipe(take(1));
    }),
  )
  .subscribe((cryptValue) => {
    this.encryptedValue = cryptValue;
  });
```

Usar um único operador, quando possível, em vez de encadear vários outros operadores para obter o mesmo efeito, pode fazer com que menos código seja enviado ao usuário. Usar os operadores errados pode levar a um comportamento indesejado, pois operadores diferentes lidam com observáveis de maneiras diferentes.
