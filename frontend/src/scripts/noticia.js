// ═══════════════════════════════════════════
//  CONECTA JOVEM — noticia.js (página de leitura)
//  Busca a notícia pela API (GET /noticias/:id) em vez de um
//  catálogo fixo no código.
// ═══════════════════════════════════════════

// Mapeia o gênero (como salvo no banco) para o link da aba/categoria no menu
const HREF_POR_GENERO = {
  "Educação": "educacao.html",
  "Política": "politica.html",
  "Tecnologia": "tecnologia.html",
  "Saúde": "saude.html",
  "Economia": "economia.html",
  "Mundo do Trabalho": "mundoTrabalho.html",
  "Violência": "violencia.html",
};

// ── Estado PDF.js ──
const PDFJS_CDN = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.269";
let pdfDoc = null;
let paginaAtual = 1;
let totalPag = 0;
let renderTask = null;

function calcularTempoLeitura(conteudo) {
  const palavras = (conteudo || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}

function formatarData(isoString) {
  if (!isoString) return "";
  try {
    return new Date(isoString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}

// ─────────────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const noticiaId = params.get("id");

  if (!noticiaId) {
    mostrarErro("Matéria não encontrada.");
    return;
  }

  let noticia;
  try {
    noticia = await CJNoticiasApi.buscarPorId(noticiaId, {
      prefixoImagem: "../../",
    });
  } catch (erro) {
    console.error(erro);
    mostrarErro("Não foi possível carregar esta matéria.");
    return;
  }

  renderizarPagina(noticia);
  carregarRelacionadas(noticia);
  iniciarFavoritar(noticia.id);
});

// ─────────────────────────────────────────────────────
// RENDERIZAR CONTEÚDO DA PÁGINA
// ─────────────────────────────────────────────────────
function renderizarPagina(noticia) {
  document.title = `${noticia.titulo} — Conecta Jovem`;

  const breadcrumbCat = document.getElementById("breadcrumbCat");
  if (breadcrumbCat) breadcrumbCat.textContent = noticia.categoria;

  const tagCat = document.getElementById("tagCategoria");
  if (tagCat) tagCat.textContent = noticia.categoria;

  const tagAutor = document.getElementById("tagAutor");
  if (tagAutor) tagAutor.textContent = noticia.autor;

  const titulo = document.getElementById("noticaTitulo");
  if (titulo) titulo.textContent = noticia.titulo;

  const metaDataTxt = document.getElementById("metaDataTxt");
  if (metaDataTxt) metaDataTxt.textContent = formatarData(noticia.data);

  const metaTempoTxt = document.getElementById("metaTempoTxt");
  if (metaTempoTxt)
    metaTempoTxt.textContent = `${calcularTempoLeitura(noticia.conteudo)} min de leitura`;

  const arquivoPdf = noticia.arquivo_pdf
    ? `../../documents/${noticia.arquivo_pdf}`
    : null;

  const btnDownload = document.getElementById("btnDownload");
  if (btnDownload) {
    if (arquivoPdf) btnDownload.setAttribute("href", arquivoPdf);
    else btnDownload.style.display = "none";
  }

  const fallbackDl = document.getElementById("fallbackDownload");
  if (fallbackDl && arquivoPdf) fallbackDl.setAttribute("href", arquivoPdf);

  sincronizarAbaAtiva(HREF_POR_GENERO[noticia.categoria]);

  if (arquivoPdf) {
    iniciarViewer(arquivoPdf);
  } else {
    // Notícia sem PDF de origem — mostra o texto extraído direto.
    exibirConteudoTexto(noticia.conteudo);
  }
}

function exibirConteudoTexto(conteudo) {
  const viewerWrap = document.getElementById("pdfViewerWrap");
  const fallback = document.getElementById("pdfFallback");
  if (fallback) {
    fallback.style.display = "flex";
    const texto = document.createElement("pre");
    texto.style.whiteSpace = "pre-wrap";
    texto.style.textAlign = "left";
    texto.style.maxWidth = "700px";
    texto.style.margin = "0 auto";
    texto.style.fontFamily = "inherit";
    texto.textContent = conteudo;
    fallback.appendChild(texto);
  }
  if (viewerWrap) viewerWrap.style.display = "none";
}

// ─────────────────────────────────────────────────────
// CARREGAR PDF
// ─────────────────────────────────────────────────────
async function iniciarViewer(arquivo) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/build/pdf.worker.min.mjs`;

  mostrarLoader(true);
  try {
    pdfDoc = await pdfjsLib.getDocument(arquivo).promise;
    totalPag = pdfDoc.numPages;
    document.getElementById("paginaAtual").textContent = "1";
    document.getElementById("paginaTotal").textContent = totalPag;
    await renderizarCanvas(1);
    mostrarLoader(false);
    document.getElementById("pdfViewerWrap").style.display = "flex";
    atualizarBotoes();
  } catch (err) {
    console.error("PDF.js:", err);
    mostrarLoader(false);
    document.getElementById("pdfFallback").style.display = "flex";
  }
}

async function renderizarCanvas(num) {
  if (renderTask) {
    renderTask.cancel();
    renderTask = null;
  }
  const page = await pdfDoc.getPage(num);
  const canvas = document.getElementById("pdfCanvas");
  const largura = document.getElementById("pdfViewer").clientWidth || 800;
  const escala = Math.min(largura / page.getViewport({ scale: 1 }).width, 2.0);
  const vp = page.getViewport({ scale: escala });
  canvas.width = vp.width;
  canvas.height = vp.height;
  renderTask = page.render({
    canvasContext: canvas.getContext("2d"),
    viewport: vp,
  });
  try {
    await renderTask.promise;
  } catch (e) {
    if (e?.name !== "RenderingCancelledException") throw e;
  }
  renderTask = null;
}

async function irParaPagina(delta) {
  const nova = paginaAtual + delta;
  if (nova < 1 || nova > totalPag) return;
  paginaAtual = nova;
  document.getElementById("paginaAtual").textContent = paginaAtual;
  atualizarBotoes();
  mostrarLoader(true);
  await renderizarCanvas(paginaAtual);
  mostrarLoader(false);
  document
    .getElementById("pdfViewer")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function atualizarBotoes() {
  document.getElementById("btnAnterior").disabled = paginaAtual <= 1;
  document.getElementById("btnProxima").disabled = paginaAtual >= totalPag;
}

function mostrarLoader(s) {
  document.getElementById("pdfLoader").style.display = s ? "flex" : "none";
}

window.paginaAnterior = () => irParaPagina(-1);
window.proximaPagina = () => irParaPagina(+1);

// ─────────────────────────────────────────────────────
// FAVORITAR
// Usa localStorage para persistir entre páginas.
// ─────────────────────────────────────────────────────
function iniciarFavoritar(id) {
  const btn = document.getElementById("btnFavoritar");
  if (!btn) return;

  const chave = `favorito_${id}`;
  let favoritado = localStorage.getItem(chave) === "true";

  atualizarBotaoFavoritar(btn, favoritado);

  btn.addEventListener("click", () => {
    favoritado = !favoritado;
    localStorage.setItem(chave, favoritado);
    atualizarBotaoFavoritar(btn, favoritado);
  });
}

function atualizarBotaoFavoritar(btn, ativo) {
  const span = btn.querySelector("span");

  if (ativo) {
    btn.classList.add("noticia-action-btn--favoritado");
    if (span) span.textContent = "Favoritado";
  } else {
    btn.classList.remove("noticia-action-btn--favoritado");
    if (span) span.textContent = "Favoritar";
  }
}

// ─────────────────────────────────────────────────────
// CARDS RELACIONADOS
// Mostra até 3 outras matérias da mesma categoria.
// ─────────────────────────────────────────────────────
async function carregarRelacionadas(noticiaAtual) {
  const grid = document.getElementById("relacionadasGrid");
  const secao = document.getElementById("secaoRelacionadas");
  if (!grid || !secao) return;

  let todasDaCategoria;
  try {
    todasDaCategoria = await CJNoticiasApi.listar({
      genero: noticiaAtual.categoria,
      prefixoImagem: "../../",
    });
  } catch {
    secao.style.display = "none";
    return;
  }

  const relacionadas = todasDaCategoria
    .filter((n) => n.id !== noticiaAtual.id)
    .slice(0, 3);

  if (relacionadas.length === 0) {
    secao.style.display = "none";
    return;
  }

  relacionadas.forEach((n) => grid.appendChild(criarCardRelacionado(n)));
}

function criarCardRelacionado(noticia) {
  const url = `noticia.html?id=${noticia.id}`;

  const article = document.createElement("article");
  article.className = "feed-card cat-card";
  article.setAttribute("role", "button");
  article.setAttribute("tabindex", "0");

  article.innerHTML = `
    <div class="feed-card-img">
      <img src="${noticia.img}" alt="${noticia.titulo}" onerror="this.style.opacity='0'" />
      <button class="feed-card-star" aria-label="Favoritar">☆</button>
    </div>
    <div class="feed-card-body">
      <h3 class="feed-card-title cat-card-title">${noticia.titulo}</h3>
      <div class="feed-card-footer">
        <div class="feed-card-tags">
          <span class="feed-tag">${noticia.autor}</span>
          <span class="feed-tag">${noticia.categoria}</span>
        </div>
        <div class="feed-card-stats">
          <span class="feed-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            ${calcularTempoLeitura(noticia.conteudo)}min
          </span>
        </div>
      </div>
    </div>
  `;

  article.addEventListener("click", () => (window.location.href = url));
  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") window.location.href = url;
  });

  const starBtn = article.querySelector(".feed-card-star");
  const chave = `favorito_${noticia.id}`;
  if (localStorage.getItem(chave) === "true") {
    starBtn.textContent = "★";
    starBtn.classList.add("feed-card-star--active");
  }

  starBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const ativo = localStorage.getItem(chave) === "true";
    localStorage.setItem(chave, !ativo);
    starBtn.textContent = !ativo ? "★" : "☆";
    starBtn.classList.toggle("feed-card-star--active", !ativo);
  });

  return article;
}

// ─────────────────────────────────────────────────────
// SINCRONIZAR ABA ATIVA NO MENU DE CATEGORIAS
// ─────────────────────────────────────────────────────
function sincronizarAbaAtiva(hrefCategoria) {
  document.querySelectorAll(".feed-cat").forEach((link) => {
    const ativo = link.getAttribute("href") === hrefCategoria;
    link.classList.toggle("feed-cat--active", ativo);
  });
}

// ─────────────────────────────────────────────────────
// ESTADO DE ERRO
// ─────────────────────────────────────────────────────
function mostrarErro(mensagem) {
  const layout = document.querySelector(".noticia-layout");
  if (!layout) return;

  layout.innerHTML = `
    <div style="
      text-align: center;
      padding: 80px 24px;
      font-family: 'Montserrat', sans-serif;
      color: #888;
    ">
      <p style="font-size: 15px; font-weight: 600; margin-bottom: 16px;">
        ${mensagem}
      </p>
      <a href="javascript:history.back()"
        style="color: #1746a2; font-weight: 700; font-size: 13px;">
        ← Voltar
      </a>
    </div>
  `;
}
