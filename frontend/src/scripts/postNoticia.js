// ══════════════════════════════════════════
//  criar-noticia.js
// ══════════════════════════════════════════

const editor = document.getElementById("editorContent");
const wordCountEl = document.getElementById("wordCount");
const lineCountEl = document.getElementById("lineCount");
const charCountEl = document.getElementById("charCount");

// ── 1. CONTAGEM EM TEMPO REAL ─────────────

function atualizarContagem() {
  const text = editor.innerText || "";

  // Caracteres (sem quebras de linha artificiais do contenteditable)
  const chars = text.replace(/\n$/, "").length;
  charCountEl.textContent = chars;

  // Palavras
  const words =
    text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
  wordCountEl.textContent = words;

  // Linhas: conta blocos visíveis (p, div, br, li) dentro do editor
  const lines = editor.querySelectorAll("p, div, li, h1, h2, h3, h4, h5, h6");
  const lineCount =
    lines.length > 0
      ? [...lines].filter((el) => el.innerText.trim() !== "").length
      : text.split("\n").filter((l) => l.trim() !== "").length;
  lineCountEl.textContent = Math.max(lineCount, text.trim() === "" ? 0 : 1);
}

editor.addEventListener("input", atualizarContagem);
editor.addEventListener("keyup", atualizarContagem);

// ── 2. PLACEHOLDER ───────────────────────

editor.addEventListener("focus", () => {
  if (editor.innerHTML.trim() === "") editor.innerHTML = "";
});

editor.addEventListener("blur", () => {
  if (editor.innerHTML.trim() === "") editor.innerHTML = "";
});

// ── 3. BARRA DE FERRAMENTAS ──────────────

// Botões de comando simples
document.querySelectorAll(".editor-tool-btn[data-cmd]").forEach((btn) => {
  btn.addEventListener("mousedown", (e) => {
    e.preventDefault(); // Evita perder o foco do editor
    const cmd = btn.dataset.cmd;
    document.execCommand(cmd, false, null);
    editor.focus();
    atualizarBotoesAtivos();
  });
});

// Tamanho da fonte
document.getElementById("fontSize").addEventListener("change", function () {
  document.execCommand("fontSize", false, this.value);
  editor.focus();
});

// Cor do texto
document.getElementById("textColor").addEventListener("input", function () {
  document.execCommand("foreColor", false, this.value);
  editor.focus();
});

// Destaca botões ativos conforme seleção atual
function atualizarBotoesAtivos() {
  [
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "justifyFull",
    "insertUnorderedList",
    "insertOrderedList",
  ].forEach((cmd) => {
    const btn = document.querySelector(`.editor-tool-btn[data-cmd="${cmd}"]`);
    if (btn) {
      btn.classList.toggle(
        "editor-tool-btn--active",
        document.queryCommandState(cmd),
      );
    }
  });
}

editor.addEventListener("keyup", atualizarBotoesAtivos);
editor.addEventListener("mouseup", atualizarBotoesAtivos);
editor.addEventListener("selectionchange", atualizarBotoesAtivos);

// ── 4. ATALHOS DE TECLADO ─────────────────

editor.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key.toLowerCase()) {
      case "b":
        e.preventDefault();
        document.execCommand("bold");
        break;
      case "i":
        e.preventDefault();
        document.execCommand("italic");
        break;
      case "u":
        e.preventDefault();
        document.execCommand("underline");
        break;
    }
  }
});

// ── 5. CONTADOR DE TÍTULO ─────────────────

const tituloInput = document.getElementById("noticiaTitulo");
const tituloCount = document.getElementById("tituloCount");

tituloInput.addEventListener("input", () => {
  tituloCount.textContent = `${tituloInput.value.length}/120`;
  sincronizarPreview();
});

// ── 6. IMAGEM DE CAPA ─────────────────────

const imagemInput = document.getElementById("noticiaImagem");
const imagemNome = document.getElementById("imagemNome");
const coverPreview = document.getElementById("coverPreview");
const coverImg = document.getElementById("coverImg");
const coverRemove = document.getElementById("coverRemove");
const previewCoverImg = document.getElementById("previewCoverImg");
const previewCoverPlaceholder = document.getElementById(
  "previewCoverPlaceholder",
);

imagemInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  imagemNome.textContent = file.name;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const src = ev.target.result;

    // Preview no formulário
    coverImg.src = src;
    coverPreview.style.display = "block";

    // Preview no card
    previewCoverImg.src = src;
    previewCoverImg.style.display = "block";
    previewCoverPlaceholder.style.display = "none";
  };
  reader.readAsDataURL(file);
});

coverRemove.addEventListener("click", () => {
  imagemInput.value = "";
  imagemNome.textContent = "Escolher imagem...";
  coverImg.src = "#";
  coverPreview.style.display = "none";

  previewCoverImg.src = "#";
  previewCoverImg.style.display = "none";
  previewCoverPlaceholder.style.display = "flex";
});

// ── 7. SINCRONIZAÇÃO COM PRÉ-VISUALIZAÇÃO ─

const previewTitulo = document.getElementById("previewTitulo");
const previewTexto = document.getElementById("previewTexto");
const previewCategoria = document.getElementById("previewCategoria");
const categoriaSelect = document.getElementById("noticiaCategoria");

function sincronizarPreview() {
  // Título
  const titulo = tituloInput.value.trim();
  previewTitulo.textContent = titulo || "Título da notícia";

  // Categoria
  const cat = categoriaSelect.value;
  if (cat) {
    previewCategoria.textContent = cat;
    previewCategoria.style.display = "inline-block";
  } else {
    previewCategoria.style.display = "none";
  }

  // Texto
  const html = editor.innerHTML.trim();
  if (html && html !== "") {
    previewTexto.innerHTML = html;
  } else {
    previewTexto.innerHTML = `<p style="color:#aaa;font-style:italic">O conteúdo da notícia aparecerá aqui...</p>`;
  }
}

editor.addEventListener("input", sincronizarPreview);
categoriaSelect.addEventListener("change", sincronizarPreview);

// ── 8. BOTÃO PRÉ-VISUALIZAR ──────────────

const previewPanel = document.getElementById("editorPreview");
const btnPreview = document.getElementById("btnPreview");
const btnClosePreview = document.getElementById("btnClosePreview");

btnPreview.addEventListener("click", () => {
  sincronizarPreview();
  previewPanel.classList.add("editor-right--visible");
});

btnClosePreview.addEventListener("click", () => {
  previewPanel.classList.remove("editor-right--visible");
});

// ── 9. BOTÃO PUBLICAR ─────────────────────

document.getElementById("btnPublicar").addEventListener("click", () => {
  const titulo = tituloInput.value.trim();
  const categoria = categoriaSelect.value;
  const conteudo = editor.innerHTML.trim();

  if (!titulo) {
    alert("Por favor, adicione um título à notícia.");
    tituloInput.focus();
    return;
  }
  if (!categoria) {
    alert("Por favor, selecione uma categoria.");
    categoriaSelect.focus();
    return;
  }
  if (!conteudo) {
    alert("Por favor, escreva o conteúdo da notícia.");
    editor.focus();
    return;
  }

  // TODO: substituir pela chamada real à API/backend
  alert(
    `✅ Notícia "${titulo}" publicada com sucesso na categoria ${categoria}!`,
  );
});

// ── Boot ─────────────────────────────────
atualizarContagem();
sincronizarPreview();
