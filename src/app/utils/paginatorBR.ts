import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable()
export class PaginatorBR extends MatPaginatorIntl {

    itemsPerPageLabel = 'Itens por página';
    nextPageLabel = 'Próxima';
    previousPageLabel = 'Anterior';
    firstPageLabel = 'Primeira página';
    lastPageLabel = 'Última página';

}