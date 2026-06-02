// src/controllers/imagemController.js

const imagemService = require("../services/imagemService");

const imagemController = {
  async listar(req, res, next) {
    try {
      const imagens = await imagemService.listar();

      res.json({
        sucesso: true,
        quantidade: imagens.length,
        dados: imagens,
      });
    } catch (error) {
      next(error);
    }
  },

  async buscarPorId(req, res, next) {
    try {
      const imagem = await imagemService.buscarPorId(req.params.id);

      res.json({
        sucesso: true,
        dados: imagem,
      });
    } catch (error) {
      next(error);
    }
  },

  async criar(req, res, next) {
    try {
      const imagem = await imagemService.criar(req.body, req.file);

      res.status(201).json({
        sucesso: true,
        dados: imagem,
      });
    } catch (error) {
      next(error);
    }
  },

  async atualizar(req, res, next) {
    try {
      const imagem = await imagemService.atualizar(
        req.params.id,
        req.body,
        req.file,
      );

      res.json({
        sucesso: true,
        dados: imagem,
      });
    } catch (error) {
      next(error);
    }
  },

  async deletar(req, res, next) {
    try {
      await imagemService.deletar(req.params.id);

      res.json({
        sucesso: true,
        mensagem: "Imagem removida",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = imagemController;
