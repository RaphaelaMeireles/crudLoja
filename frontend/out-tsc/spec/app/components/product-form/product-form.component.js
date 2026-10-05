import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
let ProductFormComponent = class ProductFormComponent {
    productService;
    route;
    router;
    product = { nome: '', descricao: '' };
    id;
    constructor(productService, route, router) {
        this.productService = productService;
        this.route = route;
        this.router = router;
    }
    ngOnInit() {
        const paramId = this.route.snapshot.paramMap.get('id');
        if (paramId) {
            this.id = Number(paramId);
            this.productService
                .getById(this.id)
                .subscribe((product) => (this.product = product));
        }
    }
    save() {
        const request = this.id
            ? this.productService.update(this.id, this.product)
            : this.productService.create(this.product);
        request.subscribe(() => this.router.navigate(['/']));
    }
};
ProductFormComponent = __decorate([
    Component({
        selector: 'app-product-form',
        standalone: true,
        imports: [CommonModule, FormsModule, RouterLink],
        templateUrl: './product-form.component.html',
    })
], ProductFormComponent);
export { ProductFormComponent };
//# sourceMappingURL=product-form.component.js.map