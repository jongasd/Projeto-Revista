// src/routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const uploadController = require("../controllers/uploadController");

// POST /upload/noticia/:id  →  Envia campo "imagem" no FormData
router.post(
  "/noticia/:id",
  upload.single("imagem"),
  uploadController.uploadCapaNoticia,
);

// POST /upload/perfil/:id  →  Envia campo "imagem" no FormData
router.post(
  "/perfil/:id",
  upload.single("imagem"),
  uploadController.uploadFotoPerfil,
);

module.exports = router;
