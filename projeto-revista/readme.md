# 📰 Projeto Revista — API REST

API REST desenvolvida em **Node.js + Express** com arquitetura **MVC**, aplicando princípios de **Clean Code** e **SOLID**.

---

## 📁 Estrutura de Pastas

```
Projeto-revista/
└── projeto-revista/
    ├── node_modules/
    ├── .env
    ├── package.json
    ├── package-lock.json
    ├── server.js
    └── src/
        ├── config/
        │   └── database.js
        ├── controllers/
        │   ├── categoriaController.js
        │   ├── comentarioController.js
        │   ├── curtidaController.js
        │   ├── favoritarController.js
        │   ├── noticiaController.js
        │   └── usuarioController.js
        ├── middlewares/
        │   └── errorHandler.js
        ├── models/
        │   ├── categoria.js
        │   ├── comentario.js
        │   ├── curtida.js
        │   ├── favoritar.js
        │   ├── noticia.js
        │   └── usuario.js
        ├── routes/
        │   ├── categoriaRoutes.js
        │   ├── comentarioRoutes.js
        │   ├── curtidaRoutes.js
        │   ├── favoritarRoutes.js
        │   ├── noticiaRoutes.js
        │   └── usuarioRoutes.js
        ├── services/
        │   ├── categoriaService.js
        │   ├── comentarioService.js
        │   ├── curtidaService.js
        │   ├── favoritarService.js
        │   ├── noticiaService.js
        │   └── usuarioService.js
        └── utils/
            └── AppError.js
```

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- MySQL 8+

### Passos

```bash
# 1. Entre na pasta do projeto
cd projeto-revista

# 2. Instale as dependências
npm install

# 3. Configure o arquivo .env
cp .env.example .env
# Edite o .env com suas credenciais

# 4. Crie o banco de dados (execute o arquivo SQL no MySQL)
# Rode o conteúdo de Projeto-revista.sql no seu cliente MySQL

# 5. Inicie o servidor
npm run dev       # desenvolvimento (nodemon)
npm start         # produção
```

### Dependências

| Pacote    | Versão  | Para que serve                                |
| --------- | ------- | --------------------------------------------- |
| `express` | ^4.18.2 | Framework web para criação da API             |
| `mysql2`  | ^3.x.x  | Driver de conexão com o banco MySQL           |
| `bcrypt`  | ^5.1.1  | Criptografia de senhas dos usuários           |
| `nodemon` | ^3.0.1  | Reinicialização automática em desenvolvimento |

---

## 🗂️ Explicação Completa dos Arquivos

---

### `.env`

Arquivo de variáveis de ambiente. Nunca deve ser enviado ao Git.

```bash
PORT=3000               # Porta em que o servidor vai rodar

DB_HOST=localhost       # Endereço do banco de dados
DB_USER=root            # Usuário do MySQL
DB_PASSWORD=            # Senha do MySQL (deixe vazio se não tiver)
DB_NAME=projeto_revista # Nome do banco criado pelo SQL
```

> ⚠️ Adicione `.env` no seu `.gitignore` para não expor credenciais.

---

### `package.json`

Arquivo de configuração do projeto Node.js. Gerado automaticamente pelo `npm init`.

```json
{
  "name": "projeto-revista", // Nome do projeto
  "version": "1.0.0", // Versão atual
  "main": "server.js", // Arquivo de entrada da aplicação
  "scripts": {
    "start": "node server.js", // Comando de produção: npm start
    "dev": "nodemon server.js" // Comando de desenvolvimento: npm run dev
  },
  "dependencies": {
    "bcrypt": "^5.1.1", // Instalado com: npm install bcrypt
    "express": "^4.18.2", // Instalado com: npm install express
    "mysql2": "^3.x.x" // Instalado com: npm install mysql2
  },
  "devDependencies": {
    "nodemon": "^3.0.1" // Instalado com: npm install -D nodemon
  }
}
```

---

### `package-lock.json`

- Gerado **automaticamente** pelo npm ao instalar pacotes
- Trava as versões **exatas** de cada dependência instalada
- Garante que todos os membros da equipe usem as mesmas versões
- **Nunca edite manualmente**
- **Deve** ser incluído no Git (`.gitignore` não deve ignorar esse arquivo)

---

### `node_modules/`

- Pasta gerada **automaticamente** pelo `npm install`
- Contém o código-fonte de todos os pacotes instalados
- **Nunca deve** ser enviada ao Git — adicione no `.gitignore`
- Se deletada, basta rodar `npm install` para recriar

---

### `server.js`

Ponto de entrada da aplicação. Só tem uma responsabilidade: **iniciar o servidor HTTP**.

```javascript
const app = require("./src/app");
// Importa o app já configurado com todas as rotas e middlewares

const PORT = process.env.PORT || 3000;
// Lê a porta do arquivo .env
// Se não existir a variável PORT no .env, usa 3000 como padrão

app.listen(PORT, () => {
  // Inicia o servidor HTTP na porta definida
  // O callback é executado assim que o servidor sobe com sucesso
  console.log(`Servidor rodando na porta ${PORT}`);
  // Confirma no terminal que o servidor iniciou corretamente
});
```

---

### `src/app.js`

Configura a aplicação Express: **registra middlewares e rotas**.

```javascript
const express = require("express");
// Importa o framework Express

const app = express();
// Cria a instância principal da aplicação

app.use(express.json());
// Middleware nativo do Express
// Permite ler o corpo das requisições no formato JSON (req.body)
// Sem ele, req.body seria undefined em POST e PUT

// ── Registro das Rotas ──────────────────────────────────
app.use("/noticias", require("./routes/noticiaRoutes"));
// Requisições para /noticias são encaminhadas para noticiaRoutes

app.use("/categorias", require("./routes/categoriaRoutes"));
// Requisições para /categorias são encaminhadas para categoriaRoutes

app.use("/comentarios", require("./routes/comentarioRoutes"));
// Requisições para /comentarios são encaminhadas para comentarioRoutes

app.use("/curtidas", require("./routes/curtidaRoutes"));
// Requisições para /curtidas são encaminhadas para curtidaRoutes

app.use("/favoritos", require("./routes/favoritarRoutes"));
// Requisições para /favoritos são encaminhadas para favoritarRoutes

app.use("/usuarios", require("./routes/usuarioRoutes"));
// Requisições para /usuarios são encaminhadas para usuarioRoutes

app.use(require("./middlewares/errorHandler"));
// ⚠️ DEVE ser o ÚLTIMO middleware registrado
// Captura qualquer erro lançado em qualquer rota acima
// Se registrado antes das rotas, não captura os erros corretamente

module.exports = app;
// Exporta o app configurado para o server.js conseguir iniciar
```

---

### `src/config/database.js`

Responsável por **criar e exportar a conexão com o banco de dados MySQL**.

```javascript
const mysql = require("mysql2");
// Importa o driver de conexão mysql2

const pool = mysql.createPool({
  // createPool cria um "pool" de conexões
  // Em vez de abrir e fechar uma conexão a cada query,
  // o pool reutiliza conexões já abertas (muito mais eficiente)

  host: process.env.DB_HOST,
  // Endereço do servidor MySQL (ex: "localhost")
  // Lido do arquivo .env para não expor credenciais no código

  user: process.env.DB_USER,
  // Usuário do banco (ex: "root")

  password: process.env.DB_PASSWORD,
  // Senha do banco

  database: process.env.DB_NAME,
  // Nome do banco de dados a usar (ex: "projeto_revista")

  waitForConnections: true,
  // Se todas as conexões estiverem ocupadas, a query espera
  // Se false, retornaria erro imediatamente

  connectionLimit: 10,
  // Número máximo de conexões simultâneas abertas no pool

  queueLimit: 0,
  // 0 = fila ilimitada de queries aguardando uma conexão livre
});

module.exports = pool;
// Exporta o pool para ser usado nos models
```

---

### `src/utils/AppError.js`

Classe de **erro customizado** que carrega um código HTTP junto à mensagem.

```javascript
class AppError extends Error {
  // Herda da classe Error nativa do JavaScript
  // Isso permite usar "throw new AppError(...)" igual ao "throw new Error(...)"

  constructor(mensagem, statusCode = 500) {
    // mensagem: texto do erro (ex: "Notícia não encontrada")
    // statusCode: código HTTP do erro. Padrão 500 se não informado

    super(mensagem);
    // Chama o construtor da classe Error passando a mensagem
    // Necessário para que erro.message funcione corretamente

    this.statusCode = statusCode;
    // Salva o código HTTP no objeto
    // Usado pelo errorHandler para devolver o status correto ao cliente

    this.name = "AppError";
    // Define o nome do tipo de erro
    // Facilita identificação nos logs (aparece como "AppError: mensagem")

    Error.captureStackTrace(this, this.constructor);
    // Captura o rastreamento de pilha (stack trace)
    // Mostra exatamente em qual linha do código o erro foi lançado
    // Útil para depuração
  }
}

module.exports = AppError;
// Exportado e usado nos services assim:
// throw new AppError("Notícia não encontrada", 404)
```

---

### `src/middlewares/errorHandler.js`

**Middleware central de erros**. Captura todos os erros da aplicação em um único lugar.

```javascript
const AppError = require("../utils/AppError");
// Importa a classe de erro customizado para verificar o tipo do erro

const errorHandler = (erro, req, res, next) => {
  // Middleware com 4 parâmetros — o Express reconhece como handler de erro
  // erro: o objeto de erro lançado em qualquer rota/service
  // req: objeto da requisição HTTP
  // res: objeto da resposta HTTP
  // next: função para passar para o próximo middleware (não usada aqui)

  if (erro instanceof AppError) {
    // Verifica se é um erro ESPERADO (lançado intencionalmente nos services)
    // Ex: usuário não encontrado, campo faltando, e-mail duplicado

    return res.status(erro.statusCode).json({
      // Responde com o código HTTP correto que foi definido no service
      // Ex: 400, 404, 409...

      sucesso: false,
      mensagem: erro.message,
      // Mensagem definida quando o erro foi lançado no service
    });
  }

  console.error("[Erro interno]", erro);
  // Erros inesperados (bugs, falhas de banco) são logados no terminal
  // Permite que o desenvolvedor veja o erro real sem expor ao cliente

  return res.status(500).json({
    // Erros desconhecidos sempre retornam status 500
    sucesso: false,
    mensagem: "Erro interno do servidor",
    // Mensagem genérica — nunca expõe detalhes técnicos ao cliente
    // (ex: não mostra a query SQL que falhou)
  });
};

module.exports = errorHandler;
```

---

## 🗂️ CAMADA MODEL — Acesso ao Banco de Dados

A camada Model tem **uma única responsabilidade**: executar queries SQL.  
Sem lógica de negócio, sem validação, sem nada além de comunicação com o banco.

---

### Função auxiliar `executarQuery` (presente em todos os models)

```javascript
const executarQuery = (sql, valores = []) =>
  new Promise((resolve, reject) => {
    // Transforma a função de callback do mysql2 em uma Promise
    // Permite usar async/await em vez de callbacks aninhados

    pool.query(sql, valores, (erro, resultado) => {
      // pool.query executa a query SQL no banco
      // sql: a instrução SQL com "?" como placeholder
      // valores: array com os valores que substituem os "?"
      // Usando "?" em vez de concatenar strings, evitamos SQL Injection

      if (erro) return reject(erro);
      // Se a query falhar, rejeita a Promise com o erro
      // O erro vai subir até o service e depois para o errorHandler

      resolve(resultado);
      // Se a query funcionar, resolve a Promise com os resultados
    });
  });
```

---

### `src/models/noticia.js`

```javascript
const pool = require("../config/database");
// Importa o pool de conexões com o banco

const executarQuery = (sql, valores = []) => {
  /* ... */
};
// Helper local para transformar callbacks em Promises (veja acima)

const Noticia = {
  findAll: () =>
    executarQuery(`
      SELECT n.*, u.nome AS autor, c.tipo_categoria AS categoria
      FROM noticia n
      LEFT JOIN usuario u ON u.id = n.usuario_id
      LEFT JOIN categoria c ON c.id = n.categoria_id
    `),
  // Retorna todas as notícias com o nome do autor e da categoria
  // LEFT JOIN: mesmo se não houver usuário ou categoria, a notícia aparece

  findById: async (id) => {
    const resultado = await executarQuery(
      `SELECT n.*, u.nome AS autor, c.tipo_categoria AS categoria
       FROM noticia n
       LEFT JOIN usuario u ON u.id = n.usuario_id
       LEFT JOIN categoria c ON c.id = n.categoria_id
       WHERE n.id = ?`,
      [id],
      // "?" é substituído pelo valor de "id" com segurança (evita SQL Injection)
    );
    return resultado[0] ?? null;
    // resultado é sempre um array — pega o primeiro item
    // ?? null: se não encontrar nada, retorna null em vez de undefined
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO noticia SET ?", [dados]);
    // "SET ?" aceita um objeto JavaScript diretamente
    // Ex: { titulo: "Título", conteudo: "..." } vira SET titulo='Título', conteudo='...'
    return resultado.insertId;
    // insertId retorna o ID gerado automaticamente pelo AUTO_INCREMENT
  },

  update: (id, dados) =>
    executarQuery("UPDATE noticia SET ? WHERE id = ?", [dados, id]),
  // Atualiza apenas os campos presentes no objeto "dados"

  delete: (id) => executarQuery("DELETE FROM noticia WHERE id = ?", [id]),
  // Remove a notícia pelo ID. A resposta contém "affectedRows"
};

module.exports = Noticia;
```

---

### `src/models/usuario.js`

```javascript
const CAMPOS_PUBLICOS =
  "id, nome, turma, email, rm, tipo, foto_perfil, descricao, created_at";
// Constante com os campos permitidos na resposta pública
// "senha" é intencionalmente omitida para nunca ser exposta

const Usuario = {
  findAll: () =>
    executarQuery(`SELECT ${CAMPOS_PUBLICOS} FROM usuario ORDER BY nome ASC`),
  // Lista todos os usuários SEM a senha, ordenados por nome

  findById: async (id) => {
    const resultado = await executarQuery(
      `SELECT ${CAMPOS_PUBLICOS} FROM usuario WHERE id = ?`,
      [id],
    );
    return resultado[0] ?? null;
    // Busca usuário por ID também sem retornar a senha
  },

  findByEmail: async (email) => {
    const resultado = await executarQuery(
      "SELECT * FROM usuario WHERE email = ?",
      [email],
    );
    return resultado[0] ?? null;
    // Busca por e-mail retorna TODOS os campos, incluindo a senha
    // Necessário para o login comparar o hash
    // A senha nunca sai daqui para o cliente — é descartada no service
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO usuario SET ?", [dados]);
    return resultado.insertId;
  },

  update: (id, dados) =>
    executarQuery("UPDATE usuario SET ? WHERE id = ?", [dados, id]),

  delete: (id) => executarQuery("DELETE FROM usuario WHERE id = ?", [id]),
};
```

---

### `src/models/comentario.js`

```javascript
const Comentario = {
  findAll: () =>
    executarQuery(`
      SELECT c.*, u.nome AS autor
      FROM comentario c
      LEFT JOIN usuario u ON u.id = c.usuario_id
      ORDER BY c.created_at DESC
    `),
  // Retorna todos os comentários com o nome do autor, do mais recente ao mais antigo

  findByNoticia: (noticia_id) =>
    executarQuery(
      `SELECT c.*, u.nome AS autor
       FROM comentario c
       LEFT JOIN usuario u ON u.id = c.usuario_id
       WHERE c.noticia_id = ?
       ORDER BY c.created_at DESC`,
      [noticia_id],
    ),
  // Filtra comentários de uma notícia específica — rota dedicada por notícia

  findById: async (id) => {
    const resultado = await executarQuery(
      `SELECT c.*, u.nome AS autor FROM comentario c
       LEFT JOIN usuario u ON u.id = c.usuario_id WHERE c.id = ?`,
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
```

---

### `src/models/curtida.js`

```javascript
const Curtida = {
  findByNoticia: (noticia_id) =>
    executarQuery(
      `SELECT c.*, u.nome AS autor FROM curtida c
       LEFT JOIN usuario u ON u.id = c.usuario_id
       WHERE c.noticia_id = ?`,
      [noticia_id],
    ),
  // Lista todas as curtidas de uma notícia com o nome de quem curtiu

  contarPorNoticia: async (noticia_id) => {
    const resultado = await executarQuery(
      "SELECT COUNT(*) AS total FROM curtida WHERE noticia_id = ?",
      [noticia_id],
    );
    return resultado[0].total;
    // COUNT(*) conta o número de linhas e retorna como "total"
    // Ex: retorna 42 se houver 42 curtidas
  },

  findByUsuarioENoticia: async (usuario_id, noticia_id) => {
    const resultado = await executarQuery(
      "SELECT * FROM curtida WHERE usuario_id = ? AND noticia_id = ?",
      [usuario_id, noticia_id],
    );
    return resultado[0] ?? null;
    // Verifica se o usuário JÁ curtiu essa notícia
    // Usado para implementar o toggle (adicionar/remover)
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO curtida SET ?", [dados]);
    return resultado.insertId;
  },

  delete: (id) => executarQuery("DELETE FROM curtida WHERE id = ?", [id]),
};
```

---

### `src/models/favoritar.js`

```javascript
const Favoritar = {
  findByUsuario: (usuario_id) =>
    executarQuery(
      `SELECT f.*, n.titulo AS noticia_titulo
       FROM favoritar f
       LEFT JOIN noticia n ON n.id = f.noticia_id
       WHERE f.usuario_id = ?
       ORDER BY f.created_at DESC`,
      [usuario_id],
    ),
  // Lista todos os favoritos de um usuário com o título da notícia favoritada
  // Ordenado do mais recente ao mais antigo

  findByUsuarioENoticia: async (usuario_id, noticia_id) => {
    const resultado = await executarQuery(
      "SELECT * FROM favoritar WHERE usuario_id = ? AND noticia_id = ?",
      [usuario_id, noticia_id],
    );
    return resultado[0] ?? null;
    // Verifica se o usuário já favoritou essa notícia (para o toggle)
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO favoritar SET ?", [
      dados,
    ]);
    return resultado.insertId;
  },

  delete: (id) => executarQuery("DELETE FROM favoritar WHERE id = ?", [id]),
};
```

---

### `src/models/categoria.js`

```javascript
const Categoria = {
  findAll: () =>
    executarQuery("SELECT * FROM categoria ORDER BY tipo_categoria ASC"),
  // Lista todas as categorias em ordem alfabética

  findById: async (id) => {
    const resultado = await executarQuery(
      "SELECT * FROM categoria WHERE id = ?",
      [id],
    );
    return resultado[0] ?? null;
  },

  findByTipo: async (tipo) => {
    const resultado = await executarQuery(
      "SELECT * FROM categoria WHERE tipo_categoria = ?",
      [tipo],
    );
    return resultado[0] ?? null;
    // Usado no service para checar duplicidade antes de criar
  },

  create: async (dados) => {
    const resultado = await executarQuery("INSERT INTO categoria SET ?", [
      dados,
    ]);
    return resultado.insertId;
  },

  update: (id, dados) =>
    executarQuery("UPDATE categoria SET ? WHERE id = ?", [dados, id]),

  delete: (id) => executarQuery("DELETE FROM categoria WHERE id = ?", [id]),
};
```

---

## 🗂️ CAMADA SERVICE — Regras de Negócio

A camada Service tem **uma única responsabilidade**: validar dados e aplicar as regras de negócio.  
Não conhece `req` nem `res` — trabalha apenas com dados puros.

---

### Função auxiliar `parseId` (presente em todos os services)

```javascript
const parseId = (id) => {
  const parsed = Number(id);
  // Converte o valor recebido para número
  // Necessário pois os parâmetros de rota chegam como string: "/:id"

  if (!Number.isInteger(parsed) || parsed <= 0) {
    // Verifica se é um número inteiro E positivo
    // "abc" vira NaN, que não é inteiro → lança erro
    // "0" ou "-1" também são inválidos para IDs de banco

    throw new AppError("ID inválido", 400);
    // Lança erro 400 Bad Request
  }

  return parsed;
  // Retorna o número válido para ser usado na query
};
```

---

### `src/services/noticiaService.js`

```javascript
const CAMPOS_OBRIGATORIOS_CRIACAO = [
  "usuario_id",
  "categoria_id",
  "titulo",
  "conteudo",
];
// Lista dos campos que DEVEM existir ao criar uma notícia
// Centralizado aqui para facilitar manutenção

const CAMPOS_ATUALIZAVEIS = ["titulo", "genero", "descricao", "conteudo"];
// Apenas esses campos podem ser alterados no update
// usuario_id e categoria_id não podem ser trocados após criação

const validarCamposObrigatorios = (dados) => {
  const faltando = CAMPOS_OBRIGATORIOS_CRIACAO.filter(
    (campo) =>
      dados[campo] === undefined ||
      dados[campo] === null ||
      dados[campo] === "",
  );
  // filter retorna os campos que estão ausentes, nulos ou vazios

  if (faltando.length > 0) {
    throw new AppError(
      `Campos obrigatórios ausentes: ${faltando.join(", ")}`,
      400,
    );
    // Mensagem detalhada informando exatamente quais campos faltam
    // Ex: "Campos obrigatórios ausentes: titulo, conteudo"
  }
};

const extrairCamposAtualizaveis = (body) => {
  return CAMPOS_ATUALIZAVEIS.reduce((acc, campo) => {
    // reduce percorre o array e constrói um novo objeto (acc = acumulador)

    if (body[campo] !== undefined && body[campo] !== "") {
      acc[campo] = String(body[campo]).trim();
      // Apenas inclui campos que foram enviados e não estão vazios
      // .trim() remove espaços desnecessários no início e fim
    }
    return acc;
  }, {});
  // Resultado: objeto só com os campos válidos informados
};

const noticiaService = {
  listarTodas: () => Noticia.findAll(),
  // Nenhuma validação necessária — apenas repassa para o model

  buscarPorId: async (id) => {
    const idValido = parseId(id);
    // Valida e converte o ID antes de qualquer operação no banco

    const noticia = await Noticia.findById(idValido);
    if (!noticia) throw new AppError("Notícia não encontrada", 404);
    // Se o model retornar null, lança erro 404 Not Found

    return noticia;
  },

  criar: async (body) => {
    validarCamposObrigatorios(body);
    // Valida antes de montar o objeto final

    const dados = {
      usuario_id: Number(body.usuario_id),
      categoria_id: Number(body.categoria_id),
      titulo: String(body.titulo).trim(),
      genero: body.genero ? String(body.genero).trim() : null,
      descricao: body.descricao ? String(body.descricao).trim() : null,
      // Campos opcionais recebem null se não informados
      conteudo: String(body.conteudo).trim(),
    };

    return await Noticia.create(dados);
    // Retorna o ID da nova notícia criada
  },

  atualizar: async (id, body) => {
    const idValido = parseId(id);

    const noticia = await Noticia.findById(idValido);
    if (!noticia) throw new AppError("Notícia não encontrada", 404);
    // Verifica se existe ANTES de tentar atualizar

    const dadosAtualizados = extrairCamposAtualizaveis(body);

    if (Object.keys(dadosAtualizados).length === 0) {
      throw new AppError("Nenhum campo válido informado para atualização", 400);
      // Impede chamadas de update que não alterariam nada
    }

    await Noticia.update(idValido, dadosAtualizados);
  },

  excluir: async (id) => {
    const idValido = parseId(id);
    const resultado = await Noticia.delete(idValido);

    if (resultado.affectedRows === 0) {
      throw new AppError("Notícia não encontrada", 404);
      // affectedRows === 0 significa que nenhuma linha foi deletada
      // Ou seja, o ID não existe no banco
    }
  },
};
```

---

### `src/services/usuarioService.js`

```javascript
const bcrypt = require("bcrypt");
// Biblioteca para criptografar senhas com hash seguro (bcrypt)

const SALT_ROUNDS = 10;
// Número de rounds do algoritmo de hash
// Quanto maior, mais seguro e mais lento
// 10 é o valor padrão recomendado para produção

const TIPOS_VALIDOS = ["aluno", "professor", "admin"];
// Tipos permitidos para o campo "tipo" do usuário
// Qualquer outro valor será rejeitado

const CAMPOS_ATUALIZAVEIS = ["nome", "turma", "descricao", "foto_perfil"];
// Campos que o usuário pode alterar
// "email", "rm", "tipo" não podem ser trocados facilmente por segurança

const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
  // Expressão regular que valida formato básico de e-mail
  // Verifica: algo@algo.algo
};

const usuarioService = {
  criar: async (body) => {
    // ...validações de campos obrigatórios, email e tipo...

    if (String(senha).length < 6) {
      throw new AppError("A senha deve ter ao menos 6 caracteres", 400);
    }

    const emailExistente = await Usuario.findByEmail(
      email.trim().toLowerCase(),
    );
    if (emailExistente) throw new AppError("E-mail já cadastrado", 409);
    // 409 Conflict — recurso já existe
    // Impede cadastro duplicado antes de tentar inserir no banco

    const senhaHash = await bcrypt.hash(String(senha), SALT_ROUNDS);
    // Gera o hash da senha antes de salvar no banco
    // O hash é irreversível — nem o banco sabe a senha real
    // Cada hash gerado é único mesmo para a mesma senha (por causa do salt)

    return await Usuario.create({ ...dados, senha: senhaHash });
    // Salva o hash no banco, nunca a senha em texto puro
  },

  login: async (body) => {
    const usuario = await Usuario.findByEmail(email.trim().toLowerCase());
    if (!usuario) throw new AppError("Credenciais inválidas", 401);
    // Usa "Credenciais inválidas" em vez de "E-mail não encontrado"
    // Evita confirmar se um e-mail existe no sistema (segurança)

    const senhaCorreta = await bcrypt.compare(String(senha), usuario.senha);
    // bcrypt.compare compara a senha digitada com o hash salvo no banco
    // Retorna true se corresponderem, false se não

    if (!senhaCorreta) throw new AppError("Credenciais inválidas", 401);

    const { senha: _, ...usuarioPublico } = usuario;
    // Desestruturação: separa o campo "senha" do resto
    // "_" é convenção para variável descartada
    // "usuarioPublico" tem todos os campos EXCETO a senha

    return usuarioPublico;
    // Nunca retorna a senha ao cliente, nem o hash
  },
};
```

---

### `src/services/curtidaService.js` e `src/services/favoritarService.js`

Ambos implementam o padrão **toggle** — o mesmo endpoint adiciona ou remove:

```javascript
alternarCurtida: async (body) => {
  // ...validação de usuario_id e noticia_id...

  const curtidaExistente = await Curtida.findByUsuarioENoticia(
    usuario_idValido, noticia_idValido
  );
  // Verifica se o usuário JÁ curtiu essa notícia

  if (curtidaExistente) {
    await Curtida.delete(curtidaExistente.id);
    return { acao: "removida" };
    // Se já curtiu → remove a curtida
  }

  const novoId = await Curtida.create({ usuario_id, noticia_id });
  return { acao: "adicionada", id: novoId };
  // Se ainda não curtiu → adiciona a curtida
  // Um único endpoint POST faz as duas coisas
},
```

---

### `src/services/comentarioService.js`

```javascript
criar: async (body) => {
  // ...validação de campos obrigatórios...

  const conteudoSanitizado = String(conteudo).trim();

  if (conteudoSanitizado.length < 2) {
    throw new AppError("O comentário deve ter ao menos 2 caracteres", 400);
    // Impede comentários em branco ou com um único caractere
  }

  if (conteudoSanitizado.length > 240) {
    throw new AppError("O comentário não pode ter mais de 240 caracteres", 400);
    // Limite alinhado com o VARCHAR(240) do banco de dados
    // A validação acontece antes de tentar inserir — evita erro no banco
  }

  return await Comentario.create({ usuario_id, noticia_id, conteudo: conteudoSanitizado });
},
```

---

## 🗂️ CAMADA CONTROLLER — Interface HTTP

Os controllers têm **uma única responsabilidade**: receber a requisição HTTP, chamar o service e devolver a resposta.  
Toda lógica fica no service — o controller só faz a ponte.

### Padrão aplicado em todos os controllers

```javascript
nomeDoMetodo: async (req, res, next) => {
  try {
    const resultado = await nomeService.nomeDoMetodo(/* dados do req */);
    // Chama o service passando apenas os dados necessários
    // Nunca passa "req" ou "res" para o service

    res.status(201).json({ sucesso: true, dados: resultado });
    // Devolve a resposta HTTP com os dados retornados pelo service

  } catch (erro) {
    next(erro);
    // Em caso de erro, passa para o middleware errorHandler
    // O errorHandler decide o status e a mensagem da resposta de erro
    // Sem next(erro), o Express travaria sem responder ao cliente
  }
},
```

> O `try/catch` nos controllers não precisa saber o tipo do erro — apenas repassa com `next(erro)`. Quem decide como responder é o `errorHandler`.

---

## 🗂️ CAMADA ROUTES — Mapeamento de Endpoints

As rotas mapeiam **método HTTP + caminho** para o método do controller correto.

### `src/routes/noticiaRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
// Router é um mini-app do Express — agrupa rotas relacionadas

const noticiaController = require("../controllers/noticiaController");

router.get("/", noticiaController.listarTodas); // GET  /noticias
router.get("/:id", noticiaController.buscarPorId); // GET  /noticias/5
router.post("/", noticiaController.criar); // POST /noticias
router.put("/:id", noticiaController.atualizar); // PUT  /noticias/5
router.delete("/:id", noticiaController.excluir); // DELETE /noticias/5

module.exports = router;
// Exportado e registrado no app.js com: app.use("/noticias", noticiaRoutes)
```

### `src/routes/comentarioRoutes.js`

```javascript
router.get("/", comentarioController.listarTodos);
router.get("/noticia/:noticia_id", comentarioController.listarPorNoticia);
// Rota extra: GET /comentarios/noticia/3 → comentários da notícia 3

router.get("/:id", comentarioController.buscarPorId);
router.post("/", comentarioController.criar);
router.put("/:id", comentarioController.atualizar);
router.delete("/:id", comentarioController.excluir);
```

### `src/routes/curtidaRoutes.js`

```javascript
router.get("/noticia/:noticia_id", curtidaController.listarPorNoticia);
// GET /curtidas/noticia/3 → lista curtidas da notícia 3

router.post("/", curtidaController.alternarCurtida);
// POST /curtidas → toggle: adiciona se não curtiu, remove se já curtiu
// Um único endpoint faz as duas ações
```

### `src/routes/favoritarRoutes.js`

```javascript
router.get("/usuario/:usuario_id", favoritarController.listarPorUsuario);
// GET /favoritos/usuario/1 → notícias favoritadas pelo usuário 1

router.post("/", favoritarController.alternarFavorito);
// POST /favoritos → toggle: adiciona ou remove favorito
```

### `src/routes/usuarioRoutes.js`

```javascript
router.get("/", usuarioController.listarTodos);
router.get("/:id", usuarioController.buscarPorId);
router.post("/", usuarioController.criar);
router.post("/login", usuarioController.login);
// POST /usuarios/login → endpoint dedicado para autenticação

router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.excluir);
```

---

## 🔁 Fluxo Completo de uma Requisição

```
[Cliente faz uma requisição HTTP]
          ↓
      server.js
  (inicia o servidor)
          ↓
       app.js
  (direciona para a rota)
          ↓
    routes/*.js
  (identifica método + caminho)
          ↓
  controllers/*.js
  (recebe req, chama service)
          ↓
  services/*.js
  (valida dados, aplica regras)
          ↓
   models/*.js
  (executa a query SQL)
          ↓
   config/database.js
  (pool envia para o MySQL)
          ↓
   [MySQL processa e retorna]
          ↓
  (resposta sobe pelo mesmo caminho)
          ↓
  [Cliente recebe o JSON]

  Em qualquer etapa, se houver erro:
          ↓
  middlewares/errorHandler.js
  (devolve resposta de erro padronizada)
```

---

## 🌐 Endpoints Disponíveis

### Notícias `/noticias`

| Método | Rota            | Ação                    |
| ------ | --------------- | ----------------------- |
| GET    | `/noticias`     | Lista todas as notícias |
| GET    | `/noticias/:id` | Busca notícia por ID    |
| POST   | `/noticias`     | Cria nova notícia       |
| PUT    | `/noticias/:id` | Atualiza notícia        |
| DELETE | `/noticias/:id` | Remove notícia          |

### Categorias `/categorias`

| Método | Rota              | Ação                      |
| ------ | ----------------- | ------------------------- |
| GET    | `/categorias`     | Lista todas as categorias |
| GET    | `/categorias/:id` | Busca categoria por ID    |
| POST   | `/categorias`     | Cria nova categoria       |
| PUT    | `/categorias/:id` | Atualiza categoria        |
| DELETE | `/categorias/:id` | Remove categoria          |

### Comentários `/comentarios`

| Método | Rota                               | Ação                       |
| ------ | ---------------------------------- | -------------------------- |
| GET    | `/comentarios`                     | Lista todos os comentários |
| GET    | `/comentarios/noticia/:noticia_id` | Comentários de uma notícia |
| GET    | `/comentarios/:id`                 | Busca comentário por ID    |
| POST   | `/comentarios`                     | Cria comentário            |
| PUT    | `/comentarios/:id`                 | Atualiza comentário        |
| DELETE | `/comentarios/:id`                 | Remove comentário          |

### Curtidas `/curtidas`

| Método | Rota                            | Ação                               |
| ------ | ------------------------------- | ---------------------------------- |
| GET    | `/curtidas/noticia/:noticia_id` | Curtidas de uma notícia            |
| POST   | `/curtidas`                     | Toggle: adiciona ou remove curtida |

### Favoritos `/favoritos`

| Método | Rota                             | Ação                                |
| ------ | -------------------------------- | ----------------------------------- |
| GET    | `/favoritos/usuario/:usuario_id` | Favoritos de um usuário             |
| POST   | `/favoritos`                     | Toggle: adiciona ou remove favorito |

### Usuários `/usuarios`

| Método | Rota              | Ação                    |
| ------ | ----------------- | ----------------------- |
| GET    | `/usuarios`       | Lista todos os usuários |
| GET    | `/usuarios/:id`   | Busca usuário por ID    |
| POST   | `/usuarios`       | Cria novo usuário       |
| POST   | `/usuarios/login` | Realiza login           |
| PUT    | `/usuarios/:id`   | Atualiza usuário        |
| DELETE | `/usuarios/:id`   | Remove usuário          |

---

## 📐 Princípios Aplicados

### SOLID

| Princípio                     | Como foi aplicado                                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| **S** — Single Responsibility | Cada arquivo tem uma única responsabilidade: Model faz queries, Service valida, Controller responde HTTP |
| **O** — Open/Closed           | `AppError` é extensível sem alterar controllers ou errorHandler                                          |
| **D** — Dependency Inversion  | Controllers dependem dos services, não dos models diretamente                                            |

### Clean Code

| Prática             | Onde aparece                                                        |
| ------------------- | ------------------------------------------------------------------- |
| Nomes descritivos   | `extrairCamposAtualizaveis`, `validarCamposObrigatorios`, `parseId` |
| Funções pequenas    | Cada função faz uma única coisa                                     |
| Sem repetição (DRY) | `parseId` centralizado, `executarQuery` reutilizado                 |
| Constantes nomeadas | `SALT_ROUNDS`, `TIPOS_VALIDOS`, `CAMPOS_ATUALIZAVEIS`               |
| Erros centralizados | `errorHandler` captura tudo em um único lugar                       |

---

## 🔒 Segurança

- **Senhas** nunca salvas em texto puro — sempre com hash `bcrypt`
- **Senha** nunca retornada nas respostas ao cliente
- **SQL Injection** prevenido com placeholders `?` em todas as queries
- **Mensagens de erro de login** genéricas — não confirmam se e-mail existe
- **Erros internos** não expõem detalhes técnicos ao cliente
