const usuarioService = require("../services/usuarioService");

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
      const novoId = await usuarioService.criar(req.body);
      res.status(201).json({
        sucesso: true,
        mensagem: "Usuário criado com sucesso",
        id: novoId,
      });
    } catch (erro) {
      next(erro);
    }
  },

  atualizar: async (req, res, next) => {
    try {
      await usuarioService.atualizar(req.params.id, req.body);
      res.json({ sucesso: true, mensagem: "Usuário atualizado com sucesso" });
    } catch (erro) {
      next(erro);
    }
  },

  excluir: async (req, res, next) => {
    try {
      await usuarioService.excluir(req.params.id);
      res.json({ sucesso: true, mensagem: "Usuário excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  },

  login: async (req, res, next) => {
    try {
      const usuario = await usuarioService.login(req.body);
      res.json({
        sucesso: true,
        mensagem: "Login realizado com sucesso",
        dados: usuario,
      });
    } catch (erro) {
      next(erro);
    }
  },
};

module.exports = usuarioController;
