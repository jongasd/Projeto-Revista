const express = require("express");
const app = express();

app.use(express.json());

// Rotas
app.use("/noticias", require("./routes/noticiaRoutes"));
app.use("/categorias", require("./routes/categoriaRoutes"));
app.use("/comentarios", require("./routes/comentarioRoutes"));
app.use("/curtidas", require("./routes/curtidaRoutes"));
app.use("/favoritos", require("./routes/favoritarRoutes"));
app.use("/usuarios", require("./routes/usuarioRoutes"));

// ⚠️ SEMPRE por último — captura todos os erros
app.use(require("./middlewares/errorHandler"));

module.exports = app;
