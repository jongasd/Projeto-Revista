const Categoria = require("../models/categoria");
const AppError = require("../utils/AppError");

const parseId = (id) => {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return parsed;
};

const categoriaService = {
  listarTodas: () => Categoria.findAll(),

  buscarPorId: async (id) => {
    const idValido = parseId(id);
    const categoria = await Categoria.findById(idValido);

    if (!categoria) {
      throw new AppError("Categoria não encontrada", 404);
    }

    return categoria;
  },

  criar: async (body) => {
    const { tipo_categoria } = body;

    if (!tipo_categoria || String(tipo_categoria).trim() === "") {
      throw new AppError("O campo tipo_categoria é obrigatório", 400);
    }

    const jaExiste = await Categoria.findByTipo(tipo_categoria.trim());
    if (jaExiste) {
      throw new AppError("Já existe uma categoria com esse tipo", 409);
    }

    return await Categoria.create({
      tipo_categoria: tipo_categoria.trim(),
    });
  },

  atualizar: async (id, body) => {
    const idValido = parseId(id);

    const categoria = await Categoria.findById(idValido);
    if (!categoria) {
      throw new AppError("Categoria não encontrada", 404);
    }

    const { tipo_categoria } = body;
    if (!tipo_categoria || String(tipo_categoria).trim() === "") {
      throw new AppError("O campo tipo_categoria é obrigatório", 400);
    }

    await Categoria.update(idValido, {
      tipo_categoria: tipo_categoria.trim(),
    });
  },

  excluir: async (id) => {
    const idValido = parseId(id);
    const resultado = await Categoria.delete(idValido);

    if (resultado.affectedRows === 0) {
      throw new AppError("Categoria não encontrada", 404);
    }
  },
};

module.exports = categoriaService;
