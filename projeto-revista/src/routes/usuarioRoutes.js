const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/", usuarioController.listarTodos);
router.get("/:id", usuarioController.buscarPorId);
router.post("/", usuarioController.criar);
router.post("/login", usuarioController.login);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.excluir);

module.exports = router;
