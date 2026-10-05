/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
describe('ProductListComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductListComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=product-list.component.spec.js.map