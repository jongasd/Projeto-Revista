const express = require("express");
const router = express.Router();
const noticiaController = require("../controllers/noticiaController");
const { autenticar } = require("../middlewares/auth");

router.get("/", noticiaController.listarTodas);
router.get("/:id", noticiaController.buscarPorId);
router.post("/", autenticar, noticiaController.criar);
router.put("/:id", autenticar, noticiaController.atualizar);
router.delete("/:id", autenticar, noticiaController.excluir);

module.exports = router;
