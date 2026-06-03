// Contador de bio
const bio = document.getElementById("bio");
const counter = document.getElementById("bioCounter");
bio.addEventListener("input", () => {
  counter.textContent = `${bio.value.length}/1000`;
});

// Preview de avatar
const avatarInput = document.getElementById("avatarInput");
const avatarCircle = document.getElementById("avatarCircle");
const avatarInitials = document.getElementById("avatarInitials");
const btnExcluir = document.getElementById("btnExcluirFoto");

avatarInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    avatarCircle.style.backgroundImage = `url(${ev.target.result})`;
    avatarCircle.style.backgroundSize = "cover";
    avatarCircle.style.backgroundPosition = "center";
    avatarInitials.style.display = "none";
  };
  reader.readAsDataURL(file);
});

btnExcluir.addEventListener("click", () => {
  avatarCircle.style.backgroundImage = "";
  avatarInitials.style.display = "flex";
  avatarInput.value = "";
});