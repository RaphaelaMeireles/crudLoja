import { NextFunction, Request, Response } from "express";
import * as productService from "../services/product.service";
import { removeFile } from "../config/upload";
import { CreateProductDTO } from "../types/product";

export async function index(req: Request, res: Response): Promise<void> {
  const { nome, status } = req.query;
  const filters: { nome?: string; status?: boolean } = {};
  if (nome) filters.nome = String(nome);
  if (status !== undefined) filters.status = status === "true";

  const products = await productService.listProducts(filters);
  res.json(products);
}

export async function show(req: Request, res: Response): Promise<void> {
  const product = await productService.getProduct(Number(req.params.id));
  res.json(product);
}

export async function store(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const product = await productService.createProduct(parseBody(req));
    res.status(201).json(product);
  } catch (err) {
    if (req.file) removeFile(`/uploads/${req.file.filename}`);
    next(err);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const product = await productService.updateProduct(
      Number(req.params.id),
      parseBody(req),
    );
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function patch(req: Request, res: Response): Promise<void> {
  const product = await productService.patchProduct(
    Number(req.params.id),
    req.body,
  );
  res.json(product);
}

export async function destroy(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await productService.deleteProduct(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

function parseBody(req: Request): CreateProductDTO {
  const { nome, marca, valor, status } = req.body;
  return {
    nome,
    marca,
    valor: Number(valor) || 0,
    status: status === "true" || status === true,
    imagem_url: req.file ? `/uploads/${req.file.filename}` : undefined,
  };
}
