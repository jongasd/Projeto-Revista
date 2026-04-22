const pool = require("../config/database");

const executarQuery = (sql, valores = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, valores, (erro, resultado) => {
      if (erro) return reject(erro);
      resolve(resultado);
    });
  });

const CAMPOS_PUBLICOS =
  "id, nome, turma, email, rm, tipo, foto_perfil, descricao, created_at";

const Usuario = {
  findAll: () =>
    executarQuery(`SELECT ${CAMPOS_PUBLICOS} FROM usuario ORDER BY nome ASC`),
  findById: async (id) => {
    const resultado = await executarQuery(
      `SELECT ${CAMPOS_PUBLICOS} FROM usuario WHERE id = ?`,
      [id],
    );
    return resultado[0] ?? null;
  },

  findByEmail: async (email) => {
    const resultado = await executarQuery(
      "SELECT * FROM usuario WHERE email = ?",
      [email],
    );
    return resultado[0] ?? null;
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO usuario SET ?", [dados]);
    return resultado.insertId;
  },

  update: (id, dados) =>
    executarQuery("UPDATE usuario SET ? WHERE id = ?", [dados, id]),

  delete: (id) => executarQuery("DELETE FROM usuario WHERE id = ?", [id]),
};

module.exports = Usuario;
