const loginForm = document.getElementById("loginForm");

function exibirMensagem(texto, tipo) {
  let msg = document.querySelector(".msg");
  if (!msg) {
    msg = document.createElement("p");
    msg.className = "msg";
    loginForm.after(msg);
  }
  msg.textContent = texto;
  msg.className = `msg ${tipo}`;
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const botao = loginForm.querySelector('button[type="submit"]');

  if (!email || !senha) {
    exibirMensagem("Por favor, preencha todos os campos.", "erro");
    return;
  }

  botao.disabled = true;
  botao.textContent = "Entrando...";

  try {
    await CJAuth.login(email, senha);
    exibirMensagem("Login realizado! Redirecionando...", "sucesso");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 800);
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
    botao.disabled = false;
    botao.textContent = "Login";
  }
});
