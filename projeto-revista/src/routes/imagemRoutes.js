// src/routes/imagemRoutes.js
const express = require("express");
const router = express.Router();
const imagemController = require("../controllers/imagemController");
const upload = require("../middlewares/upload");
const { autenticar } = require("../middlewares/auth");

router.get("/", imagemController.listar);
router.get("/:id", imagemController.buscarPorId);
router.post("/", autenticar, upload.single("imagem"), imagemController.criar);
router.put("/:id", autenticar, upload.single("imagem"), imagemController.atualizar);
router.delete("/:id", autenticar, imagemController.deletar);

module.exports = router;
