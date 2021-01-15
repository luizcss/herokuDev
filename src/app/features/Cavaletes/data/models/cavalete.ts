import { ICavaleteEntity } from "../../domain/entities/cavalete.entity";

  
  let nextId = 1;
  
  export class Cavalete implements ICavaleteEntity {
  
    id: number;
    tipocavalete: string;
    datacadastro: Date;
    dataatualizacao: Date;
  
    constructor(cavalete: any
      ) {
        this.id = (cavalete && cavalete.id) || 0;
        this.tipocavalete = (cavalete && cavalete.tipocavalete) || null;
        this.datacadastro = (cavalete && cavalete.datacadastro) || new Date();
        this.dataatualizacao = (cavalete && cavalete.dataatualizacao) || new Date();
      }
  }