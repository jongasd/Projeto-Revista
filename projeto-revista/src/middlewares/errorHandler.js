const AppError = require("../utils/appError");

/**
 * Middleware centralizado de erros.
 * Deve ser registrado no app.js DEPOIS de todas as rotas.
 */
const errorHandler = (erro, req, res, next) => {
  if (erro instanceof AppError) {
    return res.status(erro.statusCode).json({
      sucesso: false,
      mensagem: erro.message,
    });
  }

  // Erros inesperados não expõem detalhes ao cliente
  console.error("[Erro interno]", erro);
  return res.status(500).json({
    sucesso: false,
    mensagem: "Erro interno do servidor",
  });
};

module.exports = errorHandler;