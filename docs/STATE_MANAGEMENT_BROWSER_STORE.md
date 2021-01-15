# State Management - Armazenamento Local

O Armazenamento Local é a capacidade que tem a responsabilidade de armazenar dados do usuário no browser, retirando assim a necessidade de fazer uma requisição para o servidor para alguns casos. A recomendação da arquitetura é que o desenvolvedor utilize o plugin [@ngxs/storage](https://www.ngxs.io/plugins/storage) para configurar o armazenamento no local storage, session storage ou qualquer outro formato preferido.

## Instalação

```ts
npm install @ngxs/storage-plugin
```

## Como utilizar

Após instalar o plugin, importe o módulo **NgxsStoragePluginModule.forRoot()** dentro do arquivo **store.module.ts**:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { environment } from '../../environments/environment';

import { AppState } from './app/app.state';
import { CounterState } from './counter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production,
    }),
    NgxsDispatchPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    environment.plugins,
  ],
})
export class StoreModule {}
```

Ao importar com o chamada **forRoot()** vazia, o plugin irá automaticamente gravar todos os estados com a chave _@@STATE_ no localStorage. Para salvar apenas alguns estados ou chaves, devemos especificar através do parâmetro **key**, em formato de string ou array de strings:

```ts
  NgxsStoragePluginModule.forRoot({
    key: CounterState
  }),
```

Para exemplificar, na aplicação de referência colocamos uma chamada ao estado no componente de Login, a ideia é registrar quantas vezes um usuário se logou na aplicação:

**login.component.ts**

```ts

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  /** @ignore */
  public frmLogin: FormGroup;
  /** @ignore */
  private validationMessages: { [key: string]: { [key: string]: string } };
  /** @ignore */
  public displayMessage: { [key: string]: string } = {};
  /** @ignore */
  private acnValidator: AcnValidator;

  public navbarOptions: IAcnNavbar;

  /**
   * Constructor
   *
   * @param router
   * @param formBuilder
   * @param authService
   */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AcnAuthenticationService,
    private _counterService: CounterService,
    @Inject(PLATFORM_ID) private _platformId
  ) {
    super();
  }

  { ... }

  /**
   * Se o form estiver válido realiza login, caso contrário, exibe erro
   */
  public login() {
    if (!this.frmLogin.valid) {
      return;
    }

    this._authService
      .login(this.frmLogin.value.email, this.frmLogin.value.senha)
      .pipe(take(1))
      .subscribe(
        () => {
          // Disparo a chamada da ação para a store, que faz o registro no localStorage
          this._counterService.add();
          this._router.navigate(['dashboard']);
        },
        (error: HttpErrorResponse) => {
          console.log('Não foi possível realizar o login', error);
        }
      );
  }
}

```

Após a validação do login, do usuário utilizamos o service **counterService** para acessar a Store e realizar a ação do estado que será guardado no localStorage, o service segue o padrão de implementação de Facade descrito na seção de [boas práticas](./STATE_MANAGEMENT_BOAS_PRATICAS.md) relacionadas ao gerenciamento de estados. Para, verificar o número de vezes logado, implementamos no componente Status uma chamada ao valor armazenado no **CounterState**:

**status.component.ts**

```ts
import { Component, OnInit } from '@angular/core';
import { CounterService } from 'apps/app-reference/src/app/store/counter/counter.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  public counter$;

  constructor(private _counterService: CounterService) {}

  ngOnInit() {
    this.counter$ = this._counterService.value$.pipe(map((data) => data.count));
  }
}
```

**status.component.html**

```html
<p>Número de vezes que logadas no sistema hoje: {{ counter$ | async }}</p>
```

## Opções adicionais de configuração

| Parâmetro   | Descrição                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| storage     | Define a estratégia de armazenamento: LocalStorage (padrão), SessionStorage ou StorageEngine API (implementação customizada). |
| deserialize | Formato de desserialização. Padrão: JSON parser.                                                                              |
| serialize   | Formato de serialização. Padrão: JSON stringfy.                                                                               |
| migrations  | Estratégias de migração de dados entre versões da Store                                                                       |
