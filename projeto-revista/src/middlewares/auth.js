// src/middlewares/auth.js
const { verificarToken } = require("../utils/jwt");
const AppError = require("../utils/appError");

/**
 * Exige um token JWT válido no header Authorization: Bearer <token>.
 * Se válido, popula req.usuario com { id, email, tipo }.
 */
const autenticar = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError("Token não informado", 401));
  }

  const token = header.slice(7).trim();

  try {
    req.usuario = verificarToken(token);
    return next();
  } catch (erro) {
    return next(new AppError("Token inválido ou expirado", 401));
  }
};

/**
 * Exige que o usuário autenticado tenha um dos tipos informados.
 * Use depois de `autenticar`.
 * Ex: autorizar("admin", "professor")
 */
const autorizar = (...tiposPermitidos) => (req, res, next) => {
  if (!req.usuario) {
    return next(new AppError("Não autenticado", 401));
  }
  if (!tiposPermitidos.includes(req.usuario.tipo)) {
    return next(new AppError("Sem permissão para esta ação", 403));
  }
  return next();
};

module.exports = { autenticar, autorizar };
