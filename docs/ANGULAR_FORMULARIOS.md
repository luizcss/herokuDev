# Formulários

## Reactive Forms

Formulários reativos usam os conceitos de imutabilidade para gerenciamento de estado, ou seja cada atualização de um formulário emite um novo estado, isso mantém a integridade entre os valores, aumentando o controle e facilitando a criação de testes unitários.

Para iniciar o uso de formulários reativos, importe o módulo **ReactiveFormsModule** do pacote **@angular/forms**:

```ts
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CadastroComponent } from './cadastro/cadastro.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ListaComponent } from './lista/lista.component';
import { ClientesService } from './clientes.service';

@NgModule({
  imports: [CommonModule, ClientesRoutingModule, ReactiveFormsModule],
  declarations: [ListaComponent, ClientesComponent, CadastroComponent],
})
export class ClientesModule {}
```

Para a criação do primeiro formulário reativo, importe as classes **FormGroup**, **FormBuilder** e **Validators** de **@angular/forms**, e construa o formulário conforme exemplo de cadastro de clientes abaixo:

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  public estadosCivis;
  public frmCliente: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.frmCliente = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.email],
      estadoCivil: ['', Validators.required],
      sexo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', Validators.required]
    });
    // ...


    salvar() {
      if (this.frmCliente.valid) {
        //Do something
      }
    }
  }

}
```

Após a construção do formulário no componente, é necessário vincular os inputs ao formulário criado, para isso siga os seguintes passos:

- Inclua a diretiva **formGroup** na tag <form> para criar um agrupamento dos controles;
- Para cada input, inclua a diretiva **formControlName** passando como parâmetro o mesmo nome definido na criação do formulário no componente (.ts);
- Defina um método de submissão do formulário com a diretiva **ngSubmit**;
- (opcional) Defina uma classe CSS de validação para cada input, utilizando a lista de **controls** para validação;
- (opcional) Defina uma regra para habilitar o botão de submissão somente se o formulário estiver válido;

Segue abaixo um exemplo de cadastro de clientes, utilizando as definições acima:

```html
<form [formGroup]="frmCliente" (ngSubmit)="salvar()">
  <div class="form-group" [ngClass]="{'has-error': !frmCliente.controls['nome'].valid}">
    <label for="nome">Nome</label>
    <input type="text" class="form-control" name="nome" id="nome" formControlName="nome" />
  </div>
  <div class="form-group" [ngClass]="{'has-error': !frmCliente.controls['email'].valid}">
    <label for="email">E-mail</label>
    <input type="email" class="form-control" id="email" name="email" formControlName="email" />
  </div>
  <div class="form-group" [ngClass]="{'has-error': !frmCliente.controls['estadoCivil'].valid}">
    <label for="estadoCivil">Estado Civil</label>
    <select class="form-control" id="estadoCivil" name="estadoCivil" formControlName="estadoCivil">
    </select>
  </div>
  <div class="form-group">
    <label>Sexo</label><br />
    <label class="radio-inline">
      <input type="radio" name="sexo" id="masculino" value="M" formControlName="sexo" /> Masculino
    </label>
    <label class="radio-inline">
      <input type="radio" name="sexo" id="feminino" value="F" formControlName="sexo" /> Feminino
    </label>
  </div>
  <div class="form-group" [ngClass]="{'has-error': !frmCliente.controls['dataNascimento'].valid}">
    <label for="dataNascimento">Data de Nascimento</label>
    <input
      type="text"
      class="form-control"
      id="dataNascimento"
      maxlength="10"
      name="dataNascimento"
      formControlName="dataNascimento"
    />
  </div>
  <div class="form-group" [ngClass]="{'has-error': !frmCliente.controls['cpf'].valid}">
    <label for="cpf">CPF</label>
    <input
      type="text"
      class="form-control"
      id="cpf"
      name="cpf"
      maxlength="11"
      formControlName="cpf"
    />
  </div>
  <button type="submit" class="btn btn-success" [disabled]="!frmCliente.valid">Salvar</button>
</form>
```

## Componentes e Validadores Customizados

Com o objetivo de auxiliar os desenvolvedores na validação de formulários, a arquitetura disponibliza os seguintes tipos de validações dentro do framework:

- CEP
- CPF
- CNPJ
- CPF e CNPJ
- Data
- E-mail

Para utilizar os validadores na aplicação, faça a instalação do framework via NPM:

```ts
npm install @acn/ui
```

Importe a classe **AcnValidators** do pacote **@acn/ui** e inclua o validador desejado (**ex.: AcnValidators.CPF**), conforme exemplo abaixo:

```ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AcnValidator } from '@acn/ui';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  public estadosCivis;
  public frmCliente: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.frmCliente = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.email],
      estadoCivil: ['', Validators.required],
      sexo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', AcnValidator.CPF]
    });
    // ...


    salvar() {
      if (this.frmCliente.valid) {
        //Do something
      }
    }
  }

}
```

Para mais detalhes e outros componentes customizados, clique [aqui](./../projects/acn/ui/README.md) para acessar a documentação da biblioteca **@acn/ui**.

## Referências

- [Angular - Reactive Forms](https://angular.io/guide/reactive-forms)
