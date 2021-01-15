import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICavaleteEntity } from "../../domain/entities/cavalete.entity";
import { CavaletesRepository } from "../../domain/repositories/cavaletes.repository";
import { CavaleteDataSource } from "../datasources/cavaletes.data-sources";

@Injectable()
export class CavaletesRepositoryImpl extends CavaletesRepository {
  constructor(
    private cavaletesDataSource: CavaleteDataSource,
  ) { super();}

  getAllCavaletes(search_query: string = null): Observable<{ cavaletes: ICavaleteEntity[] }> {
    return this.cavaletesDataSource.getAllCavaletes(search_query);
  }
}
