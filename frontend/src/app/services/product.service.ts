import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:3000';
  private apiUrl = `${this.baseUrl}/api/products`;

  constructor(private http: HttpClient) {}

  imageUrl(path?: string | null): string | null {
    return path ? `${this.baseUrl}${path}` : null;
  }

  private toFormData(product: Product, file?: File | null): FormData {
    const form = new FormData();
    form.append('nome', product.nome);
    form.append('marca', product.marca);
    form.append('valor', String(product.valor ?? 0));
    form.append('status', String(!!product.status));
    if (file) form.append('imagem', file);
    return form;
  }

  list(filters?: { nome?: string; status?: boolean }): Observable<Product[]> {
    let params = new HttpParams();
    if (filters?.nome) params = params.set('nome', filters.nome);
    if (filters?.status !== undefined)
      params = params.set('status', String(filters.status));
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(product: Product, file?: File | null): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, this.toFormData(product, file));
  }

  update(
    id: number,
    product: Product,
    file?: File | null,
  ): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/${id}`,
      this.toFormData(product, file),
    );
  }

  patch(id: number, fields: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, fields);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
