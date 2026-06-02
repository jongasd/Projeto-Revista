// src/services/imagemService.js

const Imagem = require("../models/imagem");
const ImageProcessor = require("../config/imageProcessor");

const imagemService = {
  async listar() {
  const imagens = await Imagem.findAll();

  return imagens || [];
},

  async buscarPorId(id) {
    return await Imagem.findById(id);
  },

  async criar(body, file) {
    if (!file) {
      throw new Error("Imagem obrigatória");
    }

    const processed = await ImageProcessor.processImage(file.path);

    return await Imagem.create({
      titulo: body.titulo,
      link: processed.url,
    });
  },

  async atualizar(id, body, file) {
    const imagem = await Imagem.findById(id);

    if (!imagem) {
      throw new Error("Imagem não encontrada");
    }

    let imageUrl = imagem.link;

    // nova imagem
    if (file) {
      await ImageProcessor.deleteImage(imagem.link);

      const processed = await ImageProcessor.processImage(file.path);

      imageUrl = processed.url;
    }

    return await Imagem.update(id, {
      titulo: body.titulo || imagem.titulo,
      link: imageUrl,
    });
  },

  async deletar(id) {
    const imagem = await Imagem.findById(id);

    if (!imagem) {
      throw new Error("Imagem não encontrada");
    }

    await ImageProcessor.deleteImage(imagem.link);

    await Imagem.delete(id);
  },
};

module.exports = imagemService;
