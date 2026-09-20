// src/models/noticia.js
const pool = require("../config/database");

const executarQuery = (sql, valores = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, valores, (erro, resultado) => {
      if (erro) return reject(erro);
      resolve(resultado);
    });
  });

// COALESCE(n.autor_nome, u.nome): usa o nome do autor original do texto
// quando ele não é um usuário cadastrado (caso do acervo migrado); cai
// para o nome do usuário dono da conta em notícias criadas via app.
const SELECT_BASE = `
  SELECT
    n.*,
    COALESCE(n.autor_nome, u.nome) AS autor,
    (SELECT COUNT(*) FROM comentario c WHERE c.noticia_id = n.id) AS total_comentarios,
    (SELECT COUNT(*) FROM favoritar f WHERE f.noticia_id = n.id) AS total_favoritos,
    (SELECT COUNT(*) FROM curtida k WHERE k.noticia_id = n.id) AS total_curtidas
  FROM noticia n
  LEFT JOIN usuario u ON u.id = n.usuario_id
`;

const Noticia = {
  findAll: (genero) => {
    if (genero) {
      return executarQuery(
        `${SELECT_BASE} WHERE n.genero = ? ORDER BY n.created_at DESC`,
        [genero],
      );
    }
    return executarQuery(`${SELECT_BASE} ORDER BY n.created_at DESC`);
  },

  findById: async (id) => {
    const resultado = await executarQuery(
      `${SELECT_BASE} WHERE n.id = ?`,
      [id],
    );
    return resultado[0] ?? null;
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO noticia SET ?", [dados]);
    return resultado.insertId;
  },

  update: (id, dados) =>
    executarQuery("UPDATE noticia SET ? WHERE id = ?", [dados, id]),

  delete: (id) => executarQuery("DELETE FROM noticia WHERE id = ?", [id]),
};

module.exports = Noticia;
