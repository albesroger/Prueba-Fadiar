import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap, catchError } from 'rxjs';
import { Product } from '../model/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'https://app.fadiar.com:444/prueba/api';

  constructor(private http: HttpClient) {}

  /** GET /inventory_manager */
  getInventory(): Observable<Product[]> {
    return this.http
      .get<{ products?: Product[] }>(`${this.baseUrl}/inventory_manager`)
      .pipe(map((res) => res.products ?? []));
  }

  /** POST /img_mas_vendido (body: {} ) */
  getMostSoldImages(): Observable<Product[]> {
    return this.http.post<any>(`${this.baseUrl}/img_mas_vendido`, {}).pipe(
      tap((raw) => console.debug('getMostSoldImages raw response:', raw)),
      map((raw) => {
        // Normalizar varias formas de respuesta posibles
        if (!raw) return [] as Product[];
        if (Array.isArray(raw)) return raw as Product[];
        if (Array.isArray(raw.products)) return raw.products as Product[];
        if (Array.isArray(raw.data)) return raw.data as Product[];
        // Si viene en otra forma, intentar inferir
        const values = Object.values(raw).find((v) => Array.isArray(v));
        return (values as Product[]) || [];
      }),
      catchError((err) => {
        console.error('Error in getMostSoldImages HTTP call:', err);
        return of([] as Product[]);
      })
    );
  }
}
