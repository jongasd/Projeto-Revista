const express = require("express");
const router = express.Router();
const curtidaController = require("../controllers/curtidaController");
const { autenticar } = require("../middlewares/auth");

router.get("/noticia/:noticia_id", curtidaController.listarPorNoticia);
router.post("/", autenticar, curtidaController.alternarCurtida);

module.exports = router;
