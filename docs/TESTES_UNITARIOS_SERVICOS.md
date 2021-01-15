# Testes Unitários: Serviços

Nesta seção iremos exemplificar sobre como escrever o teste unitário de Serviços. Para a realização desses testes é recomendável utilizar Mocks, sem a utilização do TestBed pois Serviços (na maioria das vezes) não precisam de todas as dependências carregadas por este. Mocks são utilizados para isolarem requisições que a classe pode fazer para outros componentes e serviços, sem que seja necessário criar um novo módulo.

**Service**

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClienteModel, EstadoCivilModel } from './models';
import { ConfigurationModel } from '@acn/angular';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

    constructor(
        private http: HttpClient,
        @Inject('config') private config: ConfigurationModel
    ) { }

    salvar(model: ClienteModel): Observable<any> {
        if (model.id) {
            return this.http.put(this.config.api + '/cliente/' + model.id, model);
        } else {
            return this.http.post(this.config.api + '/cliente', model);
        }
    }

    get(id: number): Observable<ClienteModel> {
        return this.http.get(this.config.api + '/clientes/' + id).pipe(
            map((item: any) => item.cliente)
        );
    }

    listar(): Observable<ClienteModel[]> {
        return this.http.get(this.config.api + '/clientes').pipe(
            map((item: any) => item.clientes)
        );
    }

    excluir(id: number): Observable<any> {
        return this.http.delete(this.config.api + '/clientes/' + id);
    }

    getListaEstadoCivil(): Observable<EstadoCivilModel[]> {
        return this.http.get(this.config.api + '/estadoCivil').pipe(
            map((item: any) => item.estadoCivil)
        );
    }
}

```

**Teste do Service**

```ts
import { ClientesService } from './clientes.service';
import { ClienteModel, EstadoCivilModel } from './models';
import { of } from 'rxjs';

describe('ClientesService', () => {

  let clientesService: ClientesService,
    httpClientSpy,
    mockConfig;

  beforeEach(() => {
    httpClientSpy = {get: jest.fn(), put: jest.fn(), post: jest.fn(), delete: jest.fn()};
    mockConfig = { api: 'example' };
    clientesService = new ClientesService(httpClientSpy, mockConfig);
  });

  describe('Salvar', () => {

    it('Sem id', () => {
      const cliente: ClienteModel = {
        id: undefined,
        nome: 'Ana',
        email: 'ana@example.com',
        estadoCivil: 'solteira',
        sexo: 'feminino',
        dataNascimento: new Date(1998, 6, 3),
        cpf: '33366699911'
      };

      httpClientSpy.post.mockReturnValue(of(true));
      clientesService.salvar(cliente);
      expect(httpClientSpy.post).
        toHaveBeenCalledWith(mockConfig.api + '/cliente', cliente);
    });

    it('Com id', () => {
      const cliente: ClienteModel = {
        id: 333666,
        nome: 'Igor',
        email: 'igor@example.com',
        estadoCivil: 'solteiro',
        sexo: 'masculino',
        dataNascimento: new Date(1998, 6, 2),
        cpf: '12366699911'
      };

      httpClientSpy.put.mockReturnValue(of(true));
      clientesService.salvar(cliente);
      expect(httpClientSpy.put).
        toHaveBeenCalledWith(mockConfig.api + '/cliente/' + cliente.id, cliente);
    });
  });

  describe('Recuperar informações', () => {

    it('Cliente com Id', () => {
      const cliente: ClienteModel = {
        id: 333666,
        nome: 'Igor',
        email: 'igor@example.com',
        estadoCivil: 'solteiro',
        sexo: 'masculino',
        dataNascimento: new Date(1998, 6, 2),
        cpf: '12366699911'
      };

      httpClientSpy.get.mockReturnValue(of(
        { 'cliente': cliente }));

      clientesService.get(cliente.id).subscribe(
        (resCliente) => {
          expect(resCliente).toBe(cliente);
          expect(httpClientSpy.get).toHaveBeenCalledWith(mockConfig.api + '/clientes/' + cliente.id);
        }
      );
    });

    it('Lista Clientes ', () => {
      const cliente: ClienteModel = {
        id: 333666,
        nome: 'Igor',
        email: 'igor@example.com',
        estadoCivil: 'Solteiro',
        sexo: 'masculino',
        dataNascimento: new Date(1998, 6, 2),
        cpf: '12366699911'
      };

      const cliente2: ClienteModel = {
        id: 444777,
        nome: 'Roberta',
        email: 'robeta@example.com',
        estadoCivil: 'Casado',
        sexo: 'femininp',
        dataNascimento: new Date(1998, 6, 2),
        cpf: '19012399040'
      };
      const clientes = [cliente, cliente2];

      httpClientSpy.get.mockReturnValue(of(
        { 'clientes': clientes }));

      clientesService.listar().subscribe(
        (resCliente) => {
          expect(resCliente).toBe(clientes);
          expect(httpClientSpy.get).toHaveBeenCalledWith(mockConfig.api + '/clientes');
        }
      );
    });

    it('Lista de estado civil', () => {

      const listaEstadoCivil = [{ id: 1, nome: 'Solteiro' }, { id: 2, nome: 'Casado' }];

      httpClientSpy.get.mockReturnValue(of(
        { 'estadoCivil': listaEstadoCivil }));

      clientesService.getListaEstadoCivil().subscribe(
        (resCliente) => {
          expect(resCliente).toBe(listaEstadoCivil);
          expect(httpClientSpy.get).toHaveBeenCalledWith(mockConfig.api + '/estadoCivil');
        }
      );
    });
  });

  describe('Remover', () => {
    it('Cliente pelo Id', () => {

      httpClientSpy.delete.mockReturnValue(of(true));

      clientesService.excluir(3).subscribe(
        () => {
          expect(httpClientSpy.delete).toHaveBeenCalledWith(mockConfig.api + '/clientes/' + 3);
        }
      );
    });
  });
});
```
