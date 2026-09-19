/* ═══════════════════════════════════════════════════════
   noticiasApi.js — busca notícias reais da API e normaliza
   pro formato que feed.js / noticia.js já sabem renderizar.
═══════════════════════════════════════════════════════ */

const CJ_NOTICIAS_API_BASE = "http://localhost:3000";

function cjRemoverAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function cjSlugCategoria(genero) {
  return cjRemoverAcentos(genero || "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

/**
 * Converte um registro vindo de GET /noticias (ou /noticias/:id) para o
 * formato usado pelas funções de card já existentes em feed.js/noticia.js.
 * `prefixoImagem` é o caminho relativo até a pasta src/ a partir da página
 * atual (ex.: "./src/" na home, "../../" nas páginas de categoria).
 */
function cjNormalizarNoticia(apiItem, prefixoImagem) {
  const capa = apiItem.imagem_capa
    ? `${prefixoImagem}${apiItem.imagem_capa}`
    : `${prefixoImagem}images/placeholder.png`;

  return {
    id: apiItem.id,
    titulo: apiItem.titulo,
    autor: apiItem.autor || "Autor desconhecido",
    categoria: apiItem.genero,
    categoriaSlug: cjSlugCategoria(apiItem.genero),
    img: capa,
    pdf: null,
    comentarios: apiItem.total_comentarios ?? 0,
    favoritos: apiItem.total_favoritos ?? 0,
    destaque: false,
    desc: apiItem.descricao || "",
    conteudo: apiItem.conteudo,
    data: apiItem.created_at,
  };
}

const CJNoticiasApi = {
  /**
   * Busca todas as notícias, opcionalmente filtradas por gênero/categoria
   * (ex.: "Economia"). Lança em caso de falha de rede/servidor.
   */
  async listar({ genero, prefixoImagem = "./" } = {}) {
    const url = new URL(`${CJ_NOTICIAS_API_BASE}/noticias`);
    if (genero) url.searchParams.set("genero", genero);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Não foi possível carregar as notícias do servidor.");
    }
    const json = await res.json();
    return (json.dados || []).map((n) => cjNormalizarNoticia(n, prefixoImagem));
  },

  async buscarPorId(id, { prefixoImagem = "./" } = {}) {
    const res = await fetch(`${CJ_NOTICIAS_API_BASE}/noticias/${id}`);
    if (!res.ok) {
      throw new Error("Notícia não encontrada.");
    }
    const json = await res.json();
    return cjNormalizarNoticia(json.dados, prefixoImagem);
  },
};
