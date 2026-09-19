const express = require("express");
const router = express.Router();
const favoritarController = require("../controllers/favoritarController");
const { autenticar } = require("../middlewares/auth");

router.get("/usuario/:usuario_id", favoritarController.listarPorUsuario);
router.post("/", autenticar, favoritarController.alternarFavorito);

module.exports = router;
