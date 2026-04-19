const pool = require("../config/database");

const executarQuery = (sql, valores = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, valores, (erro, resultado) => {
      if (erro) return reject(erro);
      resolve(resultado);
    });
  });

const Comentario = {
  findAll: () =>
    executarQuery(`
      SELECT c.*, u.nome AS autor
      FROM comentario c
      LEFT JOIN usuario u ON u.id = c.usuario_id
      ORDER BY c.created_at DESC
    `),

  findByNoticia: (noticia_id) =>
    executarQuery(
      `
        SELECT c.*, u.nome AS autor
        FROM comentario c
        LEFT JOIN usuario u ON u.id = c.usuario_id
        WHERE c.noticia_id = ?
        ORDER BY c.created_at DESC
      `,
      [noticia_id],
    ),

  findById: async (id) => {
    const resultado = await executarQuery(
      `
        SELECT c.*, u.nome AS autor
        FROM comentario c
        LEFT JOIN usuario u ON u.id = c.usuario_id
        WHERE c.id = ?
      `,
      [id],
    );
    return resultado[0] ?? null;
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO comentario SET ?", [
      dados,
    ]);
    return resultado.insertId;
  },

  update: (id, dados) =>
    executarQuery("UPDATE comentario SET ? WHERE id = ?", [dados, id]),

  delete: (id) => executarQuery("DELETE FROM comentario WHERE id = ?", [id]),
};

module.exports = Comentario;
