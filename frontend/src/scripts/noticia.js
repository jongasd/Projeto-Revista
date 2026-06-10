/* ═══════════════════════════════════════════════════════
   noticia.js — lógica da página de leitura de matéria
   Conecta Jovem — src/scripts/noticia.js
═══════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────
// CATÁLOGO DE NOTÍCIAS
// Estrutura espelhada com as páginas de categoria.
// Quando o backend estiver pronto, este objeto é
// substituído por uma chamada à API — o restante do
// código não muda.
// ─────────────────────────────────────────────────────
const CATALOGO = {
  educacao: {
    label: "Educação",
    href: "educacao.html",
    itens: [
      {
        id: "edu-01",
        titulo: "Carta de Reclamação",
        autor: "Lais de Souza Vaz",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo: "../../documents/educacao/laiz_vaz_carta_pessoal_educacao.pdf",
      },
      {
        id: "edu-02",
        titulo: "MANIFESTO PELA EDUCAÇÃO INCLUSIVA",
        autor: "Letícia Parentella Sanduchi",
        data: "11 Mai 2026",
        tempLeitura: 3,
        arquivo:
          "../../documents/educacao/leticia_parentella-sanduchi_manifesto_educacao.pdf",
      },
      {
        id: "edu-03",
        titulo: "Depoimento",
        autor: "Maria Júlia Garnham Ferreira",
        data: "11 Mai 2026",
        tempLeitura: 5,
        arquivo:
          "../../documents/educacao/Maria_Julia_Garnham_Ferreira_Depoimento_Educação.pdf",
      },
      {
        id: "edu-04",
        titulo: "Discurso",
        autor: "Sofia Marcolongo dos Santos",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/educacao/sofia_marcolongo_dos_santos_discurso_educacao.pdf",
      },
    ],
  },
  politica: {
    label: "Política",
    href: "politica.html",
    itens: [
      {
        id: "pol-01",
        titulo: "Discurso Soberania Nacional",
        autor: "Emanuely Macedo Padovan",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/politica/Emanuely_Macedo_Padovan_Discurso_SoberaniaNacional.pdf",
      },
      {
        id: "pol-02",
        titulo: "Carta Aberta Soberania Nacional",
        autor: "Livia Hermano",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/politica/Livia_Hermano_Carta_Aberta_SoberaniaNacional.pdf",
      },
      {
        id: "pol-03",
        titulo: "Depoimento Soberania Nacional",
        autor: "Yasmin Vitória do Nascimento Ramos",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/politica/Yasmin_Vitoria_do_Nascimento_Ramos_Depoimento_SoberaniaNacional.pdf",
      },
    ], // adicione as notícias da categoria aqui
  },
  tecnologia: {
    label: "Tecnologia",
    href: "tecnologia.html",
    itens: [
      {
        id: "tec-01",
        titulo:
          "MANIFESTO DO COLETIVO DE ARTISTAS VISUAIS PARA AS PLATAFORMAS DIGITAIS",
        autor: "Anthero Franco Sprana",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/tecnologia/Anthero_Franco_Sprana_Manifesto_Ia_e_Etica_Digital.pdf",
      },
      {
        id: "tec-02",
        titulo: "Discurso - Cybercrime",
        autor: "Enzo Thomaz de Jesus",
        data: "11 Mai 2026",
        tempLeitura: 3,
        arquivo:
          "../../documents/tecnologia/Enzo_Thomaz_de_Jesus_Discurso_Cybercrime.pdf",
      },
      {
        id: "tec-03",
        titulo: "Carta aberta aos desenvolvedores do ChatGPT",
        autor: "Pietro Guedes de Oliveira",
        data: "11 Mai 2026",
        tempLeitura: 5,
        arquivo:
          "../../documents/tecnologia/Pietro_Guedes_de_Oliveira_CartaAberta_IAeEticaDigital.pdf",
      },
      {
        id: "tec-04",
        titulo: "Depoimento",
        autor: "Thiago Tavares de Melo",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/tecnologia/Thiago_Tavares_de_Melo_Depoimento_Cybercrime.pdf",
      },
    ],
  },
  saude: {
    label: "Saúde",
    href: "saude.html",
    itens: [
      {
        id: "sau-01",
        titulo: "Carta de Reclamação",
        autor: "Ana Júlia Ribeiro Ferreira",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/saude/Ana_Júlia _Ribeiro_Ferreira-_Carta_de_Reclamação.pdf",
      },
      {
        id: "sau-02",
        titulo: "Discurso",
        autor: "Ana Júlia Correa",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/saude/Ana_Julia_Correa_discurso_saude-mental.pdf",
      },
      {
        id: "sau-03",
        titulo: "Carta de Editorial",
        autor: "Ana Katy Romão Vasconcellos",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/saude/Ana_Katy_Romão_Vasconcellos_Editorial_Saúde_Mental.pdf",
      },
    ],
  },
  economia: {
    label: "Economia",
    href: "economia.html",
    itens: [
      {
        id: "eco-01",
        titulo: "Carta ao conselho universitário",
        autor: "Gabriela Domingues de Oliveira",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/economia/Gabriela_Oliveira_cartaPessoal_economia.pdf",
      },
      {
        id: "eco-02",
        titulo: "Manifesto pelo fim dos cortes na educação ",
        autor: "Maria Eduarda Bertoli",
        data: "11 Mai 2026",
        tempLeitura: 3,
        arquivo:
          "../../documents/economia/Maria_Eduarda_Bertolli_Da_Silva_Manifesto_Economia.pdf",
      },
      {
        id: "eco-03",
        titulo: "Depoimento",
        autor: "Milena Hoppe Sales",
        data: "11 Mai 2026",
        tempLeitura: 5,
        arquivo:
          "../../documents/economia/Milena_Hoppe_Sales_depoimentoPessoal_economia.pdf",
      },
      {
        id: "eco-04",
        titulo: "Discurso",
        autor: "Nicoly Valaitis de Oliveira",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/economia/Nicoly_Valaitis-discurso-economia.pdf",
      },
    ],
  },
  mundotrabalho: {
    label: "Mundo do Trabalho",
    href: "mundoTrabalho.html",
    itens: [
      {
        id: "mun-01",
        titulo: "Manifesto dos trabalhadores contra a escala 6x1",
        autor: "Heitor Barbosa dos Santos",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/mundodotrabalho/Heitor_Barbosa_dos_Santos_Manifesto_MercadoDeTrabalho.pdf",
      },
      {
        id: "mun-02",
        titulo: "Depoimento",
        autor: "João Marcos Ferreira Benevides",
        data: "11 Mai 2026",
        tempLeitura: 3,
        arquivo:
          "../../documents/mundodotrabalho/Joao_Marcos_Depoimento_MercadoTrabalho.pdf",
      },
      {
        id: "mun-03",
        titulo: "Carta Pessoal",
        autor: "Mateus Lopes Ferreira",
        data: "11 Mai 2026",
        tempLeitura: 5,
        arquivo:
          "../../documents/mundodotrabalho/mateus_lopes_ferreira_carta_escala6X1.pdf",
      },
      {
        id: "mun-04",
        titulo:
          "A redução da jornada de trabalho: o passo ao mercado de trabalho mais humano",
        autor: "Vinícius Assunção Santos",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/mundodotrabalho/Vinícius_Assunção_Santos_Editorial_MarcadoDeTrabalho.pdf",
      },
    ],
  },
  violencia: {
    label: "Violência",
    href: "violencia.html",
    itens: [
      {
        id: "vio-01",
        titulo: "Depoimento",
        autor: "Anna Viktoria Alacamini de Carvalho",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/violencia/Anna_Viktoria_Alacamini_de_Carvalho_depoimento_violência.pdf",
      },
      {
        id: "vio-02",
        titulo: "CARTA ABERTA À SECRETARIA DE SEGURANÇA PÚBLICA",
        autor: "Elisa Dias Sérgio",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/violencia/Elisa_Dias_Sergio_CartaDenúncia_OperaçõesPolicias.pdf",
      },
      {
        id: "vio-03",
        titulo: "A URBANIZAÇÃO SOCIAL GEROU AS FAVELAS?",
        autor: "Gabriela Carnevali Gonçalves Lima",
        data: "11 Mai 2026",
        tempLeitura: 4,
        arquivo:
          "../../documents/violencia/Gabriela_Carnevali_Gonçalves_Lima_TextoDeApresentação_Violência.pdf",
      },
    ],
  },
};
// ── Estado PDF.js ──
const PDFJS_CDN = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.269";
let pdfDoc = null;
let paginaAtual = 1;
let totalPag = 0;
let renderTask = null;

// ─────────────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoriaKey = params.get("categoria") || "";
  const noticiaId = params.get("id") || "";

  const categoria = CATALOGO[categoriaKey];

  if (!categoria) {
    mostrarErro("Categoria não encontrada.");
    return;
  }

  const noticia = categoria.itens.find((n) => n.id === noticiaId);

  if (!noticia) {
    mostrarErro("Matéria não encontrada.");
    return;
  }

  renderizarPagina(noticia, categoria);
  carregarRelacionadas(noticia, categoria);
  iniciarFavoritar(noticia.id);
});

// ─────────────────────────────────────────────────────
// RENDERIZAR CONTEÚDO DA PÁGINA
// ─────────────────────────────────────────────────────
function renderizarPagina(noticia, categoria) {
  // Título da aba
  document.title = `${noticia.titulo} — Conecta Jovem`;

  // Breadcrumb
  const breadcrumbCat = document.getElementById("breadcrumbCat");
  if (breadcrumbCat) breadcrumbCat.textContent = categoria.label;

  // Tags
  const tagCat = document.getElementById("tagCategoria");
  if (tagCat) tagCat.textContent = categoria.label;

  const tagAutor = document.getElementById("tagAutor");
  if (tagAutor) tagAutor.textContent = noticia.autor;

  // Título
  const titulo = document.getElementById("noticaTitulo");
  if (titulo) titulo.textContent = noticia.titulo;

  // Metadados
  const metaDataTxt = document.getElementById("metaDataTxt");
  if (metaDataTxt) metaDataTxt.textContent = noticia.data;

  const metaTempoTxt = document.getElementById("metaTempoTxt");
  if (metaTempoTxt)
    metaTempoTxt.textContent = `${noticia.tempLeitura} min de leitura`;

  // Download
  const btnDownload = document.getElementById("btnDownload");
  if (btnDownload) btnDownload.setAttribute("href", noticia.arquivo);

  // Fallback download
  const fallbackDl = document.getElementById("fallbackDownload");
  if (fallbackDl) fallbackDl.setAttribute("href", noticia.arquivo);

  // Atualiza destaque da aba de categoria
  sincronizarAbaAtiva(categoria.href);

  // Carrega o PDF no iframe
  iniciarViewer(noticia.arquivo);
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

function exibirFallback(frame, fallback) {
  if (frame) frame.style.display = "none";
  if (fallback) fallback.style.display = "flex";
}

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
function carregarRelacionadas(noticiaAtual, categoria) {
  const grid = document.getElementById("relacionadasGrid");
  const secao = document.getElementById("secaoRelacionadas");
  if (!grid || !secao) return;

  const relacionadas = categoria.itens
    .filter((n) => n.id !== noticiaAtual.id)
    .slice(0, 3);

  if (relacionadas.length === 0) {
    secao.style.display = "none";
    return;
  }

  relacionadas.forEach((n) => {
    const card = criarCardRelacionado(n, categoria);
    grid.appendChild(card);
  });
}

function criarCardRelacionado(noticia, categoria) {
  const params = new URLSearchParams({
    categoria: Object.keys(CATALOGO).find(
      (k) => CATALOGO[k].label === categoria.label,
    ),
    id: noticia.id,
  });

  const article = document.createElement("article");
  article.className = "feed-card cat-card";
  article.setAttribute("role", "button");
  article.setAttribute("tabindex", "0");

  article.innerHTML = `
    <div class="feed-card-img">
      <img src="#" alt="${noticia.titulo}" />
      <button class="feed-card-star" aria-label="Favoritar">☆</button>
    </div>
    <div class="feed-card-body">
      <h3 class="feed-card-title cat-card-title">${noticia.titulo}</h3>
      <div class="feed-card-footer">
        <div class="feed-card-tags">
          <span class="feed-tag">${noticia.autor}</span>
          <span class="feed-tag">${categoria.label}</span>
        </div>
        <div class="feed-card-stats">
          <span class="feed-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            ${noticia.tempLeitura}min
          </span>
        </div>
      </div>
    </div>
  `;

  // Navegação ao clicar no card
  const url = `noticia.html?${params.toString()}`;
  article.addEventListener("click", () => (window.location.href = url));
  article.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") window.location.href = url;
  });

  // Estrela do card relacionado (reutiliza lógica de favoritar)
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
