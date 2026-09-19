/* ═══════════════════════════════════════════════════════
   auth.js — autenticação compartilhada (Conecta Jovem)
   Usa as mesmas chaves de localStorage que o resto do site
   já usa para o usuário (cj_usuario), e adiciona cj_token.
═══════════════════════════════════════════════════════ */

const CJ_API_BASE_URL = "http://localhost:3000";
const CJ_CHAVE_USUARIO = "cj_usuario";
const CJ_CHAVE_TOKEN = "cj_token";

const CJAuth = {
  salvarSessao(usuario, token) {
    localStorage.setItem(CJ_CHAVE_USUARIO, JSON.stringify(usuario));
    localStorage.setItem(CJ_CHAVE_TOKEN, token);
  },

  getUsuario() {
    try {
      return JSON.parse(localStorage.getItem(CJ_CHAVE_USUARIO) || "null");
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem(CJ_CHAVE_TOKEN);
  },

  estaLogado() {
    return Boolean(this.getToken());
  },

  logout() {
    localStorage.removeItem(CJ_CHAVE_USUARIO);
    localStorage.removeItem(CJ_CHAVE_TOKEN);
  },

  /**
   * Faz login contra a API. Lança um Error com mensagem amigável em caso
   * de falha (credenciais inválidas, servidor fora do ar, etc).
   */
  async login(email, senha) {
    let res;
    try {
      res = await fetch(`${CJ_API_BASE_URL}/usuario/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
    } catch {
      throw new Error(
        "Não foi possível conectar ao servidor. Verifique se a API está rodando.",
      );
    }

    const json = await res.json().catch(() => ({}));

    if (!res.ok || !json.sucesso) {
      throw new Error(json.mensagem || "Credenciais inválidas.");
    }

    this.salvarSessao(json.dados, json.token);
    return json.dados;
  },

  /**
   * Cadastra um novo usuário. `dados` deve conter:
   * nome, turma, email, rm, senha, tipo.
   */
  async cadastrar(dados) {
    let res;
    try {
      res = await fetch(`${CJ_API_BASE_URL}/usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
    } catch {
      throw new Error(
        "Não foi possível conectar ao servidor. Verifique se a API está rodando.",
      );
    }

    const json = await res.json().catch(() => ({}));

    if (!res.ok || !json.sucesso) {
      throw new Error(json.mensagem || "Não foi possível concluir o cadastro.");
    }

    this.salvarSessao(json.dados, json.token);
    return json.dados;
  },

  /**
   * Wrapper de fetch que adiciona o header Authorization automaticamente.
   * Use para qualquer chamada que exija login (POST/PUT/DELETE protegidos).
   */
  async fetchAutenticado(caminho, opcoes = {}) {
    const token = this.getToken();
    const headers = {
      ...(opcoes.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return fetch(`${CJ_API_BASE_URL}${caminho}`, { ...opcoes, headers });
  },
};
