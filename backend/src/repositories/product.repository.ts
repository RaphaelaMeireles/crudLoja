import pool from "../config/database";
import { Product, ProductFilters, CreateProductDTO } from "../types/product";

export async function findAll(
  filters: ProductFilters = {},
): Promise<Product[]> {
  let query = "SELECT * FROM products WHERE 1=1";
  const values: unknown[] = [];

  if (filters.nome) {
    values.push(`%${filters.nome}%`);
    query += ` AND nome ILIKE $${values.length}`;
  }
  if (filters.status !== undefined) {
    values.push(filters.status);
    query += ` AND status = $${values.length}`;
  }

  query += " ORDER BY id";
  const result = await pool.query(query, values);
  return result.rows;
}

export async function findById(id: number): Promise<Product | undefined> {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
}

export async function create(data: CreateProductDTO): Promise<Product> {
  const { nome, marca, valor, status, imagem_url } = data;
  const result = await pool.query(
    `INSERT INTO products (nome, marca, valor, status, imagem_url)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nome, marca, valor, status, imagem_url ?? null],
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: CreateProductDTO,
): Promise<Product> {
  const { nome, marca, valor, status, imagem_url } = data;
  const result = await pool.query(
    `UPDATE products
     SET nome=$1, marca=$2, valor=$3, status=$4, imagem_url=COALESCE($5, imagem_url)
     WHERE id=$6 RETURNING *`,
    [nome, marca, valor, status, imagem_url ?? null, id],
  );
  return result.rows[0];
}

export async function patch(
  id: number,
  fields: Partial<CreateProductDTO>,
): Promise<Product> {
  const keys = Object.keys(fields) as (keyof CreateProductDTO)[];
  const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");
  const values = [...keys.map((k) => fields[k]), id];

  const result = await pool.query(
    `UPDATE products SET ${sets} WHERE id = $${values.length} RETURNING *`,
    values,
  );
  return result.rows[0];
}

export async function remove(id: number): Promise<void> {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
}
