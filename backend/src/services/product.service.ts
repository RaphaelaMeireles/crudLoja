import * as productRepository from "../repositories/product.repository";
import { Product, ProductFilters, CreateProductDTO } from "../types/product";
import { removeFile } from "../config/upload"; // <- novo import

export async function listProducts(
  filters: ProductFilters,
): Promise<Product[]> {
  return productRepository.findAll(filters);
}

export async function getProduct(id: number): Promise<Product> {
  const product = await productRepository.findById(id);
  if (!product) {
    throw new Error("Produto nao encontrado");
  }
  return product;
}

export async function createProduct(data: CreateProductDTO): Promise<Product> {
  return productRepository.create(data);
}

export async function updateProduct(
  id: number,
  data: CreateProductDTO,
): Promise<Product> {
  const atual = await getProduct(id);
  const updated = await productRepository.update(id, data);
  if (data.imagem_url && atual.imagem_url) removeFile(atual.imagem_url);
  return updated;
}

export async function patchProduct(
  id: number,
  fields: Partial<CreateProductDTO>,
): Promise<Product> {
  await getProduct(id);
  return productRepository.patch(id, fields);
}

export async function deleteProduct(id: number): Promise<void> {
  const atual = await getProduct(id);
  await productRepository.remove(id);
  removeFile(atual.imagem_url);
}
