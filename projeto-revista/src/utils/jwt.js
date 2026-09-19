// src/utils/jwt.js
const jwt = require("jsonwebtoken");

const SEGREDO = process.env.JWT_SECRET;
const EXPIRA_EM = process.env.JWT_EXPIRES_IN || "7d";

if (!SEGREDO) {
  // Falha rápido e alto: rodar sem segredo configurado é um risco de segurança,
  // não algo para silenciosamente "funcionar assim mesmo".
  throw new Error(
    "JWT_SECRET não definido no .env — configure antes de iniciar o servidor.",
  );
}

/**
 * Gera um token JWT a partir dos dados públicos do usuário.
 * Nunca inclua a senha (nem o hash) no payload.
 */
const gerarToken = (usuario) => {
  const payload = {
    id: usuario.id,
    email: usuario.email,
    tipo: usuario.tipo,
  };
  return jwt.sign(payload, SEGREDO, { expiresIn: EXPIRA_EM });
};

/**
 * Verifica e decodifica um token. Lança se for inválido/expirado.
 */
const verificarToken = (token) => jwt.verify(token, SEGREDO);

module.exports = { gerarToken, verificarToken };
