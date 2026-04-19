const express = require("express");
const router = express.Router();
const noticiaController = require("../controllers/noticiaController");

router.get("/", noticiaController.listarTodas);
router.get("/:id", noticiaController.buscarPorId);
router.post("/", noticiaController.criar);
router.put("/:id", noticiaController.atualizar);
router.delete("/:id", noticiaController.excluir);

module.exports = router;
