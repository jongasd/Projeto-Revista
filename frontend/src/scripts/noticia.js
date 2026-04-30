/* =============================================
   ⚙️ CONFIGURAÇÃO DA API
   ============================================= */
const API_BASE_URL = "http://localhost:3000";

/* =============================================
   ESTADO DO FORMULÁRIO
   ============================================= */
let currentStep = 1;

/* =============================================
   NAVEGAÇÃO ENTRE STEPS
   ============================================= */
function goToStep(step) {
  if (step > currentStep && !validateStep(currentStep)) return;

  document.getElementById(`step-${currentStep}`).classList.remove("active");
  updateSidebarSteps(currentStep, "done");

  currentStep = step;

  document.getElementById(`step-${currentStep}`).classList.add("active");
  updateSidebarSteps(currentStep, "active");
}

function updateSidebarSteps(stepNum) {
  document.querySelectorAll(".panel-steps .step").forEach((el) => {
    const num = parseInt(el.dataset.step);
    el.classList.remove("active", "done");
    if (num < stepNum) el.classList.add("done");
    if (num === stepNum) el.classList.add("active");
  });
}

/* =============================================
   VALIDAÇÃO POR STEP
   ============================================= */
function validateStep(step) {
  let valid = true;

  if (step === 1) {
    valid &= validateField("genero", (v) => v !== "", "Selecione o gênero textual/visual da publicação.");
  }

  if (step === 2) {
    valid &= validateField("titulo", (v) => v.trim().length >= 5, "O título deve ter pelo menos 5 caracteres.");
    valid &= validateField("descricao", (v) => v.trim().length >= 10, "O lide deve ter pelo menos 10 caracteres.");

    const isTexto = document.querySelector('input[name="formato_conteudo"][value="texto"]').checked;
    
    if (isTexto) {
      valid &= validateField("conteudo", (v) => v.trim().length >= 20, "O texto deve conter pelo menos 20 caracteres.");
    } else {
      const imgConteudo = document.getElementById("conteudo-img-tag");
      const hasImage = imgConteudo && imgConteudo.src && imgConteudo.src.startsWith("data:image");
      
      if (!hasImage) {
        alert("Por favor, faça o upload da imagem ou charge principal.");
        valid = false;
      }
    }
  }

  return Boolean(valid);
}

function validateField(id, rule, message) {
  const input = document.getElementById(id);
  if (!input || input.offsetParent === null) return true; // Ignora se estiver oculto (ex: textarea oculto)

  const errorEl = document.getElementById(`erro-${id}`);
  const value = input.value;

  if (!rule(value)) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    if (errorEl) errorEl.textContent = message;
    return false;
  }

  input.classList.remove("invalid");
  input.classList.add("valid");
  if (errorEl) errorEl.textContent = "";
  return true;
}

/* =============================================
   EVENTOS INICIAIS (DOM READY)
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Limpa erros ao digitar
  document.querySelectorAll("input, select, textarea").forEach((el) => {
    el.addEventListener("input", () => {
      el.classList.remove("invalid");
      const errorEl = document.getElementById(`erro-${el.id}`);
      if (errorEl) errorEl.textContent = "";
    });
  });

  // Contador de caracteres para Descrição (Lide)
  const descricao = document.getElementById("descricao");
  const charCountDesc = document.getElementById("char-count-desc");
  if (descricao && charCountDesc) {
    descricao.addEventListener("input", () => {
      charCountDesc.textContent = `${descricao.value.length} / 100`;
    });
  }

  // Intercepta o Submit nativo do formulário
  const form = document.getElementById("contentForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm();
    });
  }
});

/* =============================================
   TOGGLE DE FORMATO (TEXTO / IMAGEM)
   ============================================= */
function toggleFormatoConteudo() {
  const formatoTexto = document.querySelector('input[name="formato_conteudo"][value="texto"]').checked;
  const campoTexto = document.getElementById("campo-texto");
  const campoImagem = document.getElementById("campo-imagem");
  const textareaConteudo = document.getElementById("conteudo");
  const inputArquivo = document.getElementById("arquivo_conteudo");

  if (formatoTexto) {
    campoTexto.style.display = "flex";
    campoImagem.style.display = "none";
    textareaConteudo.setAttribute("required", "true");
    inputArquivo.removeAttribute("required");
  } else {
    campoTexto.style.display = "none";
    campoImagem.style.display = "flex";
    textareaConteudo.removeAttribute("required");
    inputArquivo.setAttribute("required", "true");
  }

  textareaConteudo.classList.remove("invalid", "valid");
  inputArquivo.classList.remove("invalid", "valid");
}

/* =============================================
   PREVIEWS DE IMAGEM
   ============================================= */
function previewConteudo(input) {
  handleImagePreview(input, "conteudo-img-tag", "conteudo-placeholder", 10);
}

function previewCapa(input) {
  handleImagePreview(input, "capa-img", "image-placeholder", 5);
}

function handleImagePreview(input, imgId, placeholderId, maxSizeMB) {
  const file = input.files[0];
  if (!file) return;

  if (file.size > maxSizeMB * 1024 * 1024) {
    alert(`Imagem muito grande. Máximo permitido: ${maxSizeMB}MB.`);
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.getElementById(imgId);
    const placeholder = document.getElementById(placeholderId);
    img.src = e.target.result;
    img.style.display = "block";
    if (placeholder) placeholder.style.display = "none";
  };
  reader.readAsDataURL(file);
}

/* =============================================
   COLETAR DADOS DO FORMULÁRIO
   ============================================= */
function getFormData() {
  const isTexto = document.querySelector('input[name="formato_conteudo"][value="texto"]').checked;

  return {
    genero: document.getElementById("genero").value,
    titulo: document.getElementById("titulo").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    tipo_conteudo: isTexto ? "texto" : "imagem",
    conteudo_texto: isTexto ? document.getElementById("conteudo").value.trim() : null,
    conteudo_base64: isTexto ? null : getBase64FromId("conteudo-img-tag"),
    capa_base64: getBase64FromId("capa-img")
  };
}

function getBase64FromId(imgId) {
  const img = document.getElementById(imgId);
  if (!img || img.style.display === "none") return null;
  return img.src; 
}

/* =============================================
   ENVIO PARA O BACKEND
   ============================================= */
async function submitForm() {
  if (!validateStep(1) || !validateStep(2)) {
    return; // Não avança se os passos anteriores não estiverem validados
  }

  const btnSubmit = document.getElementById("btn-submit");
  const btnLabel = document.getElementById("btn-label");
  const spinner = document.getElementById("spinner");

  btnSubmit.disabled = true;
  btnLabel.textContent = "Publicando...";
  spinner.style.display = "inline-block";

  const payload = getFormData();

  try {
    const response = await fetch(`${API_BASE_URL}/publicacao`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensagem || `Erro ${response.status}`);
    }

    showSuccess();
  } catch (err) {
    console.error("Erro ao publicar:", err);
    alert(`Não foi possível publicar o conteúdo.\n\n${err.message}`);
  } finally {
    btnSubmit.disabled = false;
    btnLabel.textContent = "Publicar Conteúdo";
    spinner.style.display = "none";
  }
}

/* =============================================
   TELA DE SUCESSO E RESET
   ============================================= */
function showSuccess() {
  document.getElementById(`step-${currentStep}`).classList.remove("active");
  document.getElementById("step-success").classList.add("active");
  document.getElementById("step-success").style.display = "block";

  document.querySelectorAll(".panel-steps .step").forEach((el) => {
    el.classList.remove("active");
    el.classList.add("done");
  });
}

function resetForm() {
  document.getElementById("step-success").classList.remove("active");
  document.getElementById("step-success").style.display = "none";

  document.querySelectorAll("input, select, textarea").forEach((el) => {
    if (el.type !== "radio") el.value = "";
    el.classList.remove("valid", "invalid");
  });

  const radioTexto = document.querySelector('input[name="formato_conteudo"][value="texto"]');
  if (radioTexto) {
    radioTexto.checked = true;
    toggleFormatoConteudo();
  }

  ["conteudo-img-tag", "capa-img"].forEach((id) => {
    const img = document.getElementById(id);
    if (img) {
      img.src = "";
      img.style.display = "none";
    }
  });

  ["conteudo-placeholder", "image-placeholder"].forEach((id) => {
    const placeholder = document.getElementById(id);
    if (placeholder) placeholder.style.display = "block";
  });

  const charCountDesc = document.getElementById("char-count-desc");
  if (charCountDesc) charCountDesc.textContent = "0 / 100";

  currentStep = 1;
  document.querySelectorAll(".form-step").forEach((el) => el.classList.remove("active"));
  document.getElementById("step-1").classList.add("active");
  updateSidebarSteps(1);
}