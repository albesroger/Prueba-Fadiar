import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductSearchService {
  // estado interno del término de búsqueda
  private readonly _term$ = new BehaviorSubject<string>('');

  // observable público (solo lectura)
  readonly term$ = this._term$.asObservable();

  // setter para actualizar el término
  setTerm(term: string) {
    this._term$.next(term);
  }

  // opcional: obtener el valor actual
  get currentTerm(): string {
    return this._term$.value;
  }
}
