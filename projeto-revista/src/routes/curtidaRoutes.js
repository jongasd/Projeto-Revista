const express = require("express");
const router = express.Router();
const curtidaController = require("../controllers/curtidaController");

router.get("/noticia/:noticia_id", curtidaController.listarPorNoticia);
router.post("/", curtidaController.alternarCurtida);

module.exports = router;
