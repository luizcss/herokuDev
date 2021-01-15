import { Observable } from 'rxjs';
import { ICavaleteEntity } from '../entities/cavalete.entity';

export abstract class CavaletesRepository {
  abstract getAllCavaletes(search_query: string): Observable<{ cavaletes: ICavaleteEntity[] }>;
}