import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import { MulterError } from "multer";
import { UPLOADS_DIR } from "./config/upload";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));
app.use("/api", productRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof MulterError) {
    const msg =
      err.code === "LIMIT_FILE_SIZE"
        ? "A imagem deve ter no maximo 2MB."
        : err.message;
    res.status(400).json({ error: msg });
    return;
  }
  if ((err as any).status === 400) {
    res.status(400).json({ error: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Erro interno no servidor" });
});

export default app;
