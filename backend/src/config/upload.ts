import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const EXTENSOES = [".jpg", ".jpeg", ".png", ".webp"];
const MIMES = ["image/jpeg", "image/png", "image/webp"];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!EXTENSOES.includes(ext) || !MIMES.includes(file.mimetype)) {
      const err = new Error(
        "Formato de imagem invalido. Use JPG, PNG ou WEBP.",
      );
      (err as any).status = 400;
      return cb(err);
    }
    cb(null, true);
  },
});

export function removeFile(imagemUrl?: string | null): void {
  if (!imagemUrl) return;
  const file = path.join(UPLOADS_DIR, path.basename(imagemUrl));
  fs.unlink(file, () => {});
}
