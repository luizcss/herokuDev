# Testes Unitários: Pipes

[Pipes](./ANGULAR_ARQT_FRAMEWORK.md) são funções que são capazes de transformar dados recebidos em um formato que seja legível para o usuário. O pipe abaixo realiza a formatação de CPF numa string:


```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'cpfPipe'})
export class CpfPipe implements PipeTransform {
  transform(value: string): string {
  	if (value && value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  }
}
```

Para a realização de testes com pipes, sua instância é inicializada no método **beforeEach()**  e suas validações de funções são realizadas dentro dos *specs*. Neste caso, é recomendável utilizar matchers como **.toEqual** para comparar as saídas. Um exemplo de teste pode ser visualizado abaixo:

```ts
import { CpfPipe } from './cpf.pipe';

describe('CpfPipe', () => {
  let pipe: CpfPipe;
  
  beforeEach(() => {
    pipe = new CpfPipe();
  });

  it('transforms cpf to cpfPipe', () => {
    const cpf = '33366699911';
    expect(pipe.transform(cpf)).toEqual('333.666.999-11');
  });

  it('undefined values', () => {
    expect(pipe.transform()).toEqual();
  });

  it('invalid values', () => {
    expect(pipe.transform('123')).toEqual('123');
  });
});
```