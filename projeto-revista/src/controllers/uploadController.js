// src/controllers/uploadController.js
const fs = require("fs").promises;
const ImageProcessor = require("../config/imageProcessor");
const Noticia = require("../models/noticia");
const Usuario = require("../models/usuario");
const AppError = require("../utils/AppError");

const uploadController = {
  /**
   * POST /upload/noticia/:id
   * Substitui (ou define) a imagem de capa de uma notícia.
   */
  uploadCapaNoticia: async (req, res, next) => {
    try {
      if (!req.file) throw new AppError("Nenhum arquivo foi enviado", 400);

      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0)
        throw new AppError("ID inválido", 400);

      const noticia = await Noticia.findById(id);
      if (!noticia) throw new AppError("Notícia não encontrada", 404);

      // Remove imagem antiga se existir
      if (noticia.imagem_capa) {
        await ImageProcessor.deleteImage(noticia.imagem_capa);
      }

      // Processa nova imagem
      const result = await ImageProcessor.processImage(
        req.file.path,
        "noticia",
      );

      // Atualiza o banco
      await Noticia.update(id, { imagem_capa: result.url });

      res.status(200).json({
        sucesso: true,
        mensagem: "Imagem de capa atualizada com sucesso",
        dados: { imagem_capa: result.url },
      });
    } catch (erro) {
      // Garante limpeza do temporário em caso de erro
      if (req.file) await fs.unlink(req.file.path).catch(() => null);
      next(erro);
    }
  },

  /**
   * POST /upload/perfil/:id
   * Substitui (ou define) a foto de perfil de um usuário.
   */
  uploadFotoPerfil: async (req, res, next) => {
    try {
      if (!req.file) throw new AppError("Nenhum arquivo foi enviado", 400);

      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0)
        throw new AppError("ID inválido", 400);

      const usuario = await Usuario.findById(id);
      if (!usuario) throw new AppError("Usuário não encontrado", 404);

      // Remove foto antiga se existir
      if (usuario.foto_perfil) {
        await ImageProcessor.deleteImage(usuario.foto_perfil);
      }

      // Processa nova imagem
      const result = await ImageProcessor.processImage(req.file.path, "perfil");

      // Atualiza o banco
      await Usuario.update(id, { foto_perfil: result.url });

      res.status(200).json({
        sucesso: true,
        mensagem: "Foto de perfil atualizada com sucesso",
        dados: { foto_perfil: result.url },
      });
    } catch (erro) {
      if (req.file) await fs.unlink(req.file.path).catch(() => null);
      next(erro);
    }
  },
};

module.exports = uploadController;
