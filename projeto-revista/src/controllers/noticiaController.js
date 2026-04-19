const noticiaService = require("../services/noticiaService");

/**
 * Controller de Notícia.
 * Responsabilidade única: receber requisição, chamar o service e devolver resposta HTTP.
 * Toda lógica de negócio e validação fica no service.
 */
const noticiaController = {
  listarTodas: async (req, res, next) => {
    try {
      const noticias = await noticiaService.listarTodas();
      res.json({ sucesso: true, dados: noticias, total: noticias.length });
    } catch (erro) {
      next(erro);
    }
  },

  buscarPorId: async (req, res, next) => {
    try {
      const noticia = await noticiaService.buscarPorId(req.params.id);
      res.json({ sucesso: true, dados: noticia });
    } catch (erro) {
      next(erro);
    }
  },

  criar: async (req, res, next) => {
    try {
      const novoId = await noticiaService.criar(req.body);
      res.status(201).json({
        sucesso: true,
        mensagem: "Notícia criada com sucesso",
        id: novoId,
      });
    } catch (erro) {
      next(erro);
    }
  },

  atualizar: async (req, res, next) => {
    try {
      await noticiaService.atualizar(req.params.id, req.body);
      res.json({ sucesso: true, mensagem: "Notícia atualizada com sucesso" });
    } catch (erro) {
      next(erro);
    }
  },

  excluir: async (req, res, next) => {
    try {
      await noticiaService.excluir(req.params.id);
      res.json({ sucesso: true, mensagem: "Notícia excluída com sucesso" });
    } catch (erro) {
      next(erro);
    }
  },
};

module.exports = noticiaController;
