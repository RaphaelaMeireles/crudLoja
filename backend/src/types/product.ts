export interface Product {
  id: number;
  nome: string;
  marca: string;
  valor: number;
  status: boolean;
  imagem_url: string | null;
  created_at: Date;
}

export interface ProductFilters {
  nome?: string;
  status?: boolean;
}

export interface CreateProductDTO {
  nome: string;
  marca: string;
  valor: number;
  status?: boolean;
  imagem_url?: string | null;
}
