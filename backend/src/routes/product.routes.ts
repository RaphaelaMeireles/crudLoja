import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { upload } from "../config/upload";

const router = Router();

router.get("/products", productController.index);
router.get("/products/:id", productController.show);
router.post("/products", upload.single("imagem"), productController.store);
router.put("/products/:id", upload.single("imagem"), productController.update);
router.patch("/products/:id", productController.patch);
router.delete("/products/:id", productController.destroy);

export default router;
