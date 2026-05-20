const db = require("../config/database");

const Imagem = {
  async findAll() {
    const [rows] = await db.execute("SELECT * FROM imagem ORDER BY id DESC");

    return rows || [];
  },

  async findById(id) {
    const [rows] = await db.execute("SELECT * FROM imagem WHERE id = ?", [id]);

    return rows[0] || null;
  },

  async create(data) {
    const [result] = await db.execute(
      `
      INSERT INTO imagem
      (titulo, link)
      VALUES (?, ?)
      `,
      [data.titulo, data.link],
    );

    return await this.findById(result.insertId);
  },

  async update(id, data) {
    await db.execute(
      `
      UPDATE imagem
      SET titulo = ?, link = ?
      WHERE id = ?
      `,
      [data.titulo, data.link, id],
    );

    return await this.findById(id);
  },

  async delete(id) {
    await db.execute("DELETE FROM imagem WHERE id = ?", [id]);
  },
};

module.exports = Imagem;
