// ── Favoritar / desfavoritar ──
document.querySelectorAll(".feed-card-star").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.classList.toggle("feed-card-star--active");
  });
});

// ── Curtir / descurtir comentários ──
document.querySelectorAll(".feed-comment-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("feed-comment-btn--active");
  });
});

// ── Filtro por categoria ──
document.querySelectorAll(".feed-cat").forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelectorAll(".feed-cat")
      .forEach((t) => t.classList.remove("feed-cat--active"));
    tab.classList.add("feed-cat--active");
  });
});
