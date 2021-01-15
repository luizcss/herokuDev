import { ICavaleteEntity } from './domain/entities/cavalete.entity';
import { Observable } from 'rxjs';
import { GetAllCavaletesUseCase } from './domain/usecases/get-all-cavaletes.usecase';
import { Injectable } from '@angular/core';

@Injectable()
export class CavaleteService {

  constructor(
    private _getAllCavaletesUseCase: GetAllCavaletesUseCase
  ) { }

  getCavaletes(
    keySearch: string = null,
  ): Observable<{cavaletes: ICavaleteEntity[]}>{
    return this._getAllCavaletesUseCase.execute(keySearch);
  }
}
