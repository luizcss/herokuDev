# Testes Unitários: Diretivas

Nesta seção iremos exemplificar sobre como escrever o **teste unitário de Diretivas**. Estas são componentes que não vem acompanhados de uma *View*, mas que sempre atuam sobre um componente que possui uma, por esse motivo criamos uma *view* para os testes, no exemplo abaixo a *view* utilizada para os testes é **TestComponent**.

## Diretiva de Atributo

Segue abaixo um exemplo de uma diretiva de atributo que deixa o fundo do elemento que a contém amarelo:

**Diretiva**

```ts
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
```

**Teste da Diretiva**

```ts
import { HighlightDirective } from './highlight.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" appHighlight>`
})
class TestFormErrorsHighlightComponent {}

describe('HighlightDirective', () => {

  let component: TestFormErrorsHighlightComponent;
  let fixture: ComponentFixture<TestFormErrorsHighlightComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormErrorsHighlightComponent, HighlightDirective]
    });
    fixture = TestBed.createComponent(TestFormErrorsHighlightComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('Should have yellow background', () => {
    expect(inputEl.nativeElement.style.backgroundColor).toBe('yellow');
  });
});
```

## Diretiva Estrutural

Segue abaixo um exemplo de uma diretiva estrutural que renderiza um conteúdo caso o login do usuário possua o formato **'B[numero].[numero]'**:

**Diretiva**

```ts
import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appHasContentAccess]'
})
export class HasContentAccessDirective {

  private hasView = false;

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  @Input() set appHasContentAccess(login: string) {

    if ((/^[P-p]\d+(\.)\d+$/).test(login) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

**Teste da Diretiva**

```ts
import { HasContentAccessDirective } from './has-content-access.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HasContentAccessDirective', () => {

  let fixture: ComponentFixture<any>;
  let hasContentAccessDirective: HasContentAccessDirective,
    mockViewContainerRef,
    mockTemplateRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, HasContentAccessDirective],
      imports: [CommonModule],
    });

    mockViewContainerRef = { createEmbeddedView: jest.fn(), clear: jest.fn() };
    mockTemplateRef = {};
  });

  it('should not be rendered when login is valid', () => {
    const template = '<div *appHasContentAccess="login" class="success">Conteúdo exclusivo para Login Válido!</div>';

    fixture = createTestComponent(template);
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.success')).length).toEqual(1);
    expect(fixture.nativeElement.querySelector('div').textContent).toEqual('Conteúdo exclusivo para Login Válido!');
  });

  it('should be rendered when login is invalid', () => {
    const template = '<div *appHasContentAccess="login" class="success">Conteúdo exclusivo para Login Válido!</div>';

    fixture = createTestComponent(template);
    fixture.componentInstance.login = 'ABC';
    fixture.detectChanges();
    const query = fixture.debugElement.queryAll(By.css('.success'));
    console.log(query);
    expect(query.length).toEqual(0);
  });
});

@Component({ selector: 'app-test-cmp', template: '' })
class TestComponent {
  public login = 'B43.1';

  setLogin(_login: string) {
    this.login = _login;
  }
}

function createTestComponent(template: string): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, { set: { template: template } })
    .createComponent(TestComponent);
}
```
