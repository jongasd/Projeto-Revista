  const pool = require("../config/database");

/**
 * Executa uma query SQL de forma assíncrona.
 * @param {string} sql
 * @param {Array} valores
 * @returns {Promise}
 */
const executarQuery = (sql, valores = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, valores, (erro, resultado) => {
      if (erro) return reject(erro);
      resolve(resultado);
    });
  });

const Noticia = {
  /**
   * Retorna todas as notícias com dados do autor e categoria.
   */
  findAll: () =>
    executarQuery(`
      SELECT n.*, u.nome AS autor, c.tipo_categoria AS categoria
      FROM noticia n
      LEFT JOIN usuario u ON u.id = n.usuario_id
      LEFT JOIN categoria c ON c.id = n.categoria_id
    `),

  /**
   * Retorna uma notícia por ID com dados relacionados.
   * @param {number} id
   */
  findById: async (id) => {
    const resultado = await executarQuery(
      `
        SELECT n.*, u.nome AS autor, c.tipo_categoria AS categoria
        FROM noticia n
        LEFT JOIN usuario u ON u.id = n.usuario_id
        LEFT JOIN categoria c ON c.id = n.categoria_id
        WHERE n.id = ?
      `,
      [id],
    );
    return resultado[0] ?? null;
  },

  /**
   * Insere uma nova notícia.
   * @param {Object} dados
   * @returns {number} ID inserido
   */
  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO noticia SET ?", [dados]);
    return resultado.insertId;
  },

  /**
   * Atualiza campos de uma notícia por ID.
   * @param {number} id
   * @param {Object} dados
   */
  update: (id, dados) =>
    executarQuery("UPDATE noticia SET ? WHERE id = ?", [dados, id]),

  /**
   * Remove uma notícia por ID.
   * @param {number} id
   */
  delete: (id) => executarQuery("DELETE FROM noticia WHERE id = ?", [id]),
};

module.exports = Noticia;
