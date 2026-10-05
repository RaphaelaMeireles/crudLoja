import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
let ProductService = class ProductService {
    http;
    apiUrl = 'http://localhost:3000/api/products';
    constructor(http) {
        this.http = http;
    }
    list(filters) {
        let params = new HttpParams();
        if (filters?.nome)
            params = params.set('nome', filters.nome);
        if (filters?.status !== undefined)
            params = params.set('status', String(filters.status));
        return this.http.get(this.apiUrl, { params });
    }
    getById(id) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    create(product) {
        return this.http.post(this.apiUrl, product);
    }
    update(id, product) {
        return this.http.put(`${this.apiUrl}/${id}`, product);
    }
    patch(id, fields) {
        return this.http.patch(`${this.apiUrl}/${id}`, fields);
    }
    delete(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
};
ProductService = __decorate([
    Injectable({ providedIn: 'root' })
], ProductService);
export { ProductService };
//# sourceMappingURL=product.service.js.map