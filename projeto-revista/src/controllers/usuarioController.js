const usuarioService = require("../services/usuarioService");
const AppError = require("../utils/appError");

const usuarioController = {
  listarTodos: async (req, res, next) => {
    try {
      const usuarios = await usuarioService.listarTodos();
      res.json({ sucesso: true, dados: usuarios, total: usuarios.length });
    } catch (erro) {
      next(erro);
    }
  },

  buscarPorId: async (req, res, next) => {
    try {
      const usuario = await usuarioService.buscarPorId(req.params.id);
      res.json({ sucesso: true, dados: usuario });
    } catch (erro) {
      next(erro);
    }
  },

  criar: async (req, res, next) => {
    try {
      const { usuario, token } = await usuarioService.criar(req.body);
      res.status(201).json({
        sucesso: true,
        mensagem: "Usuário criado com sucesso",
        dados: usuario,
        token,
      });
    } catch (erro) {
      next(erro);
    }
  },

  atualizar: async (req, res, next) => {
    try {
      // Só o próprio usuário ou um admin pode editar o perfil.
      if (
        req.usuario.tipo !== "admin" &&
        Number(req.usuario.id) !== Number(req.params.id)
      ) {
        return next(new AppError("Sem permissão para editar este usuário", 403));
      }
      await usuarioService.atualizar(req.params.id, req.body);
      res.json({ sucesso: true, mensagem: "Usuário atualizado com sucesso" });
    } catch (erro) {
      next(erro);
    }
  },

  excluir: async (req, res, next) => {
    try {
      if (
        req.usuario.tipo !== "admin" &&
        Number(req.usuario.id) !== Number(req.params.id)
      ) {
        return next(new AppError("Sem permissão para excluir este usuário", 403));
      }
      await usuarioService.excluir(req.params.id);
      res.json({ sucesso: true, mensagem: "Usuário excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  },

  login: async (req, res, next) => {
    try {
      const { usuario, token } = await usuarioService.login(req.body);
      res.json({
        sucesso: true,
        mensagem: "Login realizado com sucesso",
        dados: usuario,
        token,
      });
    } catch (erro) {
      next(erro);
    }
  },
};

module.exports = usuarioController;
