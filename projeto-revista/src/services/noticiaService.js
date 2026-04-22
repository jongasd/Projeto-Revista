const Noticia = require("../models/noticia");
const AppError = require("../utils/appError");

const CAMPOS_OBRIGATORIOS_CRIACAO = [
  "usuario_id",
  "categoria_id",
  "titulo",
  "conteudo",
];

const CAMPOS_ATUALIZAVEIS = ["titulo", "genero", "descricao", "conteudo"];

/**
 * Valida e converte um ID recebido como string/number.
 * @param {*} id
 * @returns {number}
 */
const parseId = (id) => {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return parsed;
};

/**
 * Garante que todos os campos obrigatórios estão presentes.
 * @param {Object} dados
 */
const validarCamposObrigatorios = (dados) => {
  const faltando = CAMPOS_OBRIGATORIOS_CRIACAO.filter(
    (campo) =>
      dados[campo] === undefined ||
      dados[campo] === null ||
      dados[campo] === "",
  );

  if (faltando.length > 0) {
    throw new AppError(
      `Campos obrigatórios ausentes: ${faltando.join(", ")}`,
      400,
    );
  }
};

/**
 * Extrai e sanitiza apenas os campos permitidos para atualização.
 * @param {Object} body
 * @returns {Object}
 */
const extrairCamposAtualizaveis = (body) => {
  return CAMPOS_ATUALIZAVEIS.reduce((acc, campo) => {
    if (body[campo] !== undefined && body[campo] !== "") {
      acc[campo] = String(body[campo]).trim();
    }
    return acc;
  }, {});
};

const noticiaService = {
  listarTodas: () => Noticia.findAll(),

  buscarPorId: async (id) => {
    const idValido = parseId(id);
    const noticia = await Noticia.findById(idValido);

    if (!noticia) {
      throw new AppError("Notícia não encontrada", 404);
    }

    return noticia;
  },

  criar: async (body) => {
    validarCamposObrigatorios(body);

    const dados = {
      usuario_id: Number(body.usuario_id),
      categoria_id: Number(body.categoria_id),
      titulo: String(body.titulo).trim(),
      genero: body.genero ? String(body.genero).trim() : null,
      descricao: body.descricao ? String(body.descricao).trim() : null,
      conteudo: String(body.conteudo).trim(),
    };

    return await Noticia.create(dados);
  },

  atualizar: async (id, body) => {
    const idValido = parseId(id);

    const noticia = await Noticia.findById(idValido);
    if (!noticia) {
      throw new AppError("Notícia não encontrada", 404);
    }

    const dadosAtualizados = extrairCamposAtualizaveis(body);

    if (Object.keys(dadosAtualizados).length === 0) {
      throw new AppError("Nenhum campo válido informado para atualização", 400);
    }

    await Noticia.update(idValido, dadosAtualizados);
  },

  excluir: async (id) => {
    const idValido = parseId(id);
    const resultado = await Noticia.delete(idValido);

    if (resultado.affectedRows === 0) {
      throw new AppError("Notícia não encontrada", 404);
    }
  },
};

module.exports = noticiaService;
