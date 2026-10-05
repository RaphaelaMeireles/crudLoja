import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
let ProductListComponent = class ProductListComponent {
    productService;
    products = [];
    searchName = '';
    constructor(productService) {
        this.productService = productService;
    }
    ngOnInit() {
        this.load();
    }
    load() {
        this.productService
            .list({ nome: this.searchName })
            .subscribe((products) => (this.products = products));
    }
    remove(id) {
        this.productService.delete(id).subscribe(() => this.load());
    }
};
ProductListComponent = __decorate([
    Component({
        selector: 'app-product-list',
        standalone: true,
        imports: [CommonModule, FormsModule, RouterLink],
        templateUrl: './product-list.component.html',
    })
], ProductListComponent);
export { ProductListComponent };
//# sourceMappingURL=product-list.component.js.map