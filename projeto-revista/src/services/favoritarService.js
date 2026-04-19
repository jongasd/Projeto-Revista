const Favoritar = require("../models/favoritar");
const AppError = require("../utils/AppError");

const parseId = (id) => {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return parsed;
};

const favoritarService = {
  listarPorUsuario: (usuario_id) => {
    const idValido = parseId(usuario_id);
    return Favoritar.findByUsuario(idValido);
  },

  /**
   * Toggle de favorito: se já favoritou, remove. Se não, adiciona.
   */
  alternarFavorito: async (body) => {
    const { usuario_id, noticia_id } = body;

    if (!usuario_id || !noticia_id) {
      throw new AppError(
        "Campos obrigatórios ausentes: usuario_id, noticia_id",
        400,
      );
    }

    const usuario_idValido = parseId(usuario_id);
    const noticia_idValido = parseId(noticia_id);

    const favoritoExistente = await Favoritar.findByUsuarioENoticia(
      usuario_idValido,
      noticia_idValido,
    );

    if (favoritoExistente) {
      await Favoritar.delete(favoritoExistente.id);
      return { acao: "removido" };
    }

    const novoId = await Favoritar.create({
      usuario_id: usuario_idValido,
      noticia_id: noticia_idValido,
    });

    return { acao: "adicionado", id: novoId };
  },
};

module.exports = favoritarService;
