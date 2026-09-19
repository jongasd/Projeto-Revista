const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const AppError = require("../utils/appError"); // ← corrigido: minúsculo
const { gerarToken } = require("../utils/jwt");

const SALT_ROUNDS = 10;
const TIPOS_VALIDOS = ["aluno", "professor", "admin"];
const CAMPOS_ATUALIZAVEIS = ["nome", "turma", "descricao", "foto_perfil"];

const parseId = (id) => {
  const parsed = Number(id);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError("ID inválido", 400);
  }
  return parsed;
};

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const usuarioService = {
  listarTodos: () => Usuario.findAll(),

  buscarPorId: async (id) => {
    const idValido = parseId(id);
    const usuario = await Usuario.findById(idValido);

    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return usuario;
  },

  criar: async (body) => {
    const { nome, turma, email, rm, senha } = body;
    // Aceita "Aluno" / "ALUNO" / "aluno" — normaliza antes de validar,
    // porque o frontend hoje envia com a primeira letra maiúscula.
    const tipo = body.tipo ? String(body.tipo).trim().toLowerCase() : "";

    if (!nome || !turma || !email || !rm || !senha || !tipo) {
      throw new AppError(
        "Campos obrigatórios ausentes: nome, turma, email, rm, senha, tipo",
        400,
      );
    }

    if (!validarEmail(email)) {
      throw new AppError("E-mail inválido", 400);
    }

    if (!TIPOS_VALIDOS.includes(tipo)) {
      throw new AppError(
        `Tipo inválido. Use: ${TIPOS_VALIDOS.join(", ")}`,
        400,
      );
    }

    if (String(senha).length < 6) {
      throw new AppError("A senha deve ter ao menos 6 caracteres", 400);
    }

    const emailExistente = await Usuario.findByEmail(email);
    if (emailExistente) {
      throw new AppError("E-mail já cadastrado", 409);
    }

    const senhaHash = await bcrypt.hash(String(senha), SALT_ROUNDS);

    const novoId = await Usuario.create({
      nome: String(nome).trim(),
      turma: String(turma).trim(),
      email: String(email).trim().toLowerCase(),
      rm: Number(rm),
      senha: senhaHash,
      tipo,
      foto_perfil: body.foto_perfil ?? null,
      descricao: body.descricao ?? null,
    });

    const usuarioCriado = await Usuario.findById(novoId);
    const token = gerarToken(usuarioCriado);

    return { usuario: usuarioCriado, token };
  },

  atualizar: async (id, body) => {
    const idValido = parseId(id);

    const usuario = await Usuario.findById(idValido);
    if (!usuario) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const dadosAtualizados = CAMPOS_ATUALIZAVEIS.reduce((acc, campo) => {
      if (body[campo] !== undefined && body[campo] !== "") {
        acc[campo] = String(body[campo]).trim();
      }
      return acc;
    }, {});

    if (body.senha) {
      if (String(body.senha).length < 6) {
        throw new AppError("A senha deve ter ao menos 6 caracteres", 400);
      }
      dadosAtualizados.senha = await bcrypt.hash(
        String(body.senha),
        SALT_ROUNDS,
      );
    }

    if (Object.keys(dadosAtualizados).length === 0) {
      throw new AppError("Nenhum campo válido informado para atualização", 400);
    }

    await Usuario.update(idValido, dadosAtualizados);
  },

  excluir: async (id) => {
    const idValido = parseId(id);
    const resultado = await Usuario.delete(idValido);

    if (resultado.affectedRows === 0) {
      throw new AppError("Usuário não encontrado", 404);
    }
  },

  login: async (body) => {
    const { email, senha } = body;

    if (!email || !senha) {
      throw new AppError("E-mail e senha são obrigatórios", 400);
    }

    const usuario = await Usuario.findByEmail(email.trim().toLowerCase());
    if (!usuario) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const senhaCorreta = await bcrypt.compare(String(senha), usuario.senha);
    if (!senhaCorreta) {
      throw new AppError("Credenciais inválidas", 401);
    }

    // Nunca retorne a senha na resposta
    const { senha: _, ...usuarioPublico } = usuario;
    const token = gerarToken(usuarioPublico);

    return { usuario: usuarioPublico, token };
  },
};

module.exports = usuarioService;
