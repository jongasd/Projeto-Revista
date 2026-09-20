// ═══════════════════════════════════════════
//  CONECTA JOVEM — feed.js
//  Busca as notícias reais da API (ver noticiasApi.js) em vez de usar
//  um catálogo fixo no código.
// ═══════════════════════════════════════════

let NOTICIAS = [];

// ── SVG helpers ────────────────────────────────────────────────────────────
const SVG_COMMENT = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>`;

const SVG_STAR = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02
                   12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
</svg>`;

// ── Favoritos (localStorage) ───────────────────────────────────────────────
function getFavoritos() {
  try {
    return JSON.parse(localStorage.getItem("cj_favoritos") || "[]");
  } catch {
    return [];
  }
}

function toggleFavorito(id) {
  const favs = getFavoritos();
  const idx = favs.indexOf(id);
  if (idx === -1) favs.push(id);
  else favs.splice(idx, 1);
  localStorage.setItem("cj_favoritos", JSON.stringify(favs));
  return idx === -1; // true = agora é favorito
}

// ── Navegar para notícia ───────────────────────────────────────────────────
function abrirNoticia(noticia) {
  window.location.href = `./src/pages/notices/noticia.html?id=${noticia.id}`;
}

// ── Criar card pequeno (feed-card) ─────────────────────────────────────────
function criarCard(noticia, extra = "") {
  const favs = getFavoritos();
  const isFav = favs.includes(noticia.id);

  const card = document.createElement("article");
  card.className = `feed-card ${extra}`;
  card.style.cursor = "pointer";

  card.innerHTML = `
    <div class="feed-card-img">
      <img src="${noticia.img}" alt="${noticia.titulo}"
           onerror="this.style.opacity='0'"/>
      <button class="feed-card-star ${isFav ? "feed-card-star--active" : ""}"
              aria-label="Favoritar" data-id="${noticia.id}">★</button>
    </div>
    <div class="feed-card-body">
      <h3 class="feed-card-title">${noticia.titulo}</h3>
      <div class="feed-card-footer">
        <div class="feed-card-tags">
          <span class="feed-tag">${noticia.autor.split(" ")[0]}</span>
          <span class="feed-tag">${noticia.categoria}</span>
        </div>
        <div class="feed-card-stats">
          <span class="feed-stat">${SVG_COMMENT}${noticia.comentarios}</span>
          <span class="feed-stat">${SVG_STAR}${noticia.favoritos}</span>
        </div>
      </div>
    </div>`;

  // Clique no card → notícia
  card.addEventListener("click", (e) => {
    if (e.target.closest(".feed-card-star")) return;
    abrirNoticia(noticia);
  });

  // Clique na estrela → favorito
  card.querySelector(".feed-card-star").addEventListener("click", (e) => {
    e.stopPropagation();
    const ativo = toggleFavorito(noticia.id);
    e.currentTarget.classList.toggle("feed-card-star--active", ativo);
  });

  return card;
}

// ── Preencher destaque ─────────────────────────────────────────────────────
function renderDestaque(noticia) {
  const favs = getFavoritos();
  const isFav = favs.includes(noticia.id);

  const card = document.getElementById("destaqueCard");
  if (!card || !noticia) return;

  card.querySelector(".feed-destaque-img img").src = noticia.img;
  card.querySelector(".feed-destaque-img img").alt = noticia.titulo;
  card.querySelector(".feed-destaque-img img").onerror = function () {
    this.style.opacity = "0";
  };

  const tags = card.querySelector(".feed-destaque-tags");
  tags.innerHTML = `
    <span class="feed-tag">${noticia.categoria}</span>
    <span class="feed-tag feed-tag--autor">${noticia.autor}</span>`;

  card.querySelector(".feed-destaque-title").textContent = noticia.titulo;
  card.querySelector(".feed-destaque-desc").textContent = noticia.desc;

  // stats
  const meta = card.querySelector(".feed-destaque-meta");
  meta.querySelectorAll(".feed-stat")[0].innerHTML =
    `${SVG_COMMENT}${noticia.comentarios}`;
  meta.querySelectorAll(".feed-stat")[1].innerHTML =
    `${SVG_STAR}${noticia.favoritos}`;

  // botão ler notícia
  const btn = card.querySelector(".feed-destaque-btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    abrirNoticia(noticia);
  });

  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    if (e.target.closest(".feed-destaque-btn")) return;
    abrirNoticia(noticia);
  });
}

// ── Preencher grid ─────────────────────────────────────────────────────────
function renderGrid(containerId, lista) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = "";
  lista.forEach((n) => grid.appendChild(criarCard(n)));
}

function exibirErroCarregamento() {
  const grid = document.getElementById("feedGrid");
  if (grid) {
    grid.innerHTML =
      '<p class="feed-erro">Não foi possível carregar as notícias. Verifique se o servidor da API está rodando em http://localhost:3000.</p>';
  }
}

// ── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  if (!CJAuth.estaLogado()) return; // redirecionamento já disparado no index.html

  try {
    NOTICIAS = await CJNoticiasApi.listar({ prefixoImagem: "./src/" });
  } catch (erro) {
    console.error(erro);
    exibirErroCarregamento();
    return;
  }

  if (NOTICIAS.length === 0) {
    exibirErroCarregamento();
    return;
  }

  // Destaque: a notícia com mais favoritos (não há mais flag "destaque" fixa)
  const destaque = [...NOTICIAS].sort((a, b) => b.favoritos - a.favoritos)[0];
  renderDestaque(destaque);

  // Recentes: 8 primeiras excluindo o destaque
  const recentes = NOTICIAS.filter((n) => n.id !== destaque.id).slice(0, 8);
  renderGrid("feedGrid", recentes);

  // Mais lidas: top 4 por favoritos (excluindo destaque e recentes)
  const usados = new Set([destaque.id, ...recentes.map((n) => n.id)]);
  const maisLidas = [...NOTICIAS]
    .filter((n) => !usados.has(n.id))
    .sort((a, b) => b.favoritos - a.favoritos)
    .slice(0, 4);

  const maisLidasFinal =
    maisLidas.length >= 4
      ? maisLidas
      : [...NOTICIAS].sort((a, b) => b.favoritos - a.favoritos).slice(0, 4);

  renderGrid("maisLidasGrid", maisLidasFinal);

  // Usuário logado
  const usuario = CJAuth.getUsuario();
  if (usuario) {
    const usernameEl = document.querySelector(".feed-nav-username");
    const avatarEl = document.getElementById("navAvatar");
    if (usernameEl) usernameEl.textContent = usuario.nome || "Usuário";
    if (avatarEl)
      avatarEl.innerHTML = `<span>${(usuario.nome || "U")[0].toUpperCase()}</span>`;
  }

  // Busca básica (filtra cards visíveis por título)
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll(".feed-card").forEach((card) => {
        const titulo =
          card.querySelector(".feed-card-title")?.textContent.toLowerCase() ||
          "";
        card.style.display = !q || titulo.includes(q) ? "" : "none";
      });
    });
  }
});
