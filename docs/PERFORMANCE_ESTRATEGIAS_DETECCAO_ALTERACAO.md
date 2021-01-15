# Estratégias de Detecção de Alteração

## Visão Geral

Esta seção tem como objetivo detalhar as estratégias de detecção de alterações durante a compilação de aplicações Angular. O mecanismo de detecção de alterações é a forma que o Angular utiliza para percorrer o DOM em busca de mudanças e decide quando renderizar o conteúdo. Por padrão, ele fornece duas: **default** e **onPush**.

Toda aplicação basicamente é composta por uma árvore de componentes, que possuem inputs e outputs capazes de propagar dados e modelos de estado. Ao fazer uma modificação em qualquer um dos nós, um disparo de evento, um timeout, uma solicitação http, o sistema de detecção de alterações do Angular imediatamente percebe e propaga a mudança. De cima para baixo o sistema verifica todos os componentes da arvores para ver se algum deles depende da mudança realizada. Caso dependa, o componente será atualizado. Ao término da verificação o Angular atualiza o DOM.

## Modo Default (padrão)

No modo default, o Angular não infere nenhuma dependência dos componentes. É um modelo conservador que checa todas as vezes se alguma coisa foi alterada, também conhecido como **dirty-checking**. Assim, ele checa cada um dos eventos do navegador, temporizadores, XHRs e promessas.

Comparado ao AngularJS, esse processo é bem rápido. Isso se deve em grande parte ao fluxo de dados unidirecional usados no Angular. No entanto, pode ser bastante problemático quando a aplicação é muito grande, possui muitos componentes e precisa ser focada em performance.

## Modo onPush

É possível informar ao Angular para executar somente a detecção de alterações quando uma entrada for alterada ou quando for acionada manualmente. Para isso, alteramos a estratégia de detecção no decorator dos componentes para **ChangeDetectionStrategy.onPush**:

**acn-datepicker-header.component.ts**
```ts
/**
  Componente responsável pelo gerenciamento de Datepicker
*/
@Component({
  selector: 'acn-datepicker-header',
  templateUrl: './acn-datepicker-header.component.html',
  styleUrls: ['./acn-datepicker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerHeaderComponent<D> implements OnDestroy {
  ...
}
```

Quando usamos a estratégia **onPush** no componente, é dito ao Angular que o componente depende apenas de seus inputs e precisa ser verificado apenas nos seguintes casos:

* Alguma alteração na referência do objeto (input). 
* Um evento ocorreu a partir do componente ou de um de seus filhos.
* Quando executa a detecção de alterações explicitamente (**ChangeDetectorRef**).
* Houver o pipe async na view.

### Por que usar o modo onPush?

Ao desenvolver um componente reutilizável ou uma biblioteca de componentes de UI, muitas vezes não é possível saber o tipo de objetos que serão fornecidos como entradas. eles podem ser realmente enormes, a única maneira de garantir que o componente reutilizável não resulte em um queda do desempenho é usar essa estratégia de detecção de alteração.

### Como controlar as detecções de alteração?

Ao usar uma estratégia de detecção de alterações do **onPush**, além de garantir a aprovação de novas referências somente quando algo mudar, também podemos usar o **ChangeDetectorRef** para obter um controle completo. Podemos acessar o **ChangeDetectorRef** de um componente por meio de injeção de dependência.  

#### ChangeDetectorRef.detectChanges()

O método **detectChanges** executa a detecção de alterações uma vez para o componente atual e todos os seus filhos, independentemente de seu estado.

**acn-datepicker-header.component.ts**
```ts
import { Component, OnInit, OnChanges, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService, AcnLoginService } from '@acn/angular';
 
/**
 * Componente responsável pelo gerenciamento da barra de ferramentas
 */
@Component({
  selector: 'acn-toolbar',
  templateUrl: './acn-toolbar.component.html',
  styleUrls: ['./acn-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
 
export class AcnToolbarComponent implements OnInit, AfterViewInit, OnChanges {
 
  /** @ignore */
  public isCorporativo: boolean;
  /** @ignore */
  public logoImg: string;
 
  /**
   * Constructor
   *
   * @param renderer
   * @param configurationService
   * @param loginService
   * @param router
   * @param cdr
   */
  constructor(
    private renderer: Renderer2,
    private configurationService: ConfigurationService,
    private loginService: AcnLoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
 
  ...
 
  /**
   * Evento que verifica se houve alguma alteracao no componente
   */
  ngOnChanges() {
    this.cdr.detectChanges();
  }
 
  ...
}
```

#### ChangeDetectorRef.markForCheck()

Os Observables ao contrário dos objetos imutáveis, não nos fornecem novas referências quando uma alteração é feita. Em vez disso, eles acionam eventos aos quais podemos nos inscrever para reagir a eles.

Então, ao usar Observables e quisermos usar o OnPush para pular as checagem do detector de alterações nas ramificações, será preciso notificar o Angular para ativar a verificação de todos os componentes pai até o componente raiz.

A maneira recomendada é usar **ChangeDetectorRef.markForCheck()**, que marca o caminho do componente até a raiz para ser verificada na próxima execução de detecção de mudança.

**acn-datepicker-header.component.ts**
```ts
/**
 * Construtor
 *
 * @param calendar
 * @param dateAdapter
 * @param dateFormats
 * @param cdr
*/
constructor(@Host() private calendar: MatCalendar<D>,
              private dateAdapter: DateAdapter<D>,
              @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
              cdr: ChangeDetectorRef) {
    calendar.stateChanges
        .pipe(takeUntil(this.destroyed))
        .subscribe(() => cdr.markForCheck());
}
```

#### ChangeDetectorRef.detach() e ChangeDetectorRef.reattach()

Com o **ChangeDectorRef**, é possível desacoplar e acoplar completamente a detecção de alterações manualmente ao Angular com os métodos de **detach** e **reattach**. Por exemplo, em um cenário em que o desenvolvedor possui um componente que depende de dados alterados constantemente muitas vezes por segundo, atualizar a interface pode ser bastante custoso. Uma maneira mais eficiente de tratar esse caso seria checar e atualizar a interface apenas a cada X segundos ou quando o método update() fosse invocado:

**acn-toolbar.component.ts**
```ts
import { Component, OnInit, OnChanges, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService, AcnLoginService } from '@acn/angular';
 
/**
 * Componente responsável pelo gerenciamento da barra de ferramentas
 */
@Component({
  selector: 'acn-toolbar',
  templateUrl: './acn-toolbar.component.html',
  styleUrls: ['./acn-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
 
export class AcnToolbarComponent implements OnInit, AfterViewInit, OnChanges {
 
  ...
 
  /**
   * Desabilita a deteccao de alteracao para esta view apos sua inicializacao
   */
  ngAfterViewInit() {
    this.cdr.detach();
  }
}
```

Assim é possível tirar completamente o componente da detecção de alterações, tendo o controle para informar ao Angular sobre quando e onde realizar a detecção.
