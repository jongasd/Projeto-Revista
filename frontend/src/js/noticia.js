const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function carregarNoticia() {
  try {
    const response = await fetch(`http://localhost:3000/noticias/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar notícia");
    }

    const data = await response.json();

    const noticia = data.dados || data;

    const container = document.getElementById("noticia-container");

    container.innerHTML = `
      <div class="news-card">
        <h1>${noticia.titulo}</h1>
        <p>${noticia.descricao}</p>
        <p>${noticia.conteudo}</p>
        <p><strong>Gênero:</strong> ${noticia.genero}</p>
      </div>
    `;

  } catch (error) {
    console.error(error);
  }
}

carregarNoticia();