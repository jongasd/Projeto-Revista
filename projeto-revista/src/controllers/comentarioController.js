const comentarioService = require("../services/comentarioService");

const comentarioController = {
  listarTodos: async (req, res, next) => {
    try {
      const comentarios = await comentarioService.listarTodos();
      res.json({
        sucesso: true,
        dados: comentarios,
        total: comentarios.length,
      });
    } catch (erro) {
      next(erro);
    }
  },

  listarPorNoticia: async (req, res, next) => {
    try {
      const comentarios = await comentarioService.listarPorNoticia(
        req.params.noticia_id,
      );
      res.json({
        sucesso: true,
        dados: comentarios,
        total: comentarios.length,
      });
    } catch (erro) {
      next(erro);
    }
  },

  buscarPorId: async (req, res, next) => {
    try {
      const comentario = await comentarioService.buscarPorId(req.params.id);
      res.json({ sucesso: true, dados: comentario });
    } catch (erro) {
      next(erro);
    }
  },

  criar: async (req, res, next) => {
    try {
      const novoId = await comentarioService.criar(req.body);
      res.status(201).json({
        sucesso: true,
        mensagem: "Comentário criado com sucesso",
        id: novoId,
      });
    } catch (erro) {
      next(erro);
    }
  },

  atualizar: async (req, res, next) => {
    try {
      await comentarioService.atualizar(req.params.id, req.body);
      res.json({
        sucesso: true,
        mensagem: "Comentário atualizado com sucesso",
      });
    } catch (erro) {
      next(erro);
    }
  },

  excluir: async (req, res, next) => {
    try {
      await comentarioService.excluir(req.params.id);
      res.json({ sucesso: true, mensagem: "Comentário excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  },
};

module.exports = comentarioController;
