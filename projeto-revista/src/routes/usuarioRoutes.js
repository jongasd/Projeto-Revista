const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { autenticar } = require("../middlewares/auth");

router.get("/", usuarioController.listarTodos);
router.get("/:id", usuarioController.buscarPorId);
router.post("/", usuarioController.criar); // cadastro — público
router.post("/login", usuarioController.login); // login — público
router.put("/:id", autenticar, usuarioController.atualizar);
router.delete("/:id", autenticar, usuarioController.excluir);

module.exports = router;
