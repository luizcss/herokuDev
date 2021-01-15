import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ICavaleteEntity } from "../entities/cavalete.entity";
import { CavaletesRepository } from "../repositories/cavaletes.repository";

@Injectable({
    providedIn: 'root',
  })
  export class GetAllCavaletesUseCase {
  
    constructor(private cavaletesRepository: CavaletesRepository) { }
  
    execute(search_query: string = null): Observable<{ cavaletes: ICavaleteEntity[] }> {
      return this.cavaletesRepository.getAllCavaletes(search_query);
    }
  }