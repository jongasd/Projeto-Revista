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
    valid &= validateField(
      "nome",
      (v) => v.trim().length >= 3,
      "Informe o nome completo (mínimo 3 caracteres).",
    );
    valid &= validateField(
      "rm",
      (v) => /^\d+$/.test(v.trim()),
      "RM deve conter apenas números.",
    );
    valid &= validateField(
      "turma",
      (v) => v.trim().length >= 2 && v.trim().length <= 6,
      "Turma deve ter entre 2 e 6 caracteres.",
    );
    valid &= validateField(
      "tipo",
      (v) => v !== "",
      "Selecione o tipo de usuário.",
    );
  }

  if (step === 2) {
    valid &= validateField(
      "email",
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      "Informe um e-mail válido.",
    );
    valid &= validateField(
      "senha",
      (v) => v.length >= 8,
      "A senha deve ter no mínimo 8 caracteres.",
    );
    valid &= validateField(
      "confirmar-senha",
      (v) => v === document.getElementById("senha").value,
      "As senhas não conferem.",
    );
  }

  return Boolean(valid);
}

function validateField(id, rule, message) {
  const input = document.getElementById(id);
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

  // Contador de caracteres — descrição
  const descricao = document.getElementById("descricao");
  const charCount = document.getElementById("char-count");
  if (descricao && charCount) {
    descricao.addEventListener("input", () => {
      charCount.textContent = `${descricao.value.length} / 1000`;
    });
  }

  // Força da senha
  const senha = document.getElementById("senha");
  if (senha) {
    senha.addEventListener("input", () => checkPasswordStrength(senha.value));
  }
});

/* =============================================
   FORÇA DA SENHA E TOGGLE
   ============================================= */
function checkPasswordStrength(value) {
  const fill = document.getElementById("strength-fill");
  const label = document.getElementById("strength-label");
  if (!fill || !label) return;

  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const levels = [
    { pct: "0%", color: "transparent", text: "" },
    { pct: "25%", color: "#f87171", text: "Muito fraca" },
    { pct: "50%", color: "#fbbf24", text: "Fraca" },
    { pct: "75%", color: "#60a5fa", text: "Boa" },
    { pct: "100%", color: "#34d399", text: "Forte" },
  ];

  const level = levels[score] || levels[0];
  fill.style.width = level.pct;
  fill.style.background = level.color;
  label.textContent = level.text;
  label.style.color = level.color;
}

function toggleSenha(id, btn) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈";
  } else {
    input.type = "password";
    btn.textContent = "👁";
  }
}

/* =============================================
   PREVIEW DO AVATAR
   ============================================= */
function previewAvatar(input) {
  const file = input.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Imagem muito grande. Máximo: 5MB.");
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.getElementById("avatar-img");
    const placeholder = document.getElementById("avatar-placeholder");
    img.src = e.target.result;
    img.style.display = "block";
    placeholder.style.display = "none";
  };
  reader.readAsDataURL(file);
}

/* =============================================
   COLETAR DADOS DO FORMULÁRIO
   ============================================= */
function getFormData() {
  return {
    nome: document.getElementById("nome").value.trim(),
    turma: document.getElementById("turma").value.trim(),
    email: document.getElementById("email").value.trim(),
    rm: parseInt(document.getElementById("rm").value, 10),
    senha: document.getElementById("senha").value,
    tipo: document.getElementById("tipo").value,
    foto_perfil: getFotoBase64(),
    descricao: document.getElementById("descricao").value.trim() || null,
  };
}

function getFotoBase64() {
  const img = document.getElementById("avatar-img");
  if (!img || img.style.display === "none") return null;
  return img.src; // já é base64
}

/* =============================================
   ENVIO PARA O BACKEND
   ============================================= */
async function submitForm() {
  if (!validateStep(2)) {
    goToStep(2);
    return;
  }

  const btnSubmit = document.getElementById("btn-submit");
  const btnLabel = document.getElementById("btn-label");
  const spinner = document.getElementById("spinner");

  btnSubmit.disabled = true;
  btnLabel.textContent = "Cadastrando...";
  spinner.style.display = "inline-block";

  const payload = getFormData();

  try {
    const response = await fetch(`${API_BASE_URL}/usuario`, {
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
    console.error("Erro ao cadastrar:", err);
    alert(`Não foi possível realizar o cadastro.\n\n${err.message}`);
  } finally {
    btnSubmit.disabled = false;
    btnLabel.textContent = "Criar conta";
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
    el.value = "";
    el.classList.remove("valid", "invalid");
  });

  const img = document.getElementById("avatar-img");
  const placeholder = document.getElementById("avatar-placeholder");
  if (img) {
    img.src = "";
    img.style.display = "none";
  }
  if (placeholder) placeholder.style.display = "block";

  const charCount = document.getElementById("char-count");
  const strengthFill = document.getElementById("strength-fill");
  const strengthLabel = document.getElementById("strength-label");
  if (charCount) charCount.textContent = "0 / 1000";
  if (strengthFill) strengthFill.style.width = "0%";
  if (strengthLabel) strengthLabel.textContent = "";

  currentStep = 1;
  document
    .querySelectorAll(".form-step")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById("step-1").classList.add("active");
  updateSidebarSteps(1);
}
