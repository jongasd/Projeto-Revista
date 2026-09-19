const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");
const { autenticar, autorizar } = require("../middlewares/auth");

router.get("/", categoriaController.listarTodas);
router.get("/:id", categoriaController.buscarPorId);
router.post("/", autenticar, autorizar("admin", "professor"), categoriaController.criar);
router.put("/:id", autenticar, autorizar("admin", "professor"), categoriaController.atualizar);
router.delete("/:id", autenticar, autorizar("admin", "professor"), categoriaController.excluir);

module.exports = router;
