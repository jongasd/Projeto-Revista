# 📰 Projeto Revista — API REST

![Banner](https://i.ibb.co/5vW2kYQ/tech-anime-banner.gif)

Bem-vindo ao repositório do **Projeto Revista**! Uma API REST completa desenvolvida em grupo como projeto prático durante o curso de **Desenvolvimento de Sistemas (DS)** no SENAI. O projeto simula o backend de uma plataforma de revista digital, onde usuários podem ler, publicar, comentar, curtir e favoritar notícias. 🚀

---

<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/c288471c-be67-4fbb-af44-1c63ee9ed280" />

## 🎯 Sobre o Projeto

O **Projeto Revista** é uma API REST desenvolvida com **Node.js + Express**, seguindo a arquitetura **MVC** e aplicando os princípios de **Clean Code** e **SOLID**. A API gerencia todas as funcionalidades de uma revista digital:

- **Usuários**: Cadastro, login com senha criptografada e gerenciamento de perfis.
- **Notícias**: Publicação, listagem, edição e remoção de artigos.
- **Categorias**: Organização das notícias por categoria.
- **Comentários**: Interação dos leitores com as notícias.
- **Curtidas**: Sistema de toggle para curtir e descurtir notícias.
- **Favoritos**: Sistema de toggle para salvar notícias favoritas.

---

## 👥 Integrantes do Grupo

<table align="center">
  <tr>
    <td align="center">
      <b>Integrante 1</b><br/>
      <a href="https://github.com/integrante1">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
      <a href="https://linkedin.com/in/integrante1">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
    <td align="center">
      <b>Integrante 2</b><br/>
      <a href="https://github.com/integrante2">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
      <a href="https://linkedin.com/in/integrante2">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
    <td align="center">
      <b>Integrante 3</b><br/>
      <a href="https://github.com/integrante3">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
      <a href="https://linkedin.com/in/integrante3">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
      </a>
    </td>
  </tr>
</table>

> ⚠️ Substitua os nomes e links acima pelos dados reais de cada integrante.

---

## 🛠️ Tecnologias Utilizadas

<p align="center">
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm">
  <img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VSCode">
</p>

---

## 📂 Estrutura do Projeto

```
api-revista/
└── projeto-revista/
    ├── node_modules/
    ├── .env
    ├── package.json
    ├── server.js
    └── src/
        ├── config/          → Conexão com o banco de dados
        ├── controllers/     → Recebe as requisições HTTP
        ├── middlewares/     → Tratamento global de erros
        ├── models/          → Comunicação com o banco de dados
        ├── routes/          → Mapeamento dos endpoints
        ├── services/        → Regras de negócio e validações
        └── utils/           → Utilitários (AppError customizado)
```

---

## 🔗 Endpoints da API

| Entidade | Método | Rota | Ação |
|----------|--------|------|------|
| Notícias | GET | `/noticias` | Lista todas |
| Notícias | GET | `/noticias/:id` | Busca por ID |
| Notícias | POST | `/noticias` | Cria nova |
| Notícias | PUT | `/noticias/:id` | Atualiza |
| Notícias | DELETE | `/noticias/:id` | Remove |
| Categorias | GET | `/categorias` | Lista todas |
| Categorias | GET | `/categorias/:id` | Busca por ID |
| Categorias | POST | `/categorias` | Cria nova |
| Categorias | PUT | `/categorias/:id` | Atualiza |
| Categorias | DELETE | `/categorias/:id` | Remove |
| Comentários | GET | `/comentarios` | Lista todos |
| Comentários | GET | `/comentarios/noticia/:id` | Por notícia |
| Comentários | POST | `/comentarios` | Cria |
| Comentários | PUT | `/comentarios/:id` | Atualiza |
| Comentários | DELETE | `/comentarios/:id` | Remove |
| Curtidas | GET | `/curtidas/noticia/:id` | Por notícia |
| Curtidas | POST | `/curtidas` | Toggle curtida |
| Favoritos | GET | `/favoritos/usuario/:id` | Por usuário |
| Favoritos | POST | `/favoritos` | Toggle favorito |
| Usuários | GET | `/usuarios` | Lista todos |
| Usuários | GET | `/usuarios/:id` | Busca por ID |
| Usuários | POST | `/usuarios` | Cadastra |
| Usuários | POST | `/usuarios/login` | Login |
| Usuários | PUT | `/usuarios/:id` | Atualiza |
| Usuários | DELETE | `/usuarios/:id` | Remove |

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- MySQL 8+

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/api-revista.git

# 2. Entre na pasta do projeto
cd api-revista/projeto-revista

# 3. Instale as dependências
npm install

# 4. Configure o arquivo .env
# Crie um arquivo .env na raiz de projeto-revista com:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=projeto_revista

# 5. Crie o banco de dados
# Execute o arquivo Projeto-revista.sql no seu cliente MySQL

# 6. Inicie o servidor
npm run dev    # desenvolvimento
npm start      # produção
```

---

## 📐 Arquitetura e Boas Práticas

Este projeto aplica os seguintes princípios:

- **MVC** → Separação clara entre Model, View (JSON) e Controller
- **Clean Code** → Código legível, funções pequenas e nomes descritivos
- **SOLID** → Cada classe/arquivo tem uma única responsabilidade
- **DRY** → Sem repetição de código (funções reutilizáveis nos services)
- **Segurança** → Senhas com hash `bcrypt`, proteção contra SQL Injection, dados sensíveis nunca expostos nas respostas

---

## 🌟 Objetivos de Aprendizado

- Desenvolver uma API REST completa do zero com Node.js e Express
- Aplicar arquitetura MVC em um projeto real em equipe
- Praticar Clean Code e princípios SOLID
- Trabalhar com banco de dados relacional MySQL e queries com JOINs
- Implementar segurança com criptografia de senhas via bcrypt
- Estruturar tratamento de erros centralizado e padronizado
- Desenvolver habilidades de trabalho em grupo e versionamento com Git

---

<p align="center">
  <i>"Desenvolvendo soluções reais com tecnologia, arquitetura e boas práticas — juntos."</i>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/SENAI-E8222E?style=for-the-badge&logoColor=white" alt="SENAI">
  <img src="https://img.shields.io/badge/DS-Desenvolvimento de Sistemas-0077B5?style=for-the-badge" alt="DS">
</p>
