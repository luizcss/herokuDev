import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cavalete } from "../models/cavalete";

const CAVALETES = [
    new Cavalete({
        id: 1,
        tipocavalete: 'Galvanizado',
        datacadastro: new Date('12/12/2000'),
        dataatualizacao: new Date('10/02/2002')
    }),

    new Cavalete({
        id: 2,
        tipocavalete: 'Metalico',
        datacadastro: new Date('10/13/2011'),
        dataatualizacao: new Date('05/01/2012')
    }),

    new Cavalete({
        id: 3,
        tipocavalete: 'Aluminio',
        datacadastro: new Date('07/20/2008'),
        dataatualizacao: new Date('05/20/2008')
    }),

    new Cavalete({
        id: 4,
        tipocavalete: 'Bronze',
        datacadastro: new Date('08/30/2009'),
        dataatualizacao: new Date('09/30/2009')
    }),

    new Cavalete({
        id: 5,
        tipocavalete: 'PVC',
        datacadastro: new Date('03/17/2002'),
        dataatualizacao: new Date('03/17/2002')
    }),

    new Cavalete({
        id: 6,
        tipocavalete: 'Madeira',
        datacadastro: new Date('02/27/2005'),
        dataatualizacao: new Date('02/28/2005')
    }),

    new Cavalete({
        id: 7,
        tipocavalete: 'Ferro Fundido',
        datacadastro: new Date('10/19/2020'),
        dataatualizacao: new Date('10/19/2020')
    }),

    new Cavalete({
        id: 8,
        tipocavalete: 'Liga de Aluminio',
        datacadastro: new Date('09/09/2020'),
        dataatualizacao: new Date('09/09/2020')
    }),
];

export abstract class CavaleteDataSource {
    abstract getAllCavaletes(search_query: string): Observable<{ cavaletes: Cavalete[] }>;
    abstract addCavalete(search_query: string): Observable<{ cavaletes: Cavalete[] }>;
}

@Injectable()
export class CavaletesDataSourceImpl extends CavaleteDataSource {
    addCavalete(search_query: string): Observable<{ cavaletes: Cavalete[]; }> {
        throw new Error("Method not implemented.");
    }
    private readonly PARTNER_URL = 'partner';

    constructor(
        //private _connectorService: HttpConnectorService,
    ) {
        super();
    }

    getAllCavaletes(search_query: string): Observable<{ cavaletes: Cavalete[] }> {

        return new Observable((subscriber) => {
            subscriber.next({ cavaletes: CAVALETES });
            subscriber.complete();
        });
    }
}
