# Testes Unitários: Componentes

Nesta seção iremos exemplificar sobre como escrever o teste unitário de Componentes. Utilizaremos como exemplo uma tela de Cadastro de Clientes. Ao escrever um teste de Componente é fundamental ter em mente de que estamos testando a integridade das variáveis que estamos exibindo na tela e dos métodos que os elementos visuais referenciam, por isso precisamos criar um *TestBed* com todos os serviços e elementos de rota simulados corretamente. Além disso, por ter uma *View* acoplada é importante testar se os elementos de HTML foram renderizados corretamente após todos os eventos relacionados ao componente.

**Componente de Cadastro**

```ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcnValidators } from '@acn/angular';
import { Subscription } from 'rxjs';

import { ClientesService } from '../clientes.service';
import { ClienteModel } from '../models';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit, OnDestroy {

  public estadosCivis;
  public frmCliente: FormGroup;

  private routeSubscription: Subscription;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private clientesService: ClientesService) { }

  ngOnInit() {
    this.frmCliente = this.formBuilder.group({
      id: new FormControl(''),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      estadoCivil: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      cpf: new FormControl('', AcnValidators.CPF)
    });
    this.estadosCivis = this.clientesService.getListaEstadoCivil();

    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];

      if (id) {
        this.clientesService.get(id).subscribe(
          (item: ClienteModel) => {
            this.frmCliente.setValue(item);
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  salvar() {
    if (this.frmCliente.valid) {
      this.clientesService.salvar(this.frmCliente.value).subscribe(() => {
          this.router.navigate(['/exemplos/clientes']);
      });
    }
  }

}
```

**Teste do Componente de Cadastro**

```ts
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { CadastroComponent } from './cadastro.component';
import { SharedModule } from './../../../../shared/shared.module';
import { of, Subject } from 'rxjs';
import { MatFormFieldModule,
         MatInputModule,
         MatRadioModule,
         MatSelectModule,
         MatCheckboxModule,
         MatNativeDateModule,
         MatDatepickerModule
        } from '@angular/acnerial';
import { BrowserAniacnionsModule } from '@angular/platform-browser/aniacnions';
import { By } from '@angular/platform-browser';

describe('CadastroComponent', () => {
  let comp: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let element: HTMLElement;
  let clientesServiceStub;
  let paramsSub: Subject<Params>;
  let routerStub;


  beforeEach(() => {

    routerStub = {navigate: jest.fn()};

    clientesServiceStub = {getListaEstadoCivil: jest.fn(), get: jest.fn(), salvar: jest.fn() };

    clientesServiceStub.getListaEstadoCivil.mockReturnValue(of([{ id: 1, nome: 'Solteiro' }, { id: 2, nome: 'Casado' }]));

    paramsSub = new Subject<Params>();

    TestBed.configureTestingModule({
      declarations: [CadastroComponent],
      imports: [
        BrowserAniacnionsModule,
        SharedModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: { params: paramsSub } },
        { provide: Router, useValue: routerStub },
        { provide: ClientesService, useValue: clientesServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CadastroComponent);
    comp = fixture.componentInstance;
    element = fixture.nativeElement;

  });

  describe('ngOnInit', () => {

    it('Carregar os componentes com Id válido', () => {

      const cliente = {
        cpf: '191000000',
        dataNascimento: new Date(1987, 11, 10),
        email: 'pedro.da.silva@example.com.br',
        estadoCivil: 'Solteiro',
        id: 1,
        nome: 'Pedro da Silva',
        sexo: 'M'
      };
      clientesServiceStub.get.mockReturnValue(of(cliente));

      comp.ngOnInit();
      fixture.detectChanges();
      paramsSub.next({ id: '1' });

      let input: HTMLInputElement = element.querySelector('input[name=nome]');
      expect(input).toBeTruthy();
      expect(input.value).toContain(cliente.nome);

      input = element.querySelector('input[name=cpf]');
      expect(input).toBeTruthy();
      expect(input.value).toContain(cliente.cpf);


      input = element.querySelector('input[name=email]');
      expect(input).toBeTruthy();
      expect(input.value).toContain(cliente.email);


      // Teste especifico para o elemento acn-select
      input = element.querySelector('acn-select');
      expect(input).toBeTruthy();


      const trigger = fixture.debugElement.query(By.css('.acn-select-trigger')).nativeElement;
      // trigger.click();
      fixture.detectChanges();

      let selected = fixture.debugElement.query(By.css('.acn-select-value .acn-select-value-text span')).nativeElement;
      expect(selected.innerHTML).toContain('Solteiro');

      // Teste especifico para o elemento radio-button
      input = element.querySelector('acn-radio-button[id=masculino]');
      expect(input).toBeTruthy();

      selected = fixture.debugElement.query(By.css('.acn-radio-checked .acn-radio-input')).nativeElement;
      expect(selected.checked).toBeTruthy();

    });

    it('Não carregar os componentes com Id inválido', () => {

      comp.ngOnInit();
      fixture.detectChanges();

      paramsSub.next({});
      let input: HTMLInputElement = element.querySelector('input[name=nome]');
      expect(input).toBeTruthy();
      expect(input.value).toEqual('');

      input = element.querySelector('input[name=email]');
      expect(input).toBeTruthy();
      expect(input.value).toEqual('');

      input = element.querySelector('acn-radio-button[id=masculino]');
      expect(input).toBeTruthy();
      expect(input.checked).toBeFalsy();

    });
  });

  describe('Save', () => {
    it('Não salvar o cliente com Form inválido', () => {

      const cliente = {
        cpf: '191000000',
        dataNascimento: new Date(1987, 11, 10),
        email: 'pedro.da.silva@example.com.br',
        estadoCivil: 'Solteiro',
        id: 1,
        nome: 'Pedro da Silva',
        sexo: 'M'
      };
      clientesServiceStub.get.mockReturnValue(of(cliente));
      clientesServiceStub.salvar.mockReturnValue(of(true));

      comp.ngOnInit();
      fixture.detectChanges();
      paramsSub.next({ id: '1' });
      fixture.detectChanges();
      comp.salvar();

      expect(clientesServiceStub.salvar).not.toHaveBeenCalled();
      expect(routerStub.navigate).not.toHaveBeenCalled();

    });

    it('Salvar o cliente com Form válido', () => {

      const cliente = {
        cpf: '43599562156',
        dataNascimento: new Date(1987, 11, 10),
        email: 'pedro.da.silva@example.com.br',
        estadoCivil: 'Solteiro',
        id: 1,
        nome: 'Pedro da Silva',
        sexo: 'M'
      };
      clientesServiceStub.get.mockReturnValue(of(cliente));
      clientesServiceStub.salvar.mockReturnValue(of(true));

      comp.ngOnInit();
      fixture.detectChanges();
      paramsSub.next({ id: '1' });
      fixture.detectChanges();
      comp.salvar();

      expect(clientesServiceStub.salvar).toHaveBeenCalledWith(cliente);
      expect(routerStub.navigate).toHaveBeenCalledWith(['/exemplos/clientes']);

    });
  });

  describe('ngOnDestroy', () => {

    it('Limpar os componentes corretamente', () => {

      comp.ngOnInit();
      spyOn(comp, 'ngOnDestroy');
      comp.ngOnDestroy();
      expect(comp.ngOnDestroy).toHaveBeenCalledTimes(1);

    });
  });
});
```
