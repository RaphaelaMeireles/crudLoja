export interface Product {
  id?: number;
  nome: string;
  marca: string;
  valor?: number;
  status?: boolean;
  imagem_url?: string | null;
  create_at?: string;
}
