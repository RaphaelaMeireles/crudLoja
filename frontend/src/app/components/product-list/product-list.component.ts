import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchName = '';

  constructor(private productService: ProductService) {}

  imageUrl(path?: string | null): string | null {
    return this.productService.imageUrl(path);
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.productService
      .list({ nome: this.searchName })
      .subscribe((products) => (this.products = products));
  }

  remove(id: number): void {
    this.productService.delete(id).subscribe(() => this.load());
  }
}
