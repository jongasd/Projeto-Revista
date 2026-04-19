const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");

router.get("/", comentarioController.listarTodos);
router.get("/noticia/:noticia_id", comentarioController.listarPorNoticia);
router.get("/:id", comentarioController.buscarPorId);
router.post("/", comentarioController.criar);
router.put("/:id", comentarioController.atualizar);
router.delete("/:id", comentarioController.excluir);

module.exports = router;
