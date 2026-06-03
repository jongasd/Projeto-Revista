const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // TODO: substituir por autenticação real
  window.location.href = "index.html";
});
