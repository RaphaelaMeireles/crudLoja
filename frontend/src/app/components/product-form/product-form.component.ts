import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp'];
const TAMANHO_MAXIMO = 2 * 1024 * 1024;

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  product: Product = { nome: '', marca: '' };
  id?: number;
  imagemFile: File | null = null;
  preview: string | null = null;
  erroImagem = '';
  erroSalvar = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = Number(paramId);
      this.productService.getById(this.id).subscribe((product) => {
        this.product = product;
        this.preview = this.productService.imageUrl(product.imagem_url);
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.erroImagem = '';

    if (!TIPOS_PERMITIDOS.includes(file.type)) {
      this.erroImagem = 'Formato invalido. Use JPG, PNG ou WEBP.';
      input.value = '';
      return;
    }
    if (file.size > TAMANHO_MAXIMO) {
      this.erroImagem = 'A imagem deve ter no maximo 2MB.';
      input.value = '';
      return;
    }

    this.imagemFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.preview = reader.result as string);
    reader.readAsDataURL(file);
  }

  save(): void {
    this.erroSalvar = '';
    const request = this.id
      ? this.productService.update(this.id, this.product, this.imagemFile)
      : this.productService.create(this.product, this.imagemFile);

    request.subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) =>
        (this.erroSalvar = err?.error?.error ?? 'Erro ao salvar o produto.'),
    });
  }
}
