/* =============================================
   ⚙️ CONFIGURAÇÃO DA API
   Altere esta URL para apontar para o seu backend
   ============================================= */
const API_BASE_URL = "http://localhost:3000/usuario"; // <-- troque conforme seu servidor

/* =============================================
   ESTADO DO FORMULÁRIO
   ============================================= */
let currentStep = 1;
const totalSteps = 3;

/* =============================================
   NAVEGAÇÃO ENTRE STEPS
   ============================================= */
function goToStep(step) {
  if (step > currentStep && !validateStep(currentStep)) return;

  // Esconde o step atual
  document.getElementById(`step-${currentStep}`).classList.remove("active");
  updateSidebarSteps(currentStep, "done");

  currentStep = step;

  // Mostra o novo step
  document.getElementById(`step-${currentStep}`).classList.add("active");
  updateSidebarSteps(currentStep, "active");
}

function updateSidebarSteps(stepNum, state) {
  const allSteps = document.querySelectorAll(".step");
  allSteps.forEach((el) => {
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
    valid &= validateField("nome",  (v) => v.trim().length >= 3, "Informe o nome completo (mínimo 3 caracteres).");
    valid &= validateField("rm",    (v) => /^\d+$/.test(v.trim()), "RM deve conter apenas números.");
    valid &= validateField("turma", (v) => v.trim().length >= 2 && v.trim().length <= 6, "Turma deve ter entre 2 e 6 caracteres.");
    valid &= validateField("tipo",  (v) => v !== "", "Selecione o tipo de usuário.");
  }

  if (step === 2) {
    valid &= validateField("email", (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), "Informe um e-mail válido.");
    valid &= validateField("senha", (v) => v.length >= 8, "A senha deve ter no mínimo 8 caracteres.");
    valid &= validateField(
      "confirmar-senha",
      (v) => v === document.getElementById("senha").value,
      "As senhas não conferem."
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

/* Limpa erro ao digitar */
document.addEventListener("DOMContentLoaded", () => {
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
   FORÇA DA SENHA
   ============================================= */
function checkPasswordStrength(value) {
  const fill   = document.getElementById("strength-fill");
  const label  = document.getElementById("strength-label");
  if (!fill || !label) return;

  let score = 0;
  if (value.length >= 8)                  score++;
  if (/[A-Z]/.test(value))               score++;
  if (/[0-9]/.test(value))               score++;
  if (/[^A-Za-z0-9]/.test(value))        score++;

  const levels = [
    { pct: "0%",   color: "transparent", text: "" },
    { pct: "25%",  color: "#f87171",     text: "Muito fraca" },
    { pct: "50%",  color: "#fbbf24",     text: "Fraca" },
    { pct: "75%",  color: "#60a5fa",     text: "Boa" },
    { pct: "100%", color: "#34d399",     text: "Forte" },
  ];

  const level = levels[score] || levels[0];
  fill.style.width      = level.pct;
  fill.style.background = level.color;
  label.textContent     = level.text;
  label.style.color     = level.color;
}

/* =============================================
   TOGGLE DE SENHA
   ============================================= */
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
    nome:         document.getElementById("nome").value.trim(),
    turma:        document.getElementById("turma").value.trim(),
    email:        document.getElementById("email").value.trim(),
    rm:           parseInt(document.getElementById("rm").value, 10),
    senha:        document.getElementById("senha").value,
    tipo:         document.getElementById("tipo").value,
    foto_perfil:  getFotoBase64(),
    descricao:    document.getElementById("descricao").value.trim() || null,
  };
}

function getFotoBase64() {
  const img = document.getElementById("avatar-img");
  if (!img || img.style.display === "none") return null;
  return img.src; // já é base64 via FileReader
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
  const btnLabel  = document.getElementById("btn-label");
  const spinner   = document.getElementById("spinner");

  // Estado de loading
  btnSubmit.disabled   = true;
  btnLabel.textContent = "Cadastrando...";
  spinner.style.display = "inline-block";

  const payload = getFormData();

  try {
    const response = await fetch(`${API_BASE_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      // O backend retornou um erro HTTP (4xx / 5xx)
      throw new Error(data.message || `Erro ${response.status}`);
    }

    // ✅ Sucesso
    showSuccess();

  } catch (err) {
    console.error("Erro ao cadastrar:", err);
    alert(`Não foi possível realizar o cadastro.\n\n${err.message}`);
  } finally {
    btnSubmit.disabled    = false;
    btnLabel.textContent  = "Criar conta";
    spinner.style.display = "none";
  }
}

/* =============================================
   TELA DE SUCESSO
   ============================================= */
function showSuccess() {
  document.getElementById(`step-${currentStep}`).classList.remove("active");
  document.getElementById("step-success").classList.add("active");

  // Marca todos os steps como "done" na sidebar
  document.querySelectorAll(".step").forEach((el) => {
    el.classList.remove("active");
    el.classList.add("done");
  });
}

/* =============================================
   RESETAR FORMULÁRIO
   ============================================= */
function resetForm() {
  document.getElementById("step-success").classList.remove("active");

  // Limpa todos os campos
  document.querySelectorAll("input, select, textarea").forEach((el) => {
    el.value = "";
    el.classList.remove("valid", "invalid");
    el.type === "password" && (el.type = "password");
  });

  // Reset avatar
  const img = document.getElementById("avatar-img");
  const placeholder = document.getElementById("avatar-placeholder");
  if (img) { img.src = ""; img.style.display = "none"; }
  if (placeholder) placeholder.style.display = "block";

  // Reset char count e strength
  const charCount = document.getElementById("char-count");
  if (charCount) charCount.textContent = "0 / 1000";
  const strengthFill  = document.getElementById("strength-fill");
  const strengthLabel = document.getElementById("strength-label");
  if (strengthFill)  { strengthFill.style.width = "0%"; }
  if (strengthLabel) { strengthLabel.textContent = ""; }

  // Volta ao step 1
  currentStep = 1;
  document.querySelectorAll(".form-step").forEach((el) => el.classList.remove("active"));
  document.getElementById("step-1").classList.add("active");
  updateSidebarSteps(1, "active");
}

/* =============================================
   EXEMPLO DE ROTA BACKEND ESPERADA
   =============================================

   POST /usuarios
   Content-Type: application/json

   Payload enviado:
   {
     "nome":        "João da Silva",
     "turma":       "3A001",
     "email":       "joao@escola.com.br",
     "rm":          123456,
     "senha":       "MinhaSenh@123",       ← backend deve fazer hash (bcrypt)
     "tipo":        "aluno",
     "foto_perfil": "data:image/png;base64,...",  ← ou null
     "descricao":   "Estudante de TI."            ← ou null
   }

   Resposta esperada (sucesso 201):
   { "message": "Usuário criado com sucesso.", "id": 42 }

   Resposta esperada (erro 400):
   { "message": "E-mail já cadastrado." }

   ============================================= */