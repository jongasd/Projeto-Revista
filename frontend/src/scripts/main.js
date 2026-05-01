/* =============================================
   ⚙️ CONFIGURAÇÃO DA API
   ============================================= */
const API_BASE_URL = "http://localhost:3000"; // ← mesma do script.js

/* =============================================
   ÍCONES E CORES POR EIXO/CATEGORIA
   ============================================= */
const EIXO_CONFIG = {
  sociedade: { icon: "🏛️", color: "#6366f1" },
  tecnologia: { icon: "💻", color: "#0ea5e9" },
  "meio ambiente": { icon: "🌿", color: "#22c55e" },
  cultura: { icon: "🎭", color: "#f97316" },
  educação: { icon: "📚", color: "#a855f7" },
  saúde: { icon: "🏥", color: "#ef4444" },
  política: { icon: "⚖️", color: "#eab308" },
  esportes: { icon: "⚽", color: "#14b8a6" },
};

function getEixoConfig(nome = "") {
  const key = nome.toLowerCase().trim();
  return (
    EIXO_CONFIG[key] ||
    Object.entries(EIXO_CONFIG).find(([k]) => key.includes(k))?.[1] || {
      icon: "📰",
      color: "#4f8ef7",
    }
  );
}

/* =============================================
   ESTADO
   ============================================= */
let todasNoticias = [];
let categorias = [];
let categoriaAtiva = "";
let paginaAtual = 1;
const POR_PAGINA = 6;

/* =============================================
   INIT
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ano").textContent = new Date().getFullYear();
  initNavbar();
  Promise.all([carregarCategorias(), carregarNoticias()]);
});

/* =============================================
   NAVBAR — scroll + hamburger + dropdown mobile
   ============================================= */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  // Scroll
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  });

  // Hamburger
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Dropdown mobile: clicar no trigger abre/fecha
  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-trigger");
    trigger?.addEventListener("click", () => {
      if (window.innerWidth <= 820) {
        dropdown.classList.toggle("open");
      }
    });
  });

  // Fechar menu ao clicar em link
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

/* =============================================
   CARREGAR CATEGORIAS
   ============================================= */
async function carregarCategorias() {
  try {
    const res = await fetch(`${API_BASE_URL}/categorias`);
    const json = await res.json();
    categorias = json.dados || json || [];
    renderCategorias();
  } catch (err) {
    console.warn("Categorias indisponíveis, usando dados de exemplo.", err);
    categorias = [
      { id: 1, nome: "Sociedade" },
      { id: 2, nome: "Tecnologia" },
      { id: 3, nome: "Meio Ambiente" },
      { id: 4, nome: "Cultura" },
    ];
    renderCategorias();
  }
}

function renderCategorias() {
  // Dropdown navbar
  const dropdown = document.getElementById("dropdown-eixos");
  dropdown.innerHTML = categorias
    .map(
      (c) =>
        `<a href="#publicacoes" class="dropdown-item" onclick="filtrarPorCategoria('${c.nome}')">${c.nome}</a>`,
    )
    .join("");

  // Footer
  const footerEixos = document.getElementById("footer-eixos");
  footerEixos.innerHTML = categorias
    .map(
      (c) =>
        `<a href="#publicacoes" onclick="filtrarPorCategoria('${c.nome}')">${c.nome}</a>`,
    )
    .join("");

  // Filtro de categorias nas publicações
  const filtros = document.getElementById("filtros");
  const btnsTodos = filtros.querySelector('[data-cat=""]');
  // remove filtros antigos (mantém "Todos")
  filtros
    .querySelectorAll("[data-cat]:not([data-cat=''])")
    .forEach((b) => b.remove());

  categorias.forEach((c) => {
    const btn = document.createElement("button");
    btn.className = "filtro-btn";
    btn.dataset.cat = c.nome;
    btn.textContent = c.nome;
    btn.addEventListener("click", () => filtrarPorCategoria(c.nome));
    filtros.appendChild(btn);
  });

  btnsTodos.addEventListener("click", () => filtrarPorCategoria(""));

  // Eixos grid
  renderEixosGrid();
}

function renderEixosGrid() {
  const grid = document.getElementById("eixos-grid");
  grid.innerHTML = "";

  if (categorias.length === 0) {
    grid.innerHTML = `<div class="empty-state"><p>Nenhum eixo cadastrado.</p></div>`;
    return;
  }

  categorias.forEach((cat) => {
    const cfg = getEixoConfig(cat.nome);
    const count = todasNoticias.filter(
      (n) => (n.categoria?.nome || n.categoria) === cat.nome,
    ).length;

    const card = document.createElement("div");
    card.className = "eixo-card";
    card.style.setProperty("--eixo-color", cfg.color);
    card.innerHTML = `
      <span class="eixo-icon">${cfg.icon}</span>
      <div class="eixo-nome">${cat.nome}</div>
      <div class="eixo-count">${count} publicaç${count === 1 ? "ão" : "ões"}</div>
    `;
    card.addEventListener("click", () => {
      filtrarPorCategoria(cat.nome);
      document
        .getElementById("publicacoes")
        .scrollIntoView({ behavior: "smooth" });
    });
    grid.appendChild(card);
  });
}

/* =============================================
   CARREGAR NOTÍCIAS
   ============================================= */
async function carregarNoticias() {
  try {
    const res = await fetch(`${API_BASE_URL}/noticias`);
    const json = await res.json();
    todasNoticias = json.dados || json || [];
  } catch (err) {
    console.warn("Notícias indisponíveis, usando dados de exemplo.", err);
    todasNoticias = gerarNoticiasFake();
  }

  renderHero();
  renderArtigos();
  renderStats();
  renderEixosGrid(); // atualiza contagens
}

/* =============================================
   HERO — usa a notícia mais recente
   ============================================= */
function renderHero() {
  if (todasNoticias.length === 0) return;
  const destaque = todasNoticias[0];

  const catNome = destaque.categoria?.nome || destaque.categoria || "Destaque";
  const cfg = getEixoConfig(catNome);

  document
    .getElementById("hero-badge")
    .style.setProperty("--badge-color", cfg.color);
  document.getElementById("hero-categoria").textContent = catNome;
  document.getElementById("hero-titulo").textContent =
    destaque.titulo || "Sem título";
  document.getElementById("hero-lide").textContent =
    destaque.lide || destaque.descricao || "";
  document.getElementById("hero-autor").textContent =
    destaque.autor?.nome || destaque.autor || "Autor desconhecido";
  document.getElementById("hero-data").textContent = formatarData(
    destaque.created_at || destaque.data,
  );
  document.getElementById("hero-link").href = `#artigo-${destaque.id}`;

  if (destaque.imagem || destaque.foto) {
    const heroImage = document.getElementById("hero-image");
    heroImage.innerHTML = `<img src="${destaque.imagem || destaque.foto}" alt="${destaque.titulo}" />`;
  }
}

/* =============================================
   ARTIGOS GRID
   ============================================= */
function renderArtigos() {
  const grid = document.getElementById("artigos-grid");
  const btnLM = document.getElementById("btn-load-more");

  const filtradas = categoriaAtiva
    ? todasNoticias.filter(
        (n) => (n.categoria?.nome || n.categoria) === categoriaAtiva,
      )
    : todasNoticias;

  const total = filtradas.length;
  const exibir = filtradas.slice(0, paginaAtual * POR_PAGINA);
  const temMais = exibir.length < total;

  grid.innerHTML = "";

  if (exibir.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <p>Nenhuma publicação encontrada nesta categoria.</p>
      </div>`;
    btnLM.style.display = "none";
    return;
  }

  exibir.forEach((noticia) => grid.appendChild(criarCardArtigo(noticia)));

  btnLM.style.display = temMais ? "inline-block" : "none";
  btnLM.onclick = () => {
    paginaAtual++;
    renderArtigos();
  };
}

function criarCardArtigo(noticia) {
  const catNome = noticia.categoria?.nome || noticia.categoria || "";
  const cfg = getEixoConfig(catNome);
  const card = document.createElement("div");
  card.className = "artigo-card";
  card.id = `artigo-${noticia.id}`;

  card.innerHTML = `
    <div class="artigo-thumb">
      ${
        noticia.imagem || noticia.foto
          ? `<img src="${noticia.imagem || noticia.foto}" alt="${noticia.titulo}" loading="lazy" />`
          : `<div class="artigo-thumb-placeholder">${cfg.icon}</div>`
      }
    </div>
    <div class="artigo-body">
      ${catNome ? `<span class="artigo-tag">${catNome}</span>` : ""}
      <div class="artigo-titulo">${noticia.titulo || "Sem título"}</div>
      <div class="artigo-lide">${noticia.lide || noticia.descricao || ""}</div>
      <div class="artigo-footer">
        <span class="artigo-autor">${noticia.autor?.nome || noticia.autor || "—"}</span>
        <span class="artigo-data">${formatarData(noticia.created_at || noticia.data)}</span>
      </div>
    </div>
  `;

  card.addEventListener("click", () => {
    // Futuramente: window.location.href = `artigo.html?id=${noticia.id}`
    console.log("Abrir artigo:", noticia.id);
  });

  return card;
}

/* =============================================
   FILTRO POR CATEGORIA
   ============================================= */
function filtrarPorCategoria(cat) {
  categoriaAtiva = cat;
  paginaAtual = 1;

  document.querySelectorAll(".filtro-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });

  renderArtigos();
}

/* =============================================
   STATS
   ============================================= */
function renderStats() {
  document.getElementById("stat-artigos").textContent = todasNoticias.length;

  const autoresUnicos = new Set(
    todasNoticias.map((n) => n.autor?.nome || n.autor || "").filter(Boolean),
  ).size;
  document.getElementById("stat-autores").textContent = autoresUnicos || "—";
}

/* =============================================
   DADOS FAKE (fallback sem backend)
   ============================================= */
function gerarNoticiasFake() {
  const categorias = [
    "Sociedade",
    "Tecnologia",
    "Meio Ambiente",
    "Cultura",
    "Educação",
  ];
  const autores = [
    "Maria Souza",
    "João Silva",
    "Ana Pereira",
    "Carlos Lima",
    "Julia Ramos",
  ];
  const noticias = [
    {
      titulo: "O Papel da Escrita na Era Digital",
      lide: "Em um mundo dominado por mídias visuais, a palavra escrita ainda guarda um poder singular de transformação.",
      categoria: "Educação",
    },
    {
      titulo: "Tecnologia e Desigualdade: Dois Lados da Mesma Moeda",
      lide: "O avanço tecnológico prometeu igualdade, mas os dados revelam um cenário mais complexo.",
      categoria: "Tecnologia",
    },
    {
      titulo: "Crônica do Cotidiano: O Ônibus das 7h",
      lide: "Todos os dias, a cidade se move em silêncios compartilhados e histórias invisíveis.",
      categoria: "Sociedade",
    },
    {
      titulo: "Natureza em Crise: Um Ensaio sobre o Antropoceno",
      lide: "A pegada humana no planeta já ultrapassou todos os limites conhecidos.",
      categoria: "Meio Ambiente",
    },
    {
      titulo: "Manifestações Culturais como Resistência",
      lide: "Arte, música e literatura como formas de preservação identitária nas periferias urbanas.",
      categoria: "Cultura",
    },
    {
      titulo: "Educação Pública: Conquistas e Desafios Contemporâneos",
      lide: "Um olhar crítico sobre o sistema educacional brasileiro a partir da experiência cotidiana dos estudantes.",
      categoria: "Educação",
    },
  ];

  return noticias.map((n, i) => ({
    id: i + 1,
    titulo: n.titulo,
    lide: n.lide,
    categoria: { nome: n.categoria },
    autor: { nome: autores[i % autores.length] },
    created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  }));
}

/* =============================================
   UTILITÁRIOS
   ============================================= */
function formatarData(dataStr) {
  if (!dataStr) return "";
  try {
    return new Date(dataStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
