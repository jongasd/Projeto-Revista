const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");
const { autenticar } = require("../middlewares/auth");

router.get("/", comentarioController.listarTodos);
router.get("/noticia/:noticia_id", comentarioController.listarPorNoticia);
router.get("/:id", comentarioController.buscarPorId);
router.post("/", autenticar, comentarioController.criar);
router.put("/:id", autenticar, comentarioController.atualizar);
router.delete("/:id", autenticar, comentarioController.excluir);

module.exports = router;
