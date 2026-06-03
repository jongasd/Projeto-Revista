// ═══════════════════════════════════════════
//  CONECTA JOVEM — feed.js
//  Coloque em: frontend/src/scripts/feed.js
// ═══════════════════════════════════════════

// ── Base de dados das notícias ──────────────────────────────────────────────
const NOTICIAS = [
  // TECNOLOGIA
  {
    id: "tecnologia-1",
    titulo: "Manifesto: IA e Ética Digital",
    autor: "Anthero Franco Sprana",
    categoria: "Tecnologia",
    categoriaSlug: "tecnologia",
    img: "./src/images/notices/tecnologia/Anthero.png",
    pdf: "./src/documents/tecnologia/Anthero_Franco_Sprana_Manifesto_Ia_e_Etica_Digital.pdf",
    comentarios: 12,
    favoritos: 34,
    destaque: true,
    desc: "Uma análise crítica sobre os limites éticos da inteligência artificial e os desafios do mundo digital para a nova geração.",
  },
  {
    id: "tecnologia-2",
    titulo: "Discurso: Cybercrime em Alta",
    autor: "Enzo Thomaz de Jesus",
    categoria: "Tecnologia",
    categoriaSlug: "tecnologia",
    img: "./src/images/notices/tecnologia/Enzo.png",
    pdf: "./src/documents/tecnologia/Enzo_Thomaz_de_Jesus_Discurso_Cybercrime.pdf",
    comentarios: 5,
    favoritos: 19,
    destaque: false,
    desc: "Os crimes digitais crescem em ritmo acelerado — e os jovens estão na linha de frente tanto como vítimas quanto como protagonistas da mudança.",
  },
  {
    id: "tecnologia-3",
    titulo: "Carta Aberta: IA e Ética Digital",
    autor: "Pietro Guedes de Oliveira",
    categoria: "Tecnologia",
    categoriaSlug: "tecnologia",
    img: "./src/images/notices/tecnologia/Pietro", // sem extensão — fallback tratado
    pdf: "./src/documents/tecnologia/Pietro_Guedes_de_Oliveira_CartaAberta_IAeEticaDigital.pdf",
    comentarios: 3,
    favoritos: 11,
    destaque: false,
    desc: "Uma carta aberta para quem desenvolve, regula e usa inteligência artificial: precisamos de ética antes de velocidade.",
  },
  {
    id: "tecnologia-4",
    titulo: "Depoimento: Vítima de Cybercrime",
    autor: "Thiago Tavares de Melo",
    categoria: "Tecnologia",
    categoriaSlug: "tecnologia",
    img: "./src/images/notices/tecnologia/Thiago.png",
    pdf: "./src/documents/tecnologia/Thiago_Tavares_de_Melo_Depoimento_Cybercrime.pdf",
    comentarios: 7,
    favoritos: 22,
    destaque: false,
    desc: "Um relato pessoal de quem viveu as consequências do crime digital e decidiu transformar a experiência em alerta coletivo.",
  },

  // EDUCAÇÃO
  {
    id: "educacao-1",
    titulo: "Carta Pessoal: O Futuro da Educação",
    autor: "Laiz Vaz",
    categoria: "Educação",
    categoriaSlug: "educacao",
    img: "./src/images/notices/educacao/Laiz.png",
    pdf: "./src/documents/educacao/laiz_vaz_carta_pessoal_educacao.pdf",
    comentarios: 9,
    favoritos: 30,
    destaque: false,
    desc: "Uma carta íntima sobre as expectativas, frustrações e esperanças de quem vive a educação brasileira por dentro.",
  },
  {
    id: "educacao-2",
    titulo: "Manifesto pela Educação de Qualidade",
    autor: "Letícia Parentella Sanduchi",
    categoria: "Educação",
    categoriaSlug: "educacao",
    img: "./src/images/notices/educacao/Leticia.png",
    pdf: "./src/documents/educacao/leticia_parentella-sanduchi_manifesto_educacao.pdf",
    comentarios: 4,
    favoritos: 16,
    destaque: false,
    desc: "É preciso exigir mais do sistema. Este manifesto convoca estudantes, professores e famílias a lutarem por escolas melhores.",
  },
  {
    id: "educacao-3",
    titulo: "Depoimento: Minha Jornada Escolar",
    autor: "Maria Julia Garnham Ferreira",
    categoria: "Educação",
    categoriaSlug: "educacao",
    img: "./src/images/notices/educacao/Maria_julia.png",
    pdf: "./src/documents/educacao/Maria_Julia_Garnham_Ferreira_Depoimento_Educação.pdf",
    comentarios: 6,
    favoritos: 20,
    destaque: false,
    desc: "Cada sala de aula carrega histórias invisíveis. Este depoimento revela o que os números do IDEB não conseguem contar.",
  },
  {
    id: "educacao-4",
    titulo: "Discurso: Educação como Direito",
    autor: "Sofia Marcolongo dos Santos",
    categoria: "Educação",
    categoriaSlug: "educacao",
    img: "./src/images/notices/educacao/Sofia.png",
    pdf: "./src/documents/educacao/sofia_marcolongo_dos_santos_discurso_educacao.pdf",
    comentarios: 3,
    favoritos: 8,
    destaque: false,
    desc: "Educação não é privilégio, é direito — e este discurso não deixa ninguém esquecer disso.",
  },

  // POLÍTICA
  {
    id: "politica-1",
    titulo: "Discurso: Soberania Nacional",
    autor: "Emanuely Macedo Padovan",
    categoria: "Política",
    categoriaSlug: "politica",
    img: "./src/images/notices/politica/Emanuely.png",
    pdf: "./src/documents/politica/Emanuely_Macedo_Padovan_Discurso_SoberaniaNacional.pdf",
    comentarios: 20,
    favoritos: 87,
    destaque: false,
    desc: "O que significa ser soberano hoje? Um discurso contundente sobre autonomia nacional e os desafios da geopolítica contemporânea.",
  },
  {
    id: "politica-2",
    titulo: "Carta Aberta: Soberania Nacional",
    autor: "Livia Hermano",
    categoria: "Política",
    categoriaSlug: "politica",
    img: "./src/images/notices/politica/Livia.png",
    pdf: "./src/documents/politica/Livia_Hermano_Carta_Aberta_SoberaniaNacional.pdf",
    comentarios: 14,
    favoritos: 61,
    destaque: false,
    desc: "Uma carta aberta dirigida aos líderes políticos: soberania começa nas decisões do dia a dia, não apenas nos discursos.",
  },
  {
    id: "politica-3",
    titulo: "Depoimento: Política na Prática",
    autor: "Yasmin Vitoria do Nascimento Ramos",
    categoria: "Política",
    categoriaSlug: "politica",
    img: "./src/images/notices/politica/Yasmin.png",
    pdf: "./src/documents/politica/Yasmin_Vitoria_do_Nascimento_Ramos_Depoimento_SoberaniaNacional.pdf",
    comentarios: 8,
    favoritos: 29,
    destaque: false,
    desc: "Quando uma jovem decide se envolver com política, o que ela encontra? Um depoimento honesto sobre participação e decepção.",
  },

  // SAÚDE
  {
    id: "saude-1",
    titulo: "Discurso: Saúde Mental Importa",
    autor: "Ana Julia Correa",
    categoria: "Saúde",
    categoriaSlug: "saude",
    img: "./src/images/notices/saude/Ana_Ferraz.png",
    pdf: "./src/documents/saude/Ana_Julia_Correa_discurso_saude-mental.pdf",
    comentarios: 11,
    favoritos: 55,
    destaque: false,
    desc: "Falar sobre saúde mental ainda é tabu — mas este discurso quebra o silêncio com dados, histórias e urgência.",
  },
  {
    id: "saude-2",
    titulo: "Carta de Reclamação: Sistema de Saúde",
    autor: "Ana Júlia Ribeiro Ferreira",
    categoria: "Saúde",
    categoriaSlug: "saude",
    img: "./src/images/notices/saude/Ana_Ribeiro.png",
    pdf: "./src/documents/saude/Ana_Júlia _Ribeiro_Ferreira-_Carta_de_Reclamação.pdf",
    comentarios: 8,
    favoritos: 43,
    destaque: false,
    desc: "Filas, descaso e falta de recursos: uma carta que denuncia o que muitos vivem mas poucos dizem em voz alta.",
  },
  {
    id: "saude-3",
    titulo: "Editorial: Saúde Mental na Escola",
    autor: "Ana Katy Romão Vasconcellos",
    categoria: "Saúde",
    categoriaSlug: "saude",
    img: "./src/images/notices/saude/Ana_Katy.png",
    pdf: "./src/documents/saude/Ana_Katy_Romão_Vasconcellos_Editorial_Saúde_Mental.pdf",
    comentarios: 6,
    favoritos: 18,
    destaque: false,
    desc: "Por que as escolas precisam incluir saúde mental no currículo? Um editorial que argumenta com dados e sensibilidade.",
  },

  // ECONOMIA
  {
    id: "economia-1",
    titulo: "Carta Pessoal: Economia no Cotidiano",
    autor: "Gabriela Oliveira",
    categoria: "Economia",
    categoriaSlug: "economia",
    img: "./src/images/notices/economia/Maria_Eduarda.png",
    pdf: "./src/documents/economia/Gabriela_Oliveira_cartaPessoal_economia.pdf",
    comentarios: 2,
    favoritos: 15,
    destaque: false,
    desc: "Como a economia global afeta o bolso de uma família jovem? Uma carta pessoal sobre inflação, sonhos e reinvenção.",
  },
  {
    id: "economia-2",
    titulo: "Manifesto Econômico Jovem",
    autor: "Maria Eduarda Bertolli Da Silva",
    categoria: "Economia",
    categoriaSlug: "economia",
    img: "./src/images/notices/economia/Milena.png",
    pdf: "./src/documents/economia/Maria_Eduarda_Bertolli_Da_Silva_Manifesto_Economia.pdf",
    comentarios: 11,
    favoritos: 55,
    destaque: false,
    desc: "Os jovens têm propostas para a economia do país. Este manifesto apresenta ideias concretas para um futuro mais justo.",
  },
  {
    id: "economia-3",
    titulo: "Depoimento Pessoal: Economia",
    autor: "Milena Hoppe Sales",
    categoria: "Economia",
    categoriaSlug: "economia",
    img: "./src/images/notices/economia/Milena.png",
    pdf: "./src/documents/economia/Milena_Hoppe_Sales_depoimentoPessoal_economia.pdf",
    comentarios: 5,
    favoritos: 12,
    destaque: false,
    desc: "Crescer em meio à crise econômica molda perspectivas únicas. Um depoimento sobre resiliência e reconstrução financeira.",
  },
  {
    id: "economia-4",
    titulo: "Discurso: Economia para Todos",
    autor: "Nicoly Valaitis",
    categoria: "Economia",
    categoriaSlug: "economia",
    img: "./src/images/notices/economia/Maria_Eduarda.png",
    pdf: "./src/documents/economia/Nicoly_Valaitis-discurso-economia.pdf",
    comentarios: 3,
    favoritos: 9,
    destaque: false,
    desc: "Economia não é só para especialistas — é para todo cidadão que quer entender e transformar sua realidade.",
  },

  // MUNDO DO TRABALHO
  {
    id: "trabalho-1",
    titulo: "Manifesto: Mercado de Trabalho",
    autor: "Heitor Barbosa dos Santos",
    categoria: "Mundo do Trabalho",
    categoriaSlug: "mundodotrabalho",
    img: "./src/images/notices/mundodotrabalho/Heitor.png",
    pdf: "./src/documents/mundodotrabalho/Heitor_Barbosa_dos_Santos_Manifesto_MercadoDeTrabalho.pdf",
    comentarios: 4,
    favoritos: 11,
    destaque: false,
    desc: "O mercado de trabalho mudou — mas as regras ainda são as mesmas de 50 anos atrás. Um manifesto por atualização urgente.",
  },
  {
    id: "trabalho-2",
    titulo: "Depoimento: Mercado de Trabalho",
    autor: "João Marcos",
    categoria: "Mundo do Trabalho",
    categoriaSlug: "mundodotrabalho",
    img: "./src/images/notices/mundodotrabalho/Heitor.png",
    pdf: "./src/documents/mundodotrabalho/Joao_Marcos_Depoimento_MercadoTrabalho.pdf",
    comentarios: 6,
    favoritos: 27,
    destaque: false,
    desc: "Primeiro emprego, estágio, freelance: as múltiplas faces do jovem trabalhador brasileiro contadas em primeira pessoa.",
  },
  {
    id: "trabalho-3",
    titulo: "Carta: Escala 6x1 em Debate",
    autor: "Mateus Lopes Ferreira",
    categoria: "Mundo do Trabalho",
    categoriaSlug: "mundodotrabalho",
    img: "./src/images/notices/mundodotrabalho/Vinícius_Assuncao.png",
    pdf: "./src/documents/mundodotrabalho/mateus_lopes_ferreira_carta_escala6X1.pdf",
    comentarios: 8,
    favoritos: 43,
    destaque: false,
    desc: "Trabalhar seis dias e folgar um: o que essa escala faz com o corpo, a mente e a vida social dos trabalhadores jovens?",
  },
  {
    id: "trabalho-4",
    titulo: "Editorial: Mercado de Trabalho",
    autor: "Vinícius Assunção Santos",
    categoria: "Mundo do Trabalho",
    categoriaSlug: "mundodotrabalho",
    img: "./src/images/notices/mundodotrabalho/Vinícius_Assuncao.png",
    pdf: "./src/documents/mundodotrabalho/Vinícius_Assunção_Santos_Editorial_MarcadoDeTrabalho.pdf",
    comentarios: 1,
    favoritos: 8,
    destaque: false,
    desc: "Uma análise editorial sobre as tendências do mercado de trabalho e o que os jovens precisam saber para se posicionar.",
  },

  // VIOLÊNCIA
  {
    id: "violencia-1",
    titulo: "Depoimento: Violência Urbana",
    autor: "Anna Viktoria Alacamini de Carvalho",
    categoria: "Violência",
    categoriaSlug: "violencia",
    img: "./src/images/notices/violencia/Gabriela_Carnevali.png",
    pdf: "./src/documents/violencia/Anna_Viktoria_Alacamini_de_Carvalho_depoimento_violência.pdf",
    comentarios: 6,
    favoritos: 27,
    destaque: false,
    desc: "Testemunhar violência deixa marcas. Este depoimento corajoso expõe o que muitos preferem não ver nas cidades brasileiras.",
  },
  {
    id: "violencia-2",
    titulo: "Carta Denúncia: Operações Policiais",
    autor: "Elisa Dias Sergio",
    categoria: "Violência",
    categoriaSlug: "violencia",
    img: "./src/images/notices/violencia/Elisa.png",
    pdf: "./src/documents/violencia/Elisa_Dias_Sergio_CartaDenúncia_OperaçõesPolicias.pdf",
    comentarios: 14,
    favoritos: 61,
    destaque: false,
    desc: "Uma carta de denúncia sobre as operações policiais nas periferias: quem protege, quem pune, e quem fica invisível.",
  },
  {
    id: "violencia-3",
    titulo: "Texto de Apresentação: Violência",
    autor: "Gabriela Carnevali Gonçalves Lima",
    categoria: "Violência",
    categoriaSlug: "violencia",
    img: "./src/images/notices/violencia/Gabriela_Carnevali.png",
    pdf: "./src/documents/violencia/Gabriela_Carnevali_Gonçalves_Lima_TextoDeApresentação_Violência.pdf",
    comentarios: 3,
    favoritos: 14,
    destaque: false,
    desc: "Um texto de abertura que contextualiza os dados e histórias por trás dos índices de violência no Brasil contemporâneo.",
  },
];

// ── SVG helpers ────────────────────────────────────────────────────────────
const SVG_COMMENT = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>`;

const SVG_STAR = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02
                   12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
</svg>`;

// ── Favoritos (localStorage) ───────────────────────────────────────────────
function getFavoritos() {
  try {
    return JSON.parse(localStorage.getItem("cj_favoritos") || "[]");
  } catch {
    return [];
  }
}

function toggleFavorito(id) {
  const favs = getFavoritos();
  const idx = favs.indexOf(id);
  if (idx === -1) favs.push(id);
  else favs.splice(idx, 1);
  localStorage.setItem("cj_favoritos", JSON.stringify(favs));
  return idx === -1; // true = agora é favorito
}

// ── Navegar para notícia ───────────────────────────────────────────────────
function abrirNoticia(noticia) {
  // Mapeia o categoriaSlug do feed.js para as chaves do CATALOGO no noticia.js
  const slugMap = {
    tecnologia: "tecnologia",
    educacao: "educacao",
    politica: "politica",
    saude: "saude",
    economia: "economia",
    mundodotrabalho: "mundotrabalho", // ← noticia.js usa "mundotrabalho" (sem "do")
    violencia: "violencia",
  };

  // Mapeia o id do feed.js para o id do CATALOGO no noticia.js
  const idMap = {
    "tecnologia-1": "tec-01",
    "tecnologia-2": "tec-02",
    "tecnologia-3": "tec-03",
    "tecnologia-4": "tec-04",
    "educacao-1": "edu-01",
    "educacao-2": "edu-02",
    "educacao-3": "edu-03",
    "educacao-4": "edu-04",
    "politica-1": "pol-01",
    "politica-2": "pol-02",
    "politica-3": "pol-03",
    "saude-1": "sau-01",
    "saude-2": "sau-02",
    "saude-3": "sau-03",
    "economia-1": "eco-01",
    "economia-2": "eco-02",
    "economia-3": "eco-03",
    "economia-4": "eco-04",
    "trabalho-1": "mun-01",
    "trabalho-2": "mun-02",
    "trabalho-3": "mun-03",
    "trabalho-4": "mun-04",
    "violencia-1": "vio-01",
    "violencia-2": "vio-02",
    "violencia-3": "vio-03",
  };

  const categoria = slugMap[noticia.categoriaSlug] || noticia.categoriaSlug;
  const id = idMap[noticia.id] || noticia.id;

  window.location.href = `./src/pages/notices/noticia.html?categoria=${categoria}&id=${id}`;
}

// ── Criar card pequeno (feed-card) ─────────────────────────────────────────
function criarCard(noticia, extra = "") {
  const favs = getFavoritos();
  const isFav = favs.includes(noticia.id);

  const card = document.createElement("article");
  card.className = `feed-card ${extra}`;
  card.style.cursor = "pointer";

  card.innerHTML = `
    <div class="feed-card-img">
      <img src="${noticia.img}" alt="${noticia.titulo}"
           onerror="this.style.opacity='0'"/>
      <button class="feed-card-star ${isFav ? "feed-card-star--active" : ""}"
              aria-label="Favoritar" data-id="${noticia.id}">★</button>
    </div>
    <div class="feed-card-body">
      <h3 class="feed-card-title">${noticia.titulo}</h3>
      <div class="feed-card-footer">
        <div class="feed-card-tags">
          <span class="feed-tag">${noticia.autor.split(" ")[0]}</span>
          <span class="feed-tag">${noticia.categoria}</span>
        </div>
        <div class="feed-card-stats">
          <span class="feed-stat">${SVG_COMMENT}${noticia.comentarios}</span>
          <span class="feed-stat">${SVG_STAR}${noticia.favoritos}</span>
        </div>
      </div>
    </div>`;

  // Clique no card → notícia
  card.addEventListener("click", (e) => {
    if (e.target.closest(".feed-card-star")) return;
    abrirNoticia(noticia);
  });

  // Clique na estrela → favorito
  card.querySelector(".feed-card-star").addEventListener("click", (e) => {
    e.stopPropagation();
    const ativo = toggleFavorito(noticia.id);
    e.currentTarget.classList.toggle("feed-card-star--active", ativo);
  });

  return card;
}

// ── Preencher destaque ─────────────────────────────────────────────────────
function renderDestaque() {
  const noticia = NOTICIAS.find((n) => n.destaque) || NOTICIAS[0];
  const favs = getFavoritos();
  const isFav = favs.includes(noticia.id);

  const card = document.getElementById("destaqueCard");
  if (!card) return;

  card.querySelector(".feed-destaque-img img").src = noticia.img;
  card.querySelector(".feed-destaque-img img").alt = noticia.titulo;
  card.querySelector(".feed-destaque-img img").onerror = function () {
    this.style.opacity = "0";
  };

  const tags = card.querySelector(".feed-destaque-tags");
  tags.innerHTML = `
    <span class="feed-tag">${noticia.categoria}</span>
    <span class="feed-tag feed-tag--autor">${noticia.autor}</span>`;

  card.querySelector(".feed-destaque-title").textContent = noticia.titulo;
  card.querySelector(".feed-destaque-desc").textContent = noticia.desc;

  // stats
  const meta = card.querySelector(".feed-destaque-meta");
  meta.querySelectorAll(".feed-stat")[0].innerHTML =
    `${SVG_COMMENT}${noticia.comentarios}`;
  meta.querySelectorAll(".feed-stat")[1].innerHTML =
    `${SVG_STAR}${noticia.favoritos}`;

  // botão ler notícia
  const btn = card.querySelector(".feed-destaque-btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    abrirNoticia(noticia);
  });

  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    if (e.target.closest(".feed-destaque-btn")) return;
    abrirNoticia(noticia);
  });
}

// ── Preencher grid ─────────────────────────────────────────────────────────
function renderGrid(containerId, lista) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = "";
  lista.forEach((n) => grid.appendChild(criarCard(n)));
}

// ── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Destaque: notícia de tecnologia com mais favoritos
  renderDestaque();

  // Recentes: 8 primeiras excluindo o destaque
  const destaque = NOTICIAS.find((n) => n.destaque) || NOTICIAS[0];
  const recentes = NOTICIAS.filter((n) => n.id !== destaque.id).slice(0, 8);
  renderGrid("feedGrid", recentes);

  // Mais lidas: top 4 por favoritos (excluindo destaque e recentes)
  const usados = new Set([destaque.id, ...recentes.map((n) => n.id)]);
  const maisLidas = [...NOTICIAS]
    .filter((n) => !usados.has(n.id))
    .sort((a, b) => b.favoritos - a.favoritos)
    .slice(0, 4);

  // fallback: se não sobrarem, pegar top 4 geral
  const maisLidasFinal =
    maisLidas.length >= 4
      ? maisLidas
      : [...NOTICIAS].sort((a, b) => b.favoritos - a.favoritos).slice(0, 4);

  renderGrid("maisLidasGrid", maisLidasFinal);

  // Usuário logado (opcional — se quiser puxar do localStorage)
  const usuario = JSON.parse(localStorage.getItem("cj_usuario") || "null");
  if (usuario) {
    const usernameEl = document.querySelector(".feed-nav-username");
    const avatarEl = document.getElementById("navAvatar");
    if (usernameEl) usernameEl.textContent = usuario.nome || "Usuário";
    if (avatarEl)
      avatarEl.innerHTML = `<span>${(usuario.nome || "U")[0].toUpperCase()}</span>`;
  }

  // Busca básica (filtra cards visíveis por título)
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll(".feed-card").forEach((card) => {
        const titulo =
          card.querySelector(".feed-card-title")?.textContent.toLowerCase() ||
          "";
        card.style.display = !q || titulo.includes(q) ? "" : "none";
      });
    });
  }
});
