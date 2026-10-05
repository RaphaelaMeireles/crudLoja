import { TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
describe('ProductFormComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductFormComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(ProductFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=product-form.component.spec.js.map