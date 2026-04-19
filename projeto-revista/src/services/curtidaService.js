const Curtida = require("../models/curtida");
const AppError = require("../utils/AppError");

const parseId = (id) => {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return parsed;
};

const curtidaService = {
  listarPorNoticia: async (noticia_id) => {
    const idValido = parseId(noticia_id);
    const curtidas = await Curtida.findByNoticia(idValido);
    const total = await Curtida.contarPorNoticia(idValido);
    return { curtidas, total };
  },

  /**
   * Toggle de curtida: se já curtiu, remove. Se não curtiu, adiciona.
   */
  alternarCurtida: async (body) => {
    const { usuario_id, noticia_id } = body;

    if (!usuario_id || !noticia_id) {
      throw new AppError(
        "Campos obrigatórios ausentes: usuario_id, noticia_id",
        400,
      );
    }

    const usuario_idValido = parseId(usuario_id);
    const noticia_idValido = parseId(noticia_id);

    const curtidaExistente = await Curtida.findByUsuarioENoticia(
      usuario_idValido,
      noticia_idValido,
    );

    if (curtidaExistente) {
      await Curtida.delete(curtidaExistente.id);
      return { acao: "removida" };
    }

    const novoId = await Curtida.create({
      usuario_id: usuario_idValido,
      noticia_id: noticia_idValido,
    });

    return { acao: "adicionada", id: novoId };
  },
};

module.exports = curtidaService;
