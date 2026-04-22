const pool = require("../config/database")

const queryAsync = (sql, values = []) =>{
    return new Promise((resolve, reject) =>{
        pool.query(sql, values, (err, results) =>{
            if(err) reject(err)
                else resolve(results)
        })
    })
}

const comentario = {
    findAll: async () =>{
        return await queryAsync("SELECT * FROM comentario")
    },
    findById: async(id) =>{
        const results = await queryAsync("SELECT * FROM comentario WHERE id = ?", [id])
        return results[0]
    },
    create: async(dados) =>{
        const result = await queryAsync("INSERT INTO comentario SET ?", [dados])
        return result.insertId
    },
    update: async(id, dados) =>{
        return await queryAsync("UPDATE comentario SET ? WHERE id = ?", [dados, id])
    },
    delete: async(id) =>{
        return await queryAsync("DELETE * FROM comentario WHERE id = ?", [id])
    }
}

module.exports = comentario