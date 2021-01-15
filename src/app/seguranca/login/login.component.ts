import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'cad-rec-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginFormComponent {

  login_validation_messages = {
    'usuario': [
      { type: 'required', message: 'Campo usuário é obrigatório' }
    ],
    'senha':[
      { type: 'required', message: 'Campo senha é obrigatório'}
    ]
  }

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.createForm();
   }

  createForm() {
    this.loginForm = this.fb.group({
      usuario: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    })
  }

  login() {
    this.auth.login(this.loginForm.value.usuario, this.loginForm.value.senha)
      .then(() => {
        this.router.navigate(['/esgotamentos']);
      })
      .catch(erro => {
        if (erro.status === 400) {
          if (erro.error.error === 'invalid_grant') {
            this.error = 'Usuário ou senha invalida'
          }
        } else {
          this.error = erro.error.error_description
        }

  });

}

submit() {
  if (this.loginForm.valid) {
    this.submitEM.emit(this.loginForm.value);
  }
}
@Input() error: string | null | undefined;

@Output() submitEM = new EventEmitter();

}
