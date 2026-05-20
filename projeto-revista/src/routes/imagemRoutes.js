// src/routes/imagemRoutes.js

const express = require("express");

const router = express.Router();

const imagemController = require("../controllers/imagemController");

const upload = require("../middlewares/upload");

router.get("/", imagemController.listar);

router.get("/:id", imagemController.buscarPorId);

router.post("/", upload.single("imagem"), imagemController.criar);

router.put("/:id", upload.single("imagem"), imagemController.atualizar);

router.delete("/:id", imagemController.deletar);

module.exports = router;
