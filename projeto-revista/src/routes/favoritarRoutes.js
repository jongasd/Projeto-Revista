const express = require("express");
const router = express.Router();
const favoritarController = require("../controllers/favoritarController");

router.get("/usuario/:usuario_id", favoritarController.listarPorUsuario);
router.post("/", favoritarController.alternarFavorito);

module.exports = router;
