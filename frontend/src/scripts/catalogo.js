/* ═══════════════════════════════════════════════════════
   catalogo.js — renderiza o grid de uma página de categoria
   (economia.html, tecnologia.html, etc.) a partir da API.

   Cada página de categoria deve definir, ANTES de incluir este
   script:
     <script>const CJ_CATEGORIA_ATUAL = "Economia";</script>
   (o valor precisa bater exatamente com noticia.genero no banco)
═══════════════════════════════════════════════════════ */

function cjCriarCardCategoria(noticia) {
  const favs = JSON.parse(localStorage.getItem("cj_favoritos") || "[]");
  const isFav = favs.includes(noticia.id);

  const article = document.createElement("article");
  article.className = "feed-card cat-card";
  article.addEventListener("click", () => {
    window.location.href = `noticia.html?id=${noticia.id}`;
  });

  article.innerHTML = `
    <div class="feed-card-img">
      <img src="${noticia.img}" alt="Notícia" onerror="this.style.opacity='0'" />
      <button class="feed-card-star ${isFav ? "feed-card-star--active" : ""}" aria-label="Favoritar">${isFav ? "★" : "☆"}</button>
    </div>
    <div class="feed-card-body">
      <h3 class="feed-card-title cat-card-title">${noticia.titulo}</h3>
      <div class="feed-card-footer">
        <div class="feed-card-tags">
          <span class="feed-tag">${noticia.autor}</span>
          <span class="feed-tag">${noticia.categoria}</span>
        </div>
        <div class="feed-card-stats">
          <span class="feed-stat">${SVG_COMMENT_CAT}${noticia.comentarios}</span>
          <span class="feed-stat">${SVG_STAR_CAT}${noticia.favoritos}</span>
        </div>
      </div>
    </div>`;

  article.querySelector(".feed-card-star").addEventListener("click", (e) => {
    e.stopPropagation();
    const idx = favs.indexOf(noticia.id);
    if (idx === -1) favs.push(noticia.id);
    else favs.splice(idx, 1);
    localStorage.setItem("cj_favoritos", JSON.stringify(favs));
    e.currentTarget.classList.toggle("feed-card-star--active");
    e.currentTarget.textContent = idx === -1 ? "★" : "☆";
  });

  return article;
}

const SVG_COMMENT_CAT = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>`;

const SVG_STAR_CAT = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02
                   12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
</svg>`;

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.querySelector(".cat-grid");
  if (!grid || typeof CJ_CATEGORIA_ATUAL === "undefined") return;

  grid.innerHTML = '<p class="feed-carregando">Carregando notícias…</p>';

  let noticias;
  try {
    noticias = await CJNoticiasApi.listar({
      genero: CJ_CATEGORIA_ATUAL,
      prefixoImagem: "../../",
    });
  } catch (erro) {
    grid.innerHTML =
      '<p class="feed-erro">Não foi possível carregar as notícias. Verifique se o servidor da API está rodando.</p>';
    return;
  }

  grid.innerHTML = "";

  if (noticias.length === 0) {
    grid.innerHTML = "<p>Ainda não há notícias publicadas nesta categoria.</p>";
    return;
  }

  noticias.forEach((n) => grid.appendChild(cjCriarCardCategoria(n)));

  // Usuário logado no navbar
  const usuario = CJAuth.getUsuario();
  if (usuario) {
    const usernameEl = document.querySelector(".feed-nav-username");
    const avatarEl = document.getElementById("navAvatar");
    if (usernameEl) usernameEl.textContent = usuario.nome || "Usuário";
    if (avatarEl)
      avatarEl.innerHTML = `<span>${(usuario.nome || "U")[0].toUpperCase()}</span>`;
  }
});
