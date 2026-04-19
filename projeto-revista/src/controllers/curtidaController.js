const curtidaService = require("../services/curtidaService");

const curtidaController = {
  listarPorNoticia: async (req, res, next) => {
    try {
      const { curtidas, total } = await curtidaService.listarPorNoticia(
        req.params.noticia_id,
      );
      res.json({ sucesso: true, dados: curtidas, total });
    } catch (erro) {
      next(erro);
    }
  },

  alternarCurtida: async (req, res, next) => {
    try {
      const resultado = await curtidaService.alternarCurtida(req.body);
      res.json({
        sucesso: true,
        mensagem: `Curtida ${resultado.acao} com sucesso`,
        ...resultado,
      });
    } catch (erro) {
      next(erro);
    }
  },
};

module.exports = curtidaController;
