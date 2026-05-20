const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// CORS — permite requisições do frontend
app.use(
  cors({
    origin: "*", // em produção, troque pelo domínio real
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Aumenta o limite para suportar payloads maiores (ex: foto em base64)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rotas
app.use("/noticias", require("./routes/noticiaRoutes"));
app.use("/categorias", require("./routes/categoriaRoutes"));
app.use("/comentarios", require("./routes/comentarioRoutes"));
app.use("/curtidas", require("./routes/curtidaRoutes"));
app.use("/favoritos", require("./routes/favoritarRoutes"));
app.use("/usuario", require("./routes/usuarioRoutes"));
app.use("/imagens", require("./routes/imagemRoutes"));
app.use(
  "/images",
  express.static(path.join(__dirname, "..", "uploads/images")),
);
app.use(express.urlencoded({ extended: true }));  

app.use("/upload", require("./routes/uploadRoutes"));

app.use(require("./middlewares/errorHandler"));

module.exports = app;
