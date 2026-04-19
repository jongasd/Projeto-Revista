/**
 * Erro de aplicação com status HTTP controlado.
 * Permite distinguir erros esperados de erros internos.
 */
class AppError extends Error {
  constructor(mensagem, statusCode = 500) {
    super(mensagem);
    this.statusCode = statusCode;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;