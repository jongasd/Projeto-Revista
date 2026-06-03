# 🗞️ Conecta Jovem — Frontend

![Banner](https://i.ibb.co/5vW2kYQ/tech-anime-banner.gif)

Bem-vindo ao repositório do **Conecta Jovem** — interface web da plataforma de revista digital desenvolvida em grupo como projeto prático durante o curso de **Desenvolvimento de Sistemas (DS)** no SENAI. O frontend consome a API REST do Projeto Revista e oferece uma experiência completa de leitura, publicação e interação com notícias. 🚀

🌐 **Acesse o projeto em produção:** [projeto-revista.vercel.app](https://projeto-revista.vercel.app)

---

<img src="https://github.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/assets/74038190/c288471c-be67-4fbb-af44-1c63ee9ed280" />

## 🎯 Sobre o Projeto

O **Conecta Jovem** é o frontend da plataforma de revista digital, desenvolvido com **HTML, CSS e JavaScript puro**, sem frameworks. A interface consome diretamente a API REST do backend e oferece ao usuário:

- **Login e Cadastro** — autenticação com validação de campos
- **Feed principal** — notícias em destaque, recentes e mais lidas
- **Categorias** — Educação, Política, Mundo do Trabalho, Tecnologia, Saúde e Economia
- **Leitura de notícias** — visualização de PDFs e textos publicados
- **Criação de notícias** — editor rico com formatação, contagem de palavras e pré-visualização em tempo real
- **Perfil** — edição de dados pessoais, biografia e foto de avatar
- **Menu lateral** — navegação rápida entre seções com drawer animado

---

## 👥 Integrantes do Grupo

<table align="center">
  <tr>
    <td align="center">
      <b>Agatha Helena</b><br/>
      <a href="https://github.com/Agatha-Helena">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
    </td>
    <td align="center">
      <b>Gabriel Ortelan</b><br/>
      <a href="https://github.com/Ortelan-Gabriel1">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
    </td>
    <td align="center">
      <b>Gustavo Hyppolito</b><br/>
      <a href="https://github.com/Gustavo-Hyppolito">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
    </td>
    <td align="center">
      <b>Jonas Daniel</b><br/>
      <a href="https://github.com/jongasd">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
    </td>
    <td align="center">
      <b>Rafael Dutra</b><br/>
      <a href="https://github.com/rafaeldutra-aurasenai">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
    </td>
    <td align="center">
      <b>Vinícius Valle</b><br/>
      <a href="https://github.com/Valle-Vinicius">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
      </a>
    </td>
  </tr>
</table>

---

## 🛠️ Tecnologias Utilizadas

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="VSCode">
</p>

---

## 📂 Estrutura do Projeto

```
conecta-jovem/
├── index.html                  → Feed principal
└── src/
    ├── images/                 → Logotipos e assets visuais
    ├── styles/
    │   └── style.css           → Estilos globais do projeto
    ├── scripts/
    │   ├── feed.js             → Lógica do feed principal
    │   ├── login.js            → Autenticação
    │   ├── cadastro.js         → Cadastro de usuário
    │   ├── perfil.js           → Edição de perfil e avatar
    │   ├── criar-noticia.js    → Editor rico de notícias
    │   ├── education.js        → Lógica das páginas de categoria
    │   └── hamburguer.js       → Menu lateral (drawer)
    └── pages/
        ├── login.html
        ├── cadastro.html
        ├── perfil.html
        ├── criar-noticia.html
        ├── turma.html
        └── notices/
            ├── educacao.html
            ├── politica.html
            ├── tecnologia.html
            ├── saude.html
            ├── economia.html
            └── mundoTrabalho.html
```

---

## 📄 Páginas

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| Feed | `index.html` | Destaque, recentes, mais lidas e comentários |
| Login | `login.html` | Autenticação do usuário |
| Cadastro | `cadastro.html` | Registro de novo usuário |
| Perfil | `perfil.html` | Edição de dados, bio e foto |
| Criar Notícia | `criar-noticia.html` | Editor rico com pré-visualização |
| Categorias | `notices/*.html` | Feed filtrado por categoria |
| Ver Turma | `turma.html` | Visualização dos colegas de turma |

---

## 🔗 Integração com a API

O frontend consome a [API REST do Projeto Revista](https://github.com/seu-usuario/api-revista). Todos os dados são carregados dinamicamente via `fetch`. Os principais endpoints utilizados são:

| Funcionalidade | Método | Rota |
|----------------|--------|------|
| Listar notícias | GET | `/noticias` |
| Buscar notícia | GET | `/noticias/:id` |
| Criar notícia | POST | `/noticias` |
| Login | POST | `/usuarios/login` |
| Cadastrar usuário | POST | `/usuarios` |
| Atualizar perfil | PUT | `/usuarios/:id` |
| Listar comentários | GET | `/comentarios/noticia/:id` |
| Criar comentário | POST | `/comentarios` |
| Toggle curtida | POST | `/curtidas` |

---

## ✨ Funcionalidades em Destaque

### 📝 Editor Rico de Notícias
Criação de notícias com formatação completa: negrito, itálico, sublinhado, tachado, alinhamento, listas, tamanho e cor de texto. Contagem de palavras, linhas e caracteres em tempo real, com pré-visualização ao vivo do card final.

### 🎨 Design System Consistente
Todo o projeto compartilha um único `style.css` global com variáveis de cor, tipografia (Montserrat) e componentes reutilizáveis — navbar, cards, tags, sidebar de comentários e menu hamburguer.

### 📱 Responsivo
Layout adaptado para desktop, tablet e mobile com CSS Grid e Media Queries. O menu hamburguer com drawer animado facilita a navegação em telas menores.

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- [API do backend](https://github.com/seu-usuario/api-revista) rodando localmente ou em produção

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/conecta-jovem.git

# 2. Entre na pasta do projeto
cd conecta-jovem

# 3. Abra no navegador
# Opção A — abra o index.html direto no navegador
# Opção B — use um servidor local (recomendado para evitar erros de CORS)
npx serve .
# ou
python -m http.server 5500
```

> 💡 Configure a URL base da API nos scripts JS. Procure por `BASE_URL` ou a constante de configuração e aponte para `http://localhost:3000` (local) ou a URL de produção da API.

---

## 🌐 Deploy

O projeto está hospedado na **Vercel** e atualiza automaticamente a cada push na branch `main`.

🔗 [https://projeto-revista.vercel.app](https://projeto-revista.vercel.app)

---

## 📐 Boas Práticas Aplicadas

- **Componentização via CSS** — classes reutilizáveis para cards, tags, navbar e sidebar
- **JavaScript modular** — um arquivo `.js` por página, sem acoplamento entre módulos
- **Acessibilidade** — atributos `aria-label`, `aria-hidden` e navegação por teclado no menu
- **Sem dependências externas** — zero frameworks ou bibliotecas de terceiros
- **Código limpo** — funções pequenas, nomes descritivos e comentários objetivos

---

## 🌟 Objetivos de Aprendizado

- Desenvolver uma interface web completa e responsiva do zero
- Consumir uma API REST com `fetch` e manipular respostas JSON
- Aplicar design system consistente com CSS puro
- Trabalhar com `localStorage` para persistência de dados no cliente
- Praticar organização de projeto, componentização e boas práticas de frontend
- Desenvolver habilidades de trabalho em equipe e versionamento com Git

---

<p align="center">
  <i>"Desenvolvendo soluções reais com tecnologia, arquitetura e boas práticas — juntos."</i>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/SENAI-E8222E?style=for-the-badge&logoColor=white" alt="SENAI">
  <img src="https://img.shields.io/badge/DS-Desenvolvimento de Sistemas-0077B5?style=for-the-badge" alt="DS">
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>
