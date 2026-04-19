const Comentario = require("../models/comentario");
const AppError = require("../utils/AppError");

const parseId = (id) => {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return parsed;
};

const comentarioService = {
  listarTodos: () => Comentario.findAll(),

  listarPorNoticia: (noticia_id) => {
    const idValido = parseId(noticia_id);
    return Comentario.findByNoticia(idValido);
  },

  buscarPorId: async (id) => {
    const idValido = parseId(id);
    const comentario = await Comentario.findById(idValido);

    if (!comentario) {
      throw new AppError("Comentário não encontrado", 404);
    }

    return comentario;
  },

  criar: async (body) => {
    const { usuario_id, noticia_id, conteudo } = body;

    if (!usuario_id || !noticia_id || !conteudo) {
      throw new AppError(
        "Campos obrigatórios ausentes: usuario_id, noticia_id, conteudo",
        400,
      );
    }

    const conteudoSanitizado = String(conteudo).trim();

    if (conteudoSanitizado.length < 2) {
      throw new AppError("O comentário deve ter ao menos 2 caracteres", 400);
    }

    if (conteudoSanitizado.length > 240) {
      throw new AppError(
        "O comentário não pode ter mais de 240 caracteres",
        400,
      );
    }

    return await Comentario.create({
      usuario_id: Number(usuario_id),
      noticia_id: Number(noticia_id),
      conteudo: conteudoSanitizado,
    });
  },

  atualizar: async (id, body) => {
    const idValido = parseId(id);

    const comentario = await Comentario.findById(idValido);
    if (!comentario) {
      throw new AppError("Comentário não encontrado", 404);
    }

    const { conteudo } = body;
    if (!conteudo || String(conteudo).trim() === "") {
      throw new AppError("O campo conteudo é obrigatório", 400);
    }

    const conteudoSanitizado = String(conteudo).trim();

    if (conteudoSanitizado.length > 240) {
      throw new AppError(
        "O comentário não pode ter mais de 240 caracteres",
        400,
      );
    }

    await Comentario.update(idValido, { conteudo: conteudoSanitizado });
  },

  excluir: async (id) => {
    const idValido = parseId(id);
    const resultado = await Comentario.delete(idValido);

    if (resultado.affectedRows === 0) {
      throw new AppError("Comentário não encontrado", 404);
    }
  },
};

module.exports = comentarioService;
