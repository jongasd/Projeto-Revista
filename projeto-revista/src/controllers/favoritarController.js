const favoritarService = require("../services/favoritarService");

const favoritarController = {
  listarPorUsuario: async (req, res, next) => {
    try {
      const favoritos = await favoritarService.listarPorUsuario(
        req.params.usuario_id,
      );
      res.json({ sucesso: true, dados: favoritos, total: favoritos.length });
    } catch (erro) {
      next(erro);
    }
  },

  alternarFavorito: async (req, res, next) => {
    try {
      const resultado = await favoritarService.alternarFavorito(req.body);
      res.json({
        sucesso: true,
        mensagem: `Favorito ${resultado.acao} com sucesso`,
        ...resultado,
      });
    } catch (erro) {
      next(erro);
    }
  },
};

module.exports = favoritarController;
