// ═══════════════════════════════════════════════
//  MENU HAMBURGUER — cole no script de cada página
//  (ou num arquivo hamburguer.js e importe em todas)
// ═══════════════════════════════════════════════

(function () {
  const btnOpen = document.querySelector(".feed-nav-hamburger");
  const drawer = document.getElementById("hbgDrawer");
  const overlay = document.getElementById("hbgOverlay");
  const btnClose = document.getElementById("hbgClose");
  const btnLogout = document.getElementById("hbgLogout");

  if (!btnOpen || !drawer) return; // página sem menu, sai sem erros

  // ── Abrir ──
  function abrirMenu() {
    drawer.classList.add("hbg-drawer--open");
    overlay.classList.add("hbg-overlay--visible");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // trava scroll da página
  }

  // ── Fechar ──
  function fecharMenu() {
    drawer.classList.remove("hbg-drawer--open");
    overlay.classList.remove("hbg-overlay--visible");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  btnOpen.addEventListener("click", abrirMenu);
  btnClose.addEventListener("click", fecharMenu);
  overlay.addEventListener("click", fecharMenu);

  // Fecha com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharMenu();
  });

  // ── Sair da conta ──
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      fecharMenu();
      // TODO: limpar sessão/localStorage e redirecionar para o login
      localStorage.clear();
      window.location.href = "./src/pages/login.html";
    });
  }
})();
