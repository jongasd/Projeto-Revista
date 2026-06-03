// ── Favoritar / desfavoritar ──
document.querySelectorAll(".feed-card-star").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = btn.classList.toggle("feed-card-star--active");
    btn.textContent = isActive ? "★" : "☆";
  });
});

// ── Filtro por categoria ──
document.querySelectorAll(".feed-cat").forEach((tab) => {
  tab.addEventListener("click", (e) => {
    if (tab.getAttribute("href") === "#") e.preventDefault();
    document
      .querySelectorAll(".feed-cat")
      .forEach((t) => t.classList.remove("feed-cat--active"));
    tab.classList.add("feed-cat--active");
  });
});
function abrirNoticia(id) {
  window.location.href = `noticia.html?categoria=saude&id=${id}`;
}
