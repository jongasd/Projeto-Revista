CREATE DATABASE projeto_revista;
use projeto_revista;
CREATE TABLE IF NOT exists usuario (
	id INT auto_increment primary key,
    nome VARCHAR(150) NOT NULL,
    turma VARCHAR(6) NOT NULL,
    email VARCHAR(508) NOT NULL,
    rm INTEGER NOT NULL,
    senha VARCHAR(150) NOT NULL,
    tipo VARCHAR(9) NOT NULL,
    foto_perfil text NULL,
    descricao VARCHAR(1000) NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS noticia (
	id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    imagem_id INT NULL,
    titulo VARCHAR(150) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    conteudo TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Constraint fk_noticia_usuario
		foreign key (usuario_id)
        references usuario(id)
        ON DELETE CASCADE,
	Constraint fk_noticia_imagem
		foreign key (imagem_id)
        references imagem(id)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS comentario (
	id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    noticia_id INT,
    conteudo VARCHAR(240) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comentario_usuario
		FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE,
	CONSTRAINT fk_comentario_noticia
		FOREIGN KEY (noticia_id)
        REFERENCES noticia(id)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS categoria (
	id INT AUTO_INCREMENT PRIMARY KEY,
    noticia_id INT,
    tipo_categoria VARCHAR(50),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_categoria_noticia
		FOREIGN KEY (noticia_id)
        REFERENCES noticia(id)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS curtida (
	id INT AUTO_INCREMENT PRIMARY KEY,
    noticia_id INT,
    usuario_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_curtida_noticia
		FOREIGN KEY (noticia_id)
        REFERENCES noticia(id)
        ON DELETE CASCADE,
	CONSTRAINT fk_curtida_usuario
		FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS favoritar(
	id INT AUTO_INCREMENT PRIMARY KEY,
    noticia_id INT,
    usuario_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favoritar_noticia
		FOREIGN KEY (noticia_id)
        REFERENCES noticia(id)
        ON DELETE CASCADE,
	CONSTRAINT fk_favoritar_usuario
		FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS imagem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    link TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE noticia ADD COLUMN imagem_capa VARCHAR(500) NULL AFTER conteudo;

-- ═══════════════════════════════════════════════════════════
-- Migração: catálogo estático (noticia.js + feed.js) -> banco
-- Gerado automaticamente a partir do conteúdo real dos PDFs.
-- Comentários, curtidas e favoritos NÃO são migrados: não existe
-- conteúdo real de comentário no site hoje (só um contador), e
-- curtida/favorito dependeriam de usuários reais que não existem.
-- Ambos nascem vazios e crescem com o uso real da plataforma.
-- ═══════════════════════════════════════════════════════════

-- 1) Ajustes de schema (rodar uma vez só)
ALTER TABLE noticia MODIFY COLUMN descricao VARCHAR(255) NOT NULL;
ALTER TABLE noticia ADD COLUMN autor_nome VARCHAR(150) NULL COMMENT 'Nome do autor original do texto, quando ele não é um usuário cadastrado na plataforma';
ALTER TABLE noticia ADD COLUMN arquivo_pdf VARCHAR(500) NULL COMMENT 'Caminho do PDF original, usado pelo visualizador em noticia.html';

-- 2) Usuário 'sistema' — dono técnico das notícias migradas.
-- Os autores reais (alunos que escreveram os textos) não são
-- usuários cadastrados na plataforma; o nome de cada um fica
-- preservado em noticia.autor_nome.
INSERT INTO usuario (nome, turma, email, rm, senha, tipo, descricao) VALUES ('Acervo Conecta Jovem', 'N/A', 'acervo@conectajovem.local', 0, '$2b$10$INVALIDO.NAO.PODE.LOGAR.SENHA.DESATIVADA........', 'admin', 'Conta técnica usada para atribuir notícias migradas do acervo estático. Não deve ser usada para login.');

SET @acervo_usuario_id = LAST_INSERT_ID();

-- 3) Notícias (conteúdo extraído de verdade dos PDFs originais)
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Carta de Reclamação', 'Educação', 'Uma carta íntima sobre as expectativas, frustrações e esperanças de quem vive a educação brasileira por dentro.', 'Carta de Reclamação: Você é o pai/mãe de uma criança autista e deve escrever
uma carta dirigida à diretoria de uma escola particular. Seu texto deve
obrigatoriamente: a) contextualizar a ilegalidade da recusa de matrícula baseada na
deficiência; b) apresentar dois argumentos sobre os benefícios da inclusão para toda a
comunidade escolar; e c) solicitar a imediata revisão da postura da instituição sob
pena de denúncia aos órgãos competentes.




Salto, 11 de Maio de 2026

Prezada diretora,

      Venho por meio dessa carta, como mãe de uma criança com Transtorno
Espectro Autista (TEA), mostra minha indignação com essa recusa da matrícula
baseada na deficiência do meu filho. Tal atitude é ilegal, pois a legislação brasileira
garante o direito à educação inclusiva e a proibição de qualquer descriminação
baseada na deficiência do meu filho.

        Além de ser uma lei, a educação promove para essa comunidade escolar
valores tanto como respeito, empatia, e convivência com as diferenças, como
também, contribui com o crescimento pedagógico da própria escola que passa a
desenvolver práticas mais acessíveis e acolhedoras. Negar essa responsabilidade
significa restringir o direito do meu filho como cidadão, tirando a oportunidade dos
estudantes de aprender a conviver com a diferença na sociedade.

       Diante disso, solicito a revisão da decisão, considerando os aspectos éticos e
legais envolvidos, principalmente no que diz respeito ao direitos à educação inclusiva,
ao respeito às diferenças e ao cumprimento das leis que garantem que toda criança
tenho acesso à Escola sem sofrer discriminação. A exclusão de uma criança com
deficiência pode ser caracterizada como prática discriminatória, e ao impedir o acesso
do meu filho à escola, a instituição comete um ato que não apenas prejudicaria ele,
mas também contraria o compromisso social que se espera de um espaço
educacional. E esteja ciente de que se o meu filho tiver a matrícula recusada
novamente, irei procurar a Secretaria da Educação para falar sobre os direitos que meu
filho não está tendo dentro desse ambiente escolar e para delegar o ato de crime
cometido .

Atenciosamente,

Mãe do aluno.', 'images/notices/educacao/Laiz.png', 'Lais de Souza Vaz', 'educacao/laiz_vaz_carta_pessoal_educacao.pdf'); -- origem: educacao/laiz_vaz_carta_pessoal_educacao.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'MANIFESTO PELA EDUCAÇÃO INCLUSIVA', 'Educação', 'É preciso exigir mais do sistema. Este manifesto convoca estudantes, professores e famílias a lutarem por escolas melhores.', 'Manifesto: Você é representante de um Fórum de Educação Especial e deve escrever
um manifesto dirigido ao Ministério da Educação. Seu texto deve obrigatoriamente: a)
contextualizar as barreiras arquitetônicas e pedagógicas nas escolas públicas; b)
apresentar dois argumentos sobre a importância do investimento em salas de recursos
multifuncionais; e c) exigir o cumprimento das metas de acessibilidade do Plano
Nacional de Educação.



                      MANIFESTO PELA EDUCAÇÃO INCLUSIVA

        Nós, representantes do Fórum de Educação Especial demonstramos nossa
imensa decepção acerca das barreiras arquitetônicas e pedagógicas ainda presentes
nas escolas públicas pelo Brasil. A falta de rampas, banheiros acessíveis, livros em
braile e materiais mais individualizados escancara a desigualdade educacional dentro
do ambiente escolar, visto que, de acordo com a Constituição, crianças com
condições especiais têm o direito a uma educação inclusiva.

       Para isso, a implementação de salas de recursos multifuncionais é
fundamental, já que existem diversos estudantes que não conseguem
verdadeiramente acessar e desfrutar de todos os ambientes dentro da escola. Essa
falta de acesso a espaços escolares, além de injusta, indiretamente exclui alunos com
deficiência de terem a oportunidade de socialização plena, tendo em vista que, muitas
vezes, eles não conseguem estar no mesmo ambiente que outras crianças.

      Além disso, o currículo escolar deve ser modificado a fim de atender as
necessidades de todos os estudantes. Não exigimos uma educação facilitada, porém,
entendemos que não é possível que estes estudantes compreendam plenamente o
conteúdo escolar quando a aprendizagem é exclusiva e generalizada, causando uma
defasagem no aprendizado e tornando a escola uma simples estatística e não
cumprindo sua principal função de educar um indivíduo e prepará-lo para o mundo.
Pode-se chamar de educação um sistema que exclui justamente aqueles que mais
necessitam de apoio?

       A luta da educação inclusiva também favorece pais e professores, já que é
sabido por todos que é cansativo e difícil conviver com crianças que necessitam de
ajuda redobrada. Por isso, recursos facilitadores no dia a dia escolar são urgentes e
imensamente necessários.

       Por fim, exigimos que o Ministério da Educação cumpra as metas de
acessibilidade estabelecidas dentro do Plano Nacional de Educação. Por isso,
cobramos que medidas eficazes sejam tomadas o mais rápido possível, pois não
toleraremos mais a diferença clara entre a legislação vigente e a realidade de nossas
escolas brasileiras. Pelo direito à educação, lutaremos por uma aprendizagem que
seja plena para todos.



Representantes do Fórum de Educação Especial', 'images/notices/educacao/Leticia.png', 'Letícia Parentella Sanduchi', 'educacao/leticia_parentella-sanduchi_manifesto_educacao.pdf'); -- origem: educacao/leticia_parentella-sanduchi_manifesto_educacao.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Depoimento', 'Educação', 'Cada sala de aula carrega histórias invisíveis. Este depoimento revela o que os números do IDEB não conseguem contar.', 'NOME: María Julia Garnham Ferreira



Depoimento: Você é um estudante com deficiência visual e deve escrever um
depoimento dirigido aos colegas de escola. Seu texto deve obrigatoriamente: a) narrar
um episódio de superação de barreira física ou pedagógica; b) apresentar dois
argumentos sobre a importância da empatia e da amizade na jornada escolar; e c)
sugerir formas práticas de tornar o ambiente escolar mais acolhedor para todos.




Hoje venho através desse depoimento não apenas como o colega que vocês veem
circulando com a bengala pelos corredores, mas como alguém que compartilha os
mesmos sonhos e direitos que vocês. Em toda minha jornada escolar, minha
deficiência sempre foi um grande desafio, tanto no ambiente quanto com as pessoas.

No início da minha trajetória, existiram diversas barreiras para superar. Me lembro de
uma aula de Geografia em que a atividade consistia em pintar os estados do Brasil. Eu
ouvia meus colegas conversando e colorindo o mapa, porém, ao tocar aquela folha de
papel, me sentia completamente perdida, pois ela não tinha relevos que me
ajudassem a identificar o que era pedido. Alguns amigos, percebendo minha angústia,
fizeram texturizações com barbante, permitindo que eu passasse os dedos sobre o
mapa e realizasse a atividade. A partir daquele dia, as tarefas começaram a ser cada
vez mais adaptadas, graças a essa rede de apoio: meus amigos.

Esse momento, e muitos outros, me ensinou que, com o auxílio das amizades e da
empatia das pessoas, é possível mudar a visão da escola e torná-la mais inclusiva. Se
não fosse pela ajuda dos meus colegas, muitas atividades em sala de aula seriam
muito mais difíceis para mim. Percebi, a cada experiência, que empatia não é caridade,
mas sim a capacidade de compreender e apoiar quem enfrenta desafios diferentes dos
seus. Além disso, a amizade faz toda a diferença na jornada escolar, porque ninguém
deve se sentir sozinho dentro de um ambiente que deveria acolher todos igualmente.

Portanto, para que nosso ambiente escolar seja mais acolhedor, sugiro que haja a
adaptação de materiais didáticos para braille, garantindo mais autonomia aos
estudantes com deficiência visual. Também peço aos colegas que não deixem
mochilas espalhadas pelo chão, pois isso representa um grande risco de acidentes.
Pequenas atitudes podem parecer simples, mas fazem uma enorme diferença na
construção de uma escola mais inclusiva, acessível e humana. Conto com o apoio de
todos nessa caminhada.', 'images/notices/educacao/Maria_julia.png', 'Maria Júlia Garnham Ferreira', 'educacao/Maria_Julia_Garnham_Ferreira_Depoimento_Educação.pdf'); -- origem: educacao/Maria_Julia_Garnham_Ferreira_Depoimento_Educação.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Discurso', 'Educação', 'Educação não é privilégio, é direito — e este discurso não deixa ninguém esquecer disso.', 'Discurso: Você é uma professora de Libras e deve escrever um discurso dirigido aos
formandos de uma universidade. Seu texto deve obrigatoriamente: a) contextualizar a
barreira linguística enfrentada pela comunidade surda; b) apresentar dois argumentos
sobre a comunicação como direito humano fundamental; e c) desafiar os novos
profissionais a promoverem a acessibilidade em suas futuras carreiras.




       Queridos formandos e formandas, nesta noite nós comemoramos não apenas
um diploma, mas também uma oportunidade que vocês têm de mudar o mundo. Eu,
como professora de libras desta instituição, acompanhei cada passo a jornada de
vocês estudantes, as noites mal dormidas, o nervosismo e a ansiedade para a chegada
deste dia. No entanto, digo a vocês que o maior desafio que vocês irão enfrentar com
seus futuros alunos da comunidade surda será a barreira linguística no país.

Ao falar com vocês hoje, formandos, eu quero trazer uma reflexão que vai além da
universidade, ou seja, que vocês levem para seus alunos no futuro. Para muitas
pessoas surdas, algo tão simples quanto se comunicar ainda é um desafio imposto
pela sociedade. Alguns exemplos comuns são: sala de aula sem intérprete, no hospital
onde o paciente não consegue explicar o que sente, em uma loja que não é entendido
ou até em uma entrevista de emprego, em que a comunicação não é possível. Vocês,
como futuros professores dessas crianças e adolescentes, terão o desafio de enfrentar
uma das maiores barreiras vividas pela comunidade surda: a visão desatualizada de
que a surdez é o problema, quando, na realidade, a verdadeira dificuldade está na falta
de acessibilidade e na inadequação dos ambientes e da sociedade para acolher essas
pessoas de forma digna e inclusiva.

       Além disso, quando falamos em comunicação acessível, estamos falando de
um direito humano fundamental que sustenta outros direitos. Sem comunicação, não
há participação política ativa, acesso pleno à educação ou mesmo garantia de justiça.
Nesse cenário, o papel de vocês como cidadãos e futuros profissionais é essencial:
promover inclusão, conscientizar a sociedade e defender práticas que garantam
igualdade de oportunidades para a comunidade surda. Mais do que ensinar conteúdos,
vocês terão a missão de formar pessoas capazes de exercer plenamente sua
cidadania, em uma sociedade mais justa, acessível e respeitosa para todos.

       Para encerrar, deixo a vocês uma responsabilidade que começa agora:
transformar conhecimento em ação. Não basta entender a importância da
acessibilidade, é preciso colocá-la em prática no dia a dia e nas escolhas profissionais.
Em qualquer área, vocês podem ajudar a construir espaços mais inclusivos, onde a
comunicação deixa de ser uma barreira. O futuro depende das suas decisões,
escolham incluir e garantir que todos tenham voz e espaço.', 'images/notices/educacao/Sofia.png', 'Sofia Marcolongo dos Santos', 'educacao/sofia_marcolongo_dos_santos_discurso_educacao.pdf'); -- origem: educacao/sofia_marcolongo_dos_santos_discurso_educacao.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Discurso Soberania Nacional', 'Política', 'O que significa ser soberano hoje? Um discurso contundente sobre autonomia nacional e os desafios da geopolítica contemporânea.', 'NOME: Emanuely Macedo Padovan
DATA: 11/05/2026




Prezados alunos desta instituição,

        Não poderia iniciar este discurso senão destacando o quanto nosso país preservou uma tradição
diplomática pacifista e neutra no que se refere aos conflitos mundiais. Muitos aqui presente podem estar
imaginando: “Por que nosso ‘Brasil’ não se faz presente em conflitos ou discussões internacionais? Esse tipo
de engajamento pode trazer novos olhares ao país!” Entretanto, muitos ignoram que esse cenário é uma
estratégia para proteger interesses políticos e econômicos. Parece improvável? (pausa) Vamos ver.

        Primeiramente, como disse anteriormente, a tradição pacifista do país foi e é utilizada como estratégia
de proteção, porém o histórico expõe o contrário. Manter relações baseadas no diálogo e em negociações,
mantem um clima “amigável” no que tange às relações exteriores. E não faltam exemplos, vocês devem estar
acompanhando nos jornais que, no início do ano, o presidente dos Estados Unidos, Donald Trump, aplicou
tarifas comerciais de 50% em produtos nacionais. Um tempo após a imposição dessa medida, o presidente
Luís Inácio realizou alguns encontros com o presidente Trump sobre as tarifas, na intenção de mediar a
situação. Este ocorrido, além de ser um exemplo de defesa da soberania nacional, também demonstra como
problemas graves podem ser suavizados e até mesmo resolvidos através do diálogo, ou melhor dizendo, da
moral, seguindo valores que estão de acordo com a conduta humana.

        Além disso, o posicionamento neutro evita guerras e sanções agressivas para o Estado brasileiro. O
histórico de conflitos violentos que envolvem o país não é alarmante. Em conflitos externos, por exemplo a
guerra na Palestina, é mantida uma postura mediana. Não estar do lado de apenas algumas nações, em um
mundo totalmente dividido por polos ideológicos, mostra a abertura do país internacionalmente. Por isso, esse
tipo de posicionamento permite uma melhor relação política com outros países no âmbito da construção dos
blocos econômicos diversos.
       Dessa maneira, o Brasil pode mediar conflitos mundiais de forma exemplar as outras nações. Isso pode
ser dado exatamente pela maneira que o estado brasileiro defende o poder do diálogo e das negociações para
a resolução de desentendimentos ou sanções. Então, a dita “fragilidade” que muitos apontam para o país
funciona como uma máscara para disfarçar essa potência nacional.

       Obrigado a todos pela atenção!', 'images/notices/politica/Emanuely.png', 'Emanuely Macedo Padovan', 'politica/Emanuely_Macedo_Padovan_Discurso_SoberaniaNacional.pdf'); -- origem: politica/Emanuely_Macedo_Padovan_Discurso_SoberaniaNacional.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Carta Aberta Soberania Nacional', 'Política', 'Uma carta aberta dirigida aos líderes políticos: soberania começa nas decisões do dia a dia, não apenas nos discursos.', 'Nome: Lívia Hermano

Data: 11/05

Carta aberta à Organização das Relações Internacionais

Prezados senhores e senhoras presentes no Itamaraty,

Nós, estudantes de Relações Internacionais, viemos por meio desta carta expressar a
crescente preocupação com o posicionamento do Brasil diante das crises
humanitárias que se intensificam no cenário mundial. Historicamente, a postura do
país nos fóruns internacionais sempre foi neutra, buscando preservar e garantir maior
confiabilidade e estabilidade em suas relações no exterior. No entanto, essa falta de
posicionamento se torna inapropriada diante das recorrentes violações dos direitos
humanos presentes nos conflitos internacionais, assim, exigindo do país ações mais
assertivas diante do atual cenário global.

Em primeiro lugar, cabe dizer que, ao ignorar as inúmeras violências que ocorrem no
cenário internacional, mesmo que beneficie a diplomacia nas relações externas,
compromete sua influência para as outras nações e prejudica sua imagem no cenário
nacional. Ao escolher se permanecer neutro nas situações de crise humanitária, o
Estado brasileiro transmite uma mensagem de indiferença, comprometendo sua
credibilidade perante outros países e organismos internacionais. Dessa forma, torna-
se necessária uma postura mais assertiva em defesa da dignidade humana e da paz,
para que assim violações semelhantes não sejam relativizadas no contexto interno.

Além disso, também é possível destacar que a Constituição Federal brasileira
assegura princípios que devem orientar as relações internacionais do Brasil. Assim, ao
ignorar os conflitos e suas violências e violações de direitos contradiz os valores
defendidos pelo próprio Estado brasileiro. Com isso, o Brasil deve alinhar suas ações
aos princípios previstos pela Constituição e pelos Tratados Internacionais, para que
dessa forma contribua de maneira mais significativa na resolução de conflitos
exteriores.

Diante disso, ao tratar sobre os problemas acima citados, pedimos que a organização
incentive medidas que promovam uma postura mais participativa do Brasil no cenário
internacional, tais como a promoção de resoluções mais incisivas nos fóruns e
expansão de políticas de acolhimento para pessoas em situações de grande
vulnerabilidade. Dessa maneira, o país conseguirá fortalecer a defesa dos direitos
humanos para preservar a dignidade da pátria e garantir a paz entre outras nações,
além de colaborar para a construção de relações internacionais mais justas.

Em busca de melhorias,

                                              Estudantes de Relações Internacionais', 'images/notices/politica/Livia.png', 'Livia Hermano', 'politica/Livia_Hermano_Carta_Aberta_SoberaniaNacional.pdf'); -- origem: politica/Livia_Hermano_Carta_Aberta_SoberaniaNacional.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Depoimento Soberania Nacional', 'Política', 'Quando uma jovem decide se envolver com política, o que ela encontra? Um depoimento honesto sobre participação e decepção.', 'NOME: Yasmin Vitória do Nascimento Ramos, Nº32

DATA: 11/ 05/26



Depoimento: Você é um refugiado radicado no Brasil e deve escrever um depoimento
dirigido aos leitores da revista. Seu texto deve obrigatoriamente: a) narrar a jornada de
saída do país de origem e a chegada ao Brasil; b) apresentar dois argumentos sobre o
acolhimento brasileiro em contraste com o cenário global de xenofobia e c)
compartilhar sua percepção sobre a soberania nacional como um porto seguro para os
direitos humanos.



 Sabemos que dignidade é algo que qualquer pessoa tem, agora, aproveitar disso e
conseguir se expressar, já é outra história, afinal, milhares de pessoas morrem ao
demonstrar sua forma de pensar em relação ao seu país, e quem os reprime são
justamente aqueles escolhidos pela própria população para governar, e é sobre isso
que vim tratar aqui.

 Sou uma jovem Venezuelana de 24 anos, e precisei abandonar meus bens e meus pais
para que eu tivesse uma chance de recomeçar minha vida. Crescendo com os
mesmos dilemas de minha família, percebi que sendo autêntica você pode correr
riscos de vida. Escrevo isso para enfatizar a importância do diferente em sua vida e
para relembrá-los que todos temos direitos, civis, sociais e políticos.

 Eu achava que o conceito de liberdade fosse comum globalmente, mas pelo visto não
é uma realidade em todos os lugares do mundo. Precisei abrir mão de tudo que eu
tinha, minha família, emprego, casa, lugar de origem. A violência está crescendo
exponencialmente na Venezuela, decorrência da crise política causada pelo chavismo.

 Decidi me abrigar no Brasil, por possuir uma zona de fronteira em Roraima, o que
facilitou minha entrada no país. Escolhi morar no município de Pacaraima, ponto de
encontro mais comum entre os imigrantes, o que contribuiu com a minha adaptação
ao local. Além de que, o Brasil possui uma lei que favorece os imigrantes.

 Ademais, alguns países do continente Europeu, como Portugal ou Reino Unido, são
rigorosos em relação a entrada de imigrantes em seu território, devido a visões
preconceituosas e receio da interferência de estrangeiros em desejos internos. Muito
dessa restrição se dá por pressões econômicas, segurança e soberania nacional. O
que explica o aumento de queixas contra xenofobia nesses países nos últimos anos.

 Por fim, percebi que recomeçar não significa esquecer minhas raízes, mas encontrar
melhores condições de vida, onde você possa se expressar livremente. O Brasil me
forneceu estabilidade e o acolhimento necessário para mim naquele momento, além
do mais importante, esperança. Desejo que isso sirva de aprendizado para aqueles que
possuem uma visão de indiferença com o próximo e que, um dia, não seja mais preciso
que outros seres humanos passem por essa mesma situação, tendo seus direitos e
liberdades assegurados.', 'images/notices/politica/Yasmin.png', 'Yasmin Vitória do Nascimento Ramos', 'politica/Yasmin_Vitoria_do_Nascimento_Ramos_Depoimento_SoberaniaNacional.pdf'); -- origem: politica/Yasmin_Vitoria_do_Nascimento_Ramos_Depoimento_SoberaniaNacional.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'MANIFESTO DO COLETIVO DE ARTISTAS VISUAIS PARA AS PLATAFORMAS DIGITAIS', 'Tecnologia', 'Uma análise crítica sobre os limites éticos da inteligência artificial e os desafios do mundo digital para a nova geração.', 'MANIFESTO DO COLETIVO DE ARTISTAS VISUAIS PARA AS PLATAFORMAS
DIGITAIS
Nós, artistas visuais, queremos falar diretamente com as plataformas de inteligência artificial
e plataformas digitais que criam imagens. Diante do avanço do mundo digital, entendemos
que nem tudo é benéfico para todos, pois as IAs conseguem gerar imagens e vídeos em
poucos minutos, causando a desvalorização do trabalho de muitos artistas. Por isso, nós,
integrantes de um coletivo de artistas, exigimos respeito aos direitos autorais e uma
remuneração justa pelas obras utilizadas no treinamento de inteligências artificiais.

Nos dias de hoje, diversas IAs são utilizadas no mercado de trabalho, principalmente em
grandes empresas que buscam resultados rápidos e produtividade instantânea. Entretanto,
esse avanço da automatização tem substituído artistas criativos e colocado em risco o futuro
do trabalho humano. Muitas empresas preferem investir em tecnologias automáticas em vez
de valorizar a arte, a dedicação e a criatividade produzidas por pessoas reais.

Outro problema é que a sociedade está se acostumando com respostas imediatas e produções
instantâneas, o que enfraquece a criatividade humana e reduz a capacidade das pessoas de
pensar e criar soluções novas. Embora as inteligências artificiais ofereçam rapidez, nós,
artistas, carregamos sentimentos, emoções e experiências que nenhuma máquina consegue
reproduzir completamente. A arte possui alma, expressão e significado humano.

Diante dessa realidade, apresentamos nossa proposta:

   •   Exigimos que nenhuma obra artística seja utilizada em treinamentos de IA sem
       autorização do autor.
    • Defendemos a criação de sistemas de remuneração justa para artistas cujas obras
       forem usadas por plataformas digitais.
    • Pedimos leis mais rígidas para proteger os direitos autorais no ambiente digital.
    • Queremos transparência das empresas sobre quais conteúdos são usados para
       alimentar inteligências artificiais.
    • Defendemos a valorização da arte humana nas escolas, empresas e redes sociais.
    • Acreditamos que a tecnologia deve servir como apoio aos artistas, e não como
       substituição do trabalho criativo humano.
Portanto, não aceitaremos uma sociedade que ignore o valor da arte e permita o uso
irresponsável de imagens e obras sem autorização. Continuaremos lutando até que artistas
recebam reconhecimento, respeito e remuneração justa pelas suas criações.

Coletivo de Artistas Visuais', 'images/notices/tecnologia/Anthero.png', 'Anthero Franco Sprana', 'tecnologia/Anthero_Franco_Sprana_Manifesto_Ia_e_Etica_Digital.pdf'); -- origem: tecnologia/Anthero_Franco_Sprana_Manifesto_Ia_e_Etica_Digital.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Discurso - Cybercrime', 'Tecnologia', 'Os crimes digitais crescem em ritmo acelerado — e os jovens estão na linha de frente tanto como vítimas quanto como protagonistas da mudança.', 'Discurso - Cybercrime

DISCURSO

É visível como a tecnologia se tornou algo muito amplo em nossa vida, seja na área de
trabalho, lazer e comunicação. Porém, as redes sociais nos deixam muito expostos ao
público em geral, onde, na maioria das vezes, conseguir uma foto sua ou até mesmo
informações pessoais não se torna algo tão difícil na atualidade.




Mas o grande problema nisso são as pessoas mal-intencionadas, que expõem a imagem dos
outros, fazendo montagens e comentários ofensivos, machistas e racistas. No contexto atual,
é perceptível como o racismo vem se tornando algo comum, quando, na verdade, esse crime
deveria ser combatido com mais seriedade. Muitas vezes, as vítimas acabam ficando
abaladas emocionalmente, prejudicando sua saúde mental e psicológica.

Além do racismo, outros crimes virtuais também precisam ser combatidos e denunciados.
Entretanto, é visível que algo precisa ser feito para que esses tipos de crimes tenham fim de
uma vez por todas.
Devemos promover mais segurança nas redes sociais, criar meios de verificação de idade
para proteger crianças e adolescentes e aplicar punições mais severas para quem cometer
crimes virtuais. Além disso, instituições devem acolher e ajudar as pessoas que sofreram
esses atos, garantindo segurança e bem-estar para todos.', 'images/notices/tecnologia/Enzo.png', 'Enzo Thomaz de Jesus', 'tecnologia/Enzo_Thomaz_de_Jesus_Discurso_Cybercrime.pdf'); -- origem: tecnologia/Enzo_Thomaz_de_Jesus_Discurso_Cybercrime.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Carta aberta aos desenvolvedores do ChatGPT', 'Tecnologia', 'Uma carta aberta para quem desenvolve, regula e usa inteligência artificial: precisamos de ética antes de velocidade.', '11 de maio de 2026.

Carta aberta aos desenvolvedores do ChatGPT.

Prezados desenvolvedores,

       Sou professor do Ensino Médio e trabalho diariamente com essa nova realidade
educacional marcada pela presença constante das inteligências artificiais, muitas
pessoas utilizam a IA para pesquisas, trabalhos e atividades escolares. Apesar de ser
uma ferramenta útil, seu uso excessivo pode contribuir para a passividade cognitiva
dos jovens e para o fenômeno conhecido como brain rot, que está relacionado ao
consumo exagerado de conteúdos rápidos e à diminuição da capacidade de reflexão.

       Atualmente, um dos principais problemas é que muitos estudantes passam a
depender de algoritmos inteligentes para realizar tarefas completas, sem desenvolver
o próprio pensamento crítico. Dessa forma, deixam de praticar habilidades
importantes, como interpretação, argumentação e raciono lógico.

       Além disso, pode ser citado outro fenômeno muito recorrente em quem utiliza, o
qual o usuário acha que entende do assunto produzido pelo sistema, quando na
verdade só reconhece o conteúdo superficialmente, criando a falsa sensação de
aprendizado. Muitas vezes, o estudante não procura realmente saber o que é pedido,
apenas deseja a resposta de forma prática e rápida, típicas dessas redes.

       Por esse motivo, acredito que seja importante criar diretrizes éticas para o uso
educacional das inteligências artificiais, como indicação de textos motivacionais e
explicação nas respostas geradas, além, do uso do ChatGPT ser somente como
ferramenta de apoio aos estudos, incentivando a aprendizagem, a pesquisa e o
raciocínio dos alunos, e não como substituição do esforço intelectual.

       Assim, espero que os desenvolvedores continuem aprimorando essa tecnologia
de forma responsável, para que ela contribua positivamente para a educação e para a
formação crítica dos estudantes, assim, os usuários chegaram na resposta com a
própria capacidade.

Atenciosamente,

Professor do Ensino Médio', 'images/notices/tecnologia/Pietro.png', 'Pietro Guedes de Oliveira', 'tecnologia/Pietro_Guedes_de_Oliveira_CartaAberta_IAeEticaDigital.pdf'); -- origem: tecnologia/Pietro_Guedes_de_Oliveira_CartaAberta_IAeEticaDigital.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Depoimento', 'Tecnologia', 'Um relato pessoal de quem viveu as consequências do crime digital e decidiu transformar a experiência em alerta coletivo.', 'Nome: Thiago Tavares de Melo | N° 29 | 3° Ano A



Depoimento: Você é uma jovem vítima de cibercrime e deve escrever um
depoimento dirigido aos seguidores de uma rede social. Seu texto deve
obrigatoriamente: a) relatar o impacto emocional de ter sofrido um golpe de voz
clonada; b) apresentar dois argumentos sobre a vulnerabilidade digital no Brasil; e c)
alertar o público sobre medidas de segurança pessoal.



Pessoal, eu nunca imaginei que viria aqui falar sobre cibercrime, mas é algo que deve
ser compartilhado. Na verdade, nunca passou pela minha cabeça que esse tipo de
coisa aconteceria comigo. Há algumas semanas, minha família recebeu uma ligação
com meu rosto e minha voz, meus pais perderam R$470,00 nesse dia. E poderia ter
sido mais, mas o ponto é que roubaram uma parte minha, a minha voz. Não sei se
consigo expressar a gravidade do ocorrido, mas algo tão pessoal, tão meu, foi tirado de
mim e usado para o mau da minha própria família.

No mesmo dia do golpe, recebi uma mensagem da minha mãe no grupo da família, ela
estava me perguntando se eu recebi o dinheiro que ela tinha me mandado e o porquê
não a respondia mais no privado. Foi nesse momento, quando descobri, que me senti
extremamente injustiçada e impotente, posso até dizer que foi uma violação, na
verdade foi o que senti, eu fui violada, humilhada. Depois desse dia, eu perdi meu
chão, estou paranoica e com receio de usar as redes sociais, não sei onde meus dados
estão seguros. Essa experiência foi horrível, e me mostrou a situação precária da
segurança virtual no Brasil, já que infelizmente a tecnologia cresce mais rápido que as
medidas de segurança contra ela.

Depois do que eu passei, minha obrigação como cidadã é vir aqui, mesmo me
expondo, para deixar um alerta para vocês. Não confiem em ligações, mensagens ou
qualquer outro tipo de interação\\comunicação virtual, pelo menos não logo de cara,
mesmo aparentando ser um contato familiar. Evitar o compartilhamento de dados
sensíveis é muito importante também. Para evitar que essa situação horrível aconteça
com outras pessoas é necessário que tenha uma propagação maior de informações
com o intuito de alertar e educar as pessoas sobre os perigos da internet, por meio de
anúncios, discursos e notícias vindos principalmente por parte do governo, mas
também de instituições de tecnologia como a META, ou até mesmo um relato como o
meu. Lembrem-se de serem cuidadosos e que ter cuidado nos dias de hoje nunca é
exagero, mas sim uma necessidade, acreditem, pois, aprendi da pior forma.', 'images/notices/tecnologia/Thiago.png', 'Thiago Tavares de Melo', 'tecnologia/Thiago_Tavares_de_Melo_Depoimento_Cybercrime.pdf'); -- origem: tecnologia/Thiago_Tavares_de_Melo_Depoimento_Cybercrime.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Carta de Reclamação', 'Saúde', 'Filas, descaso e falta de recursos: uma carta que denuncia o que muitos vivem mas poucos dizem em voz alta.', 'Carta de Reclamação: Você é um psicólogo organizacional e deve escrever uma carta
dirigida ao setor de RH de uma grande empresa. Seu texto deve obrigatoriamente:
a) contextualizar o aumento de casos de Burnout entre funcionários;
b) apresentar dois argumentos sobre a relação entre metas abusivas e adoecimento
psíquico; e c) propor a implementação de programas de bem-estar corporativo.




Salto, 30 de abril de 2026

Prezado líder do setor RH,

  Na qualidade de psicóloga Organizacional, venho por meio desta formalizar uma
preocupação crítica quanto saúde mental do nosso quadro de colaboradores.
Observamos que o Burnout deixou de ser um evento isolado para se tornar um
fenômeno coletivo dentro desta organização. Este aumento nos diagnósticos reflete
um esgotamento emocional dos trabalhadores do setor RH.

 Para compreender esse problema, é preciso destacar relações abusivas, pautada
entres dois conceitos: Controlar seu próprio comportamento, pois quando o esforço é
exigido a pessoa entra em um colapso submetem a motivação dos sintomas de
ansiedade, depressão e estresse agudo. O alto esforço no trabalho, quando uma
pessoa percebe que, independentemente de sua entrega, o seu esforço é elevado de
forma punitiva, desta forma traz um sentimento de injustiça organizacional que é o
principal desenvolvimento de síndromes de Burnout.

 Diante desse cenário, não basta tratar os sintomas, precisamos agir nas causas.
Proponho um programa de bem-estar corporativo que incluem: Delegacia Regional do
Trabalho, pois atua para fiscalizar empresas e orientar sobre o cumprimento das
normas jurídicas. A Política de Desconexão, trata- se de um estabelecimento de
protocolo de dados que protejam o tempo de descanso e a vida privada dos
funcionários.

 A preservação de Saúde Mental não é apenas uma questão ética, mas é um foco
estratégico para sustentabilidade da empresa. Coloco-me à disposição para detalhar o
plano de implementação dessas medidas.

No aguardo de uma breve resposta,

Ana Júlia Ribeiro Ferreira', 'images/notices/saude/Ana_Ribeiro.png', 'Ana Júlia Ribeiro Ferreira', 'saude/Ana_Júlia _Ribeiro_Ferreira-_Carta_de_Reclamação.pdf'); -- origem: saude/Ana_Júlia _Ribeiro_Ferreira-_Carta_de_Reclamação.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Discurso', 'Saúde', 'Falar sobre saúde mental ainda é tabu — mas este discurso quebra o silêncio com dados, histórias e urgência.', 'Proposta:
Discurso: Você é uma jovem influenciadora digital e deve escrever um discurso dirigido
a estudantes de uma escola pública. Seu texto deve obrigatoriamente: a)
contextualizar a tirania dos filtros e a busca pela perfeição nas telas; b) apresentar dois
argumentos sobre o impacto da pressão estética na autoestima juvenil; e c) convidar
os colegas a uma desconexão temporária e autocompaixão




Escrita:
Oie, seguidores!

Poderia começar esse discurso com aquela foto que todo mundo ama:
iluminação boa, angulo perfeito e aquele filtro ‘mara’ que suaviza tudo.
Mas talvez esse seja um dos motivos da realidade problemática da nossa
geração... a tentativa de moldar e manipular a realidade. Mas para quê?
Por curtida? Engajamento, será?
A gente vive cada vez mais em uma realidade virtual, onde tudo parece
perfeito, aesthetic, vida dos sonhos. Só que não é bem assim. Por trás
disso, existe todo um processo e não é só sobre a gente. Tem também
empresas e marcas que fazem parte disso, vendendo produtos, ideias e
estilos de vida como se fosse fácil e ‘tipo assim’... são totalmente fora
realidade.

Vivemos em um loop de dopamina onde cada curtida gera uma descarga
de dopamina, motivando a criar um ciclo vicioso de prazer ou gratificação
momentânea, criando a ansiedade e o medo da realidade.
Hoje não vim somente para uma reflexão dramática digna de filme teen
dos anos 90, mas também para um convite: Que tal vivenciarmos um “eu”
fora do padrão, curtir a ‘vibe’ ‘Natiruts’, Natureza, simplicidade, good
energies… bem zen chic, como se a paz interior tivesse um dress code.
     Chega de militância errada, vamos praticar a autocompaixão com
nós mesmos para retribuir ao nosso próximo, trazer o ‘feliz no simples’ em
ação e não se alienar às ideias das empresas.

Por isso é só, ‘entreguei horrores’ aqui já, né?
Até uma próxima!', 'images/notices/saude/Ana_Ferraz.png', 'Ana Júlia Correa', 'saude/Ana_Julia_Correa_discurso_saude-mental.pdf'); -- origem: saude/Ana_Julia_Correa_discurso_saude-mental.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Carta de Editorial', 'Saúde', 'Por que as escolas precisam incluir saúde mental no currículo? Um editorial que argumenta com dados e sensibilidade.', 'Texto de Apresentação: Você é o curador da seção "Mente Sã" e deve escrever um
editorial dirigido aos assinantes da revista. Seu texto deve obrigatoriamente: a)
contextualizar o tabu que ainda envolve a busca por terapia no Brasil; b) apresentar
dois argumentos sobre a importância de tratar a saúde mental como saúde pública; e
c) explicar como os artigos da seção ajudam na desmistificação do tema.
                          A busca por cura é um crime?

Nesta edição, mergulhamos nos tabus que cercam a busca por apoio psicológico no
Brasil. Enquanto muitos conseguem transitar pela vida com estabilidade, outros
enfrentam o peso do preconceito enraizado em estereótipos sobre a saúde mental.
Nas próximas páginas, você encontrará análises e depoimentos de quem vivencia os
estigmas impostos pela sociedade. Nosso objetivo com este editorial é quebrar essas
barreiras, permitindo que as pessoas se sintam à vontade para buscar a ajuda
necessária.

Para ilustrar essa visão distorcida, podemos recorrer ao filme “Deu a Louca na
Chapeuzinho”. Assim como na animação as personagens enxergam o Lobo como um
vilão nato — antes mesmo de conhecerem sua verdadeira história —, na vida real
ainda existem muitos julgamentos pré-existentes. Muitas vezes, quem busca terapias
ou tratamentos é visto de forma negativa, sendo alvo de isolamento e incompreensão,
quando, na verdade, a realidade do cuidado emocional é muito mais complexa e
humana do que o senso comum sugere.
Atualmente, percebe-se um movimento positivo: a população começou a tratar o tema
com mais relevância. No entanto, é preciso ir além. Devemos encarar a saúde mental
como uma questão de saúde pública, pois o acesso ao tratamento ainda esbarra na
desigualdade social. Hoje, os custos elevados impedem que pessoas sem renda ou
planos de saúde consigam o suporte adequado. Democratizar o acesso a psicólogos
não é apenas um ato de humanidade, mas um benefício para o próprio Estado, que
passa a ter cidadãos mais saudáveis e produtivos.

Deste modo, esta edição torna-se essencial por destacar o valor do equilíbrio
emocional e contrapor visões limitadas. Ao longo destas páginas, demonstramos o
papel fundamental do autocuidado, trazendo ainda a análise do filme citado como um
bônus para refletirmos sobre como as aparências e os preconceitos podem camuflar
a verdade.', 'images/notices/saude/Ana_Katy.png', 'Ana Katy Romão Vasconcellos', 'saude/Ana_Katy_Romão_Vasconcellos_Editorial_Saúde_Mental.pdf'); -- origem: saude/Ana_Katy_Romão_Vasconcellos_Editorial_Saúde_Mental.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Carta ao conselho universitário', 'Economia', 'Como a economia global afeta o bolso de uma família jovem? Uma carta pessoal sobre inflação, sonhos e reinvenção.', 'Carta ao conselho universitário



Salto,30 de Abril de 2026

Ao conselho Universitário,

Eu, estudante beneficiaria de cotas, venho por meio desta carta expressar minha
preocupação diante da redução das bolsas de auxílio estudantil. Como bolsista é
indispensável citar que a bolsa garante o ingresso e a continuidade na universidade, e
que, a possiblidade dessa redução desse recurso pode afetar muitos estudantes que
assim como eu dependem disso.



Nós, estudantes dependentes do auxílio, para estar na faculdade, não começamos a
ter dificuldades dentro da faculdade, mas antes dela, por exemplo quem tem a
necessidade de trabalhar, a falta de acesso a materiais de estudo e os altos custos de
transporte e alimentação. A bolsa ajuda esses alunos que moram longe da
universidade, e não podem pagar pelo transporte. A alimentação que faz parte da
saúde básica, pois garante a manutenção das funções físicas e cognitivas do
estudante, sendo necessário para a aprendizagem e permanência nas atividades
acadêmicas. Além do auxílio moradia, que oferece condições dignas de habitação aos
estudantes que precisam se deslocar de suas cidades de origem para frequentar a
universidade.



Diante disso, gostaria de pedir que as bolsas sejam mantidas e ampliadas , tanto em
questão de abrangência , ou seja, distribuir para mais pessoas, quanto aguentar o
valor, para garantir serviço de qualidade para os alunos. Assim, essa Ação equitativa
nivela ainda mais o direito á educação.



Agradecemos a Atenção.', 'images/notices/economia/Maria_Eduarda.png', 'Gabriela Domingues de Oliveira', 'economia/Gabriela_Oliveira_cartaPessoal_economia.pdf'); -- origem: economia/Gabriela_Oliveira_cartaPessoal_economia.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Manifesto pelo fim dos cortes na educação', 'Economia', 'Os jovens têm propostas para a economia do país. Este manifesto apresenta ideias concretas para um futuro mais justo.', 'Manifesto pelo fim dos cortes na educação
       Visto que a educação é essencial para a formação do caráter da população e
um direito garantido pela Constituição, nós, estudantes, manifestamos nossa
indignação diante dos cortes de verbas destinados às escolas públicas brasileiras.
Esses cortes prejudicam milhares de alunos e comprometem diretamente o futuro da
sociedade. Considerando que muitas instituições de ensino já enfrentam dificuldades
estruturais, falta de materiais e ausência de recursos tecnológicos, é necessário que
haja mais investimentos na educação. Além disso, diversas escolas precisam de
reformas, melhores condições de ensino e contratação de profissionais qualificados
para atender todos os estudantes.

      Entretanto, o corte de orçamento afeta principalmente os alunos da rede
pública, que dependem da escola para construir um futuro melhor. Muitos jovens
deixam de ter acesso a oportunidades importantes por causa da precariedade do
ensino. A falta de investimento também provoca desmotivação nos estudantes e
professores, dificultando ainda mais o aprendizado dentro das salas de aula.

       Outro problema causado pelos cortes é a desigualdade social, pois nem todos
possuem condições financeiras para buscar ensino de qualidade em instituições
privadas. Dessa forma, milhares de estudantes acabam prejudicados pela falta de
recursos nas escolas públicas. A educação deveria ser prioridade, já que é responsável
pela formação de cidadãos conscientes e preparados para a sociedade.

      Portanto, exigimos que o governo aumente os investimentos destinados à
educação brasileira, garantindo melhores estruturas escolares, acesso à tecnologia,
materiais adequados e valorização dos professores. Somente com uma educação de
qualidade será possível construir uma sociedade mais justa, desenvolvida e com
oportunidades para todos.



Ass: Líder Estudantil', 'images/notices/economia/Milena.png', 'Maria Eduarda Bertoli', 'economia/Maria_Eduarda_Bertolli_Da_Silva_Manifesto_Economia.pdf'); -- origem: economia/Maria_Eduarda_Bertolli_Da_Silva_Manifesto_Economia.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Depoimento', 'Economia', 'Crescer em meio à crise econômica molda perspectivas únicas. Um depoimento sobre resiliência e reconstrução financeira.', 'Proposta de Apresentação: Você é uma empreendedora da periferia que está dando
um depoimento pessoal para conseguir quebrar barreiras para ter crédito no banco.

Sou uma jovem de 18 anos que cresceu na periferia e vive uma situação difícil
diariamente. Por conta disso, tenho um bazar em casa e enfrento dificuldades para
manter meu negócio funcionando. Um dos maiores desafios é conseguir crédito no
banco, pois as exigências não consideram minha realidade. Pedem garantias, histórico
financeiro e documentos que muitas pessoas da periferia não possuem. Enquanto
isso, grandes empresas conseguem apoio com mais facilidade, e nós acabamos sendo
vistos apenas como um risco.

Mesmo diante dessas dificuldades, continuo tentando crescer e fazer meu negócio dar
certo com os poucos recursos que tenho. Acredito que essa situação poderia mudar se
os bancos revisassem seus critérios e oferecessem oportunidades mais justas para
pequenos empreendedores da periferia. Dessa forma, mais pessoas teriam condições
iguais para crescer, atender suas necessidades e realizar seus objetivos.

Morar e viver na periferia é algo muito difícil, principalmente para quem busca uma
condição financeira melhor. Muitas vezes, os investimentos não chegam até esses
bairros, e faltam oportunidades para quem deseja empreender. Meu bazar é pequeno,
mas representa minha fonte de renda e minha esperança de construir um futuro
melhor. Essa realidade não é apenas minha, mas também de muitas pessoas que
vivem na periferia e lutam diariamente para conquistar espaço e reconhecimento.
Por isso, é necessário que a sociedade e as instituições financeiras deem mais
atenção aos pequenos empreendedores das periferias, criando oportunidades e
oferecendo apoio para que eles possam crescer e transformar suas vidas.', 'images/notices/economia/Milena.png', 'Milena Hoppe Sales', 'economia/Milena_Hoppe_Sales_depoimentoPessoal_economia.pdf'); -- origem: economia/Milena_Hoppe_Sales_depoimentoPessoal_economia.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Discurso', 'Economia', 'Economia não é só para especialistas — é para todo cidadão que quer entender e transformar sua realidade.', 'Senhoras e Senhores deste fórum,

Hoje eu quero falar sobre a sub-representação racial nos cargos de liderança. Mesmo
com a população negra sendo grande parte da sociedade brasileira, ainda vemos
poucas pessoas negras ocupando cargos importantes em empresas, como gerentes,
diretores e executivos. Isso mostra que ainda existem desigualdades e dificuldades de
acesso às mesmas oportunidades.

Além de ser uma questão social, afeta a economia e o crescimento das empresas. O
primeiro ponto importante é que a diversidade étnica ajuda na inovação. Empresas
com pessoas de diferentes origens têm mais ideias, diferentes pontos de vista e
conseguem criar soluções mais criativas para os problemas. Isso faz com que as
empresas cresçam mais e entendam melhor a sociedade.

Outro ponto é a justiça econômica. Quando pessoas negras conseguem ocupar cargos
de liderança, há mais oportunidades, maior distribuição de renda e mais igualdade
social. Isso ajuda não apenas as famílias negras, mas também toda a economia do
país, porque mais pessoas passam a ter melhores condições de vida e consumo.

Por isso, é importante que os empresários assumam compromissos reais com a
inclusão. As empresas precisam criar metas de contratação afirmativa, investir em
programas de inclusão e dar oportunidades para que profissionais negros possam
crescer dentro das organizações.

Construir empresas mais diversas é construir um futuro mais justo, inovador e melhor
para todos.

Obrigado.', 'images/notices/economia/Maria_Eduarda.png', 'Nicoly Valaitis de Oliveira', 'economia/Nicoly_Valaitis-discurso-economia.pdf'); -- origem: economia/Nicoly_Valaitis-discurso-economia.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Manifesto dos trabalhadores contra a escala 6x1', 'Mundo do Trabalho', 'O mercado de trabalho mudou — mas as regras ainda são as mesmas de 50 anos atrás. Um manifesto por atualização urgente.', 'Proposta: Fazer um manifesto onde o contexto é que eu sou um representante de uma
Frente Parlamentar e Social e deve escrever um manifesto dirigido ao Governo Federal.
Seu texto deve obrigatoriamente: a) contextualizar a evolução das leis trabalhistas
desde a CLT; b) apresentar dois argumentos sobre o impacto positivo da redução de
jornada no consumo e na saúde pública; e c) convocar os trabalhadores para uma
mobilização nacional pela revisão das escalas de trabalho.



Manifesto dos trabalhadores contra a escala 6x1




A história das leis trabalhistas no Brasil foi uma conquista de todos os cidadãos,
principalmente porque vinhamos de um longo período de escravização e interna
desigualdade de acesso à cidadania. Elas nos permitiram obter os direitos básicos do
trabalho, porém, no contexto atual, onde o Brasil continua tendo as mesmas cargas
horárias de 1943(Ano da promulgação da CLT). Por isso, as nossas leis trabalhistas
devem ser revisadas a fim de atender os avanços do tempo e as novas demandas do
proletariado.

Primeiramente, pesquisas afirmam que com menos tempo de trabalho permitiria uma
melhora econômica no país, isso porque o indivíduo com mais tempo de folga significa
que irá frequentar lugares de lazer (como comércios) e consequentemente aumentará
seu consumo. Assim, a diminuição da escala da escala de trabalho permitirá o
aquecimento na economia e do mercado interno.

Além disso, já foi comprovado o aumento de produtividade em países com a escala de
trabalho reduzido (Holanda, Islândia, Bélgica, Alemanha). Também temos que
considerar saúde pública na pauta, isso porque a carga horaria longa pode
proporcionar casos de “burnout” (é um esgotamento físico e mental extremo causado
por estresse crônico no trabalho). Assim com a diminuição das cargas horarias, a
saúde dos indivíduos também melhora.

Diante dessa realidade, convocamos todos os trabalhadores e trabalhadoras do Brasil
para uma mobilização nacional em defesa de condições laborais mais justas e
humanas. Até quando o descanso será tratado como privilégio e não como direito?
Quantos brasileiros ainda precisarão sacrificar sua saúde para garantir o próprio
sustento? é hora de transformar indignação em ação. É hora de fazer da voz coletiva
um instrumento de mudança. Porque um país que valoriza o trabalho deve, acima de
tudo, valorizar o trabalhador.
Imagem:', 'images/notices/mundodotrabalho/Heitor.png', 'Heitor Barbosa dos Santos', 'mundodotrabalho/Heitor_Barbosa_dos_Santos_Manifesto_MercadoDeTrabalho.pdf'); -- origem: mundodotrabalho/Heitor_Barbosa_dos_Santos_Manifesto_MercadoDeTrabalho.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Depoimento', 'Mundo do Trabalho', 'Primeiro emprego, estágio, freelance: as múltiplas faces do jovem trabalhador brasileiro contadas em primeira pessoa.', 'Ser mãe solo e trabalhadora é carregar diariamente uma responsabilidade que
nunca acaba. Minha rotina começa antes mesmo do sol nascer. Acordo cedo
para organizar a casa, preparar o café, arrumar meu filho para a escola e deixar
tudo encaminhado antes de sair para o trabalho. Durante o expediente, mesmo
trabalhando, minha cabeça continua dividida entre as preocupações com
contas, alimentação, estudos e o bem-estar do meu filho. Quando volto para
casa, o trabalho não termina: ainda preciso limpar a casa, fazer comida, lavar
roupa, ajudar nas tarefas escolares e tentar oferecer carinho e atenção, mesmo
já estando extremamente cansada.

Essa dupla jornada faz com que seja muito difícil exercer a maternidade
plenamente. Muitas vezes, não consigo participar de momentos importantes da
vida do meu filho porque estou ocupada tentando garantir nosso sustento. Além
disso, a falta de apoio emocional, financeiro e até familiar aumenta ainda mais o
peso dessa responsabilidade. Também é difícil manter uma vida social e um
convívio saudável, porque quase todo o tempo é dedicado ao trabalho e às
obrigações de casa.

Por isso, acredito que a sociedade e o governo precisam olhar com mais
atenção para as mães solo. É necessário investir em políticas públicas que
garantam creches acessíveis, melhores condições de trabalho, jornadas mais
flexíveis e auxílio financeiro para mulheres que sustentam seus filhos sozinhas.
Essas medidas não seriam privilégios, mas formas de garantir dignidade,
segurança e melhores oportunidades tanto para as mães quanto para as
crianças.', 'images/notices/mundodotrabalho/Heitor.png', 'João Marcos Ferreira Benevides', 'mundodotrabalho/Joao_Marcos_Depoimento_MercadoTrabalho.pdf'); -- origem: mundodotrabalho/Joao_Marcos_Depoimento_MercadoTrabalho.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Carta Pessoal', 'Mundo do Trabalho', 'Trabalhar seis dias e folgar um: o que essa escala faz com o corpo, a mente e a vida social dos trabalhadores jovens?', 'Proposta: Você é um jovem trabalhador do setor de telemarketing que enfrenta
  diariamente uma rotina de alta pressão psicológica e metas rígidas. Representa uma
   classe que sofre com o isolamento social e o esgotamento, sentindo-se mais como
         uma peça de uma engrenagem do que como um cidadão com direito ao lazer.



Senhor Presidente do Sindicato

Como cidadão e trabalhador da área de telemarketing, redijo esta carta para expressar
minha profunda preocupação com o desgaste físico e mental causado pela escala de
trabalho 6x1. Eu e meus colegas estamos ficando cada vez mais exaustos e sem tempo
livre para conviver com nossas famílias ou cuidar da nossa saúde.

Em nosso único dia de descanso, muitas vezes preferimos permanecer em casa para
recuperar as energias, pois o cansaço acumulado ao longo da semana é excessivo.
Essa rotina afeta diretamente nossa saúde física e emocional, além de prejudicar
nossa qualidade de vida.

Temos apenas quatro dias de descanso por mês, o que é insuficiente para uma
recuperação adequada. Não falo apenas por mim, mas em nome de diversos
trabalhadores brasileiros que sofrem diariamente com jornadas cansativas e
desgastantes.

Por isso, peço uma reconsideração sobre a redução da carga de trabalho excessiva
semanal, buscando condições mais dignas e humanas para os trabalhadores.

Espero que esta situação seja analisada com atenção e responsabilidade, para que os
trabalhadores possam ter melhores condições de vida, saúde e convivência familiar.

Atenciosamente,

Mateus Lopes Ferreira', 'images/notices/mundodotrabalho/Vinícius_Assuncao.png', 'Mateus Lopes Ferreira', 'mundodotrabalho/mateus_lopes_ferreira_carta_escala6X1.pdf'); -- origem: mundodotrabalho/mateus_lopes_ferreira_carta_escala6X1.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'A redução da jornada de trabalho: o passo ao mercado de trabalho mais humano', 'Mundo do Trabalho', 'Uma análise editorial sobre as tendências do mercado de trabalho e o que os jovens precisam saber para se posicionar.', 'Proposta
Texto de Apresentação: Você é um colunista de mercado de trabalho e deve
escrever um editorial dirigido aos leitores da revista. Seu texto deve
obrigatoriamente: a) contextualizar a tendência global de redução da jornada
(semana de 4 dias); b) apresentar dois argumentos sobre como o bem-estar do
trabalhador aumenta a produtividade real; e c) apresentar o comparativo entre o
modelo brasileiro e exemplos internacionais de sucesso.




Texto
   A redução da jornada de trabalho: o passo ao mercado de trabalho mais
                                  humano
Nossa revista vem se posicionar publicamente, por meio deste editorial, a favor da
redução da jornada de trabalho no Brasil, uma pauta extremamente relevante, que
finalmente tem tomado conta de discussões públicas e incentivado protestos.

       Existem um Projeto de Emenda na Constituição (PEC) e um Projeto de Lei
(PL) em discussão no Congresso Nacional, visando diminuir a carga horária máxima
de trabalho no Brasil e o fim da escala 6x1. Estas, poderão ser duas grandes
conquistas para a melhora das condições do trabalhador no país e uma virada de
chave positiva para o mercado de trabalho. Por isso, nossa revista irá apresentar
argumentos a favor dessas propostas, e fazer parte dessa conquista histórica
brasileira como um meio jornalístico.

      O primeiro ponto a relatar é a melhora no bem-estar dos trabalhadores, que
atualmente trabalham com apenas um dia de descanso. Essa diminuição não
beneficia apenas a saúde física, dando aos empregados tempo de descanso
essencial ao corpo humano, como também à saúde mental, já que com mais
momentos de lazer e convivência com amigos, a mente é capaz de relaxar e
esquecer do estresse do trabalho.

       Além disso, a melhora na saúde dos trabalhadores não traz benefícios
apenas ao empregado, mas também, ao empresário. Isso por conta de o bem-estar
influenciar diretamente na produtividade do indivíduo, que com mais descanso fora
do trabalho, lhe resta mais energia física durante a semana útil. Assim, tanto a
qualidade quanto a quantidade dos seus serviços prestados serão maiores, e
mesmo trabalhando menos, trabalhará muito melhor.

       Para sustentar a redução da jornada de trabalho no Brasil, podemos analisar
os efeitos dela em outros países, que já seguiram essa tendência global. Governos
de nações como: Estados Unidos, Canadá, Alemanha e França, já diminuíram o
tempo máximo de trabalho semanal no mercado. E como vemos no cenário político
atual, eles permanecem sendo potências econômicas, com o avanço na construção
de um mercado de trabalho mais saudável.

       Em resumo, nossa revista irá continuar a expressar publicamente seu apoio a
um sistema econômico de trabalho mais humano, como com a redução da jornada e
o fim da escala 6x1, que busca melhor qualidade de vida e eficiência juntos. E
convidamos você, a fazer parte da história e protestar a favor das propostas, porque
o povo é a base da política.', 'images/notices/mundodotrabalho/Vinícius_Assuncao.png', 'Vinícius Assunção Santos', 'mundodotrabalho/Vinícius_Assunção_Santos_Editorial_MarcadoDeTrabalho.pdf'); -- origem: mundodotrabalho/Vinícius_Assunção_Santos_Editorial_MarcadoDeTrabalho.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'Depoimento', 'Violência', 'Testemunhar violência deixa marcas. Este depoimento corajoso expõe o que muitos preferem não ver nas cidades brasileiras.', 'Depoimento: Você é um ex-agente penitenciário e deve escrever um depoimento dirigido
aos leitores da revista. Seu texto deve obrigatoriamente a) narrar a experiência cotidiana
dentro de uma unidade prisional lotada; b) apresentar dois argumentos sobre a ineficácia do
sistema carcerário na ressocialização; e c) refletir sobre a necessidade de políticas de
desencarceramento.

   Eu, um ex-agente penitenciário, acredito que escrever sobre os anos que passei
monitorando pessoas presas em uma espécie de jaula, em um ambiente que a tensão era o
ar que respirávamos, tenho a visão de que falar sobre minha antiga rotina dentro da prisão
com superlotação é um assunto extremamente saturado em nossa sociedade. Analisar que
todos os dias eu portava uma chave carregada de desejo por aqueles que a viam,
chegando até a me dar uma espécie de angústia e aversão contra mim mesmo. As celas
eram como galerias, deixando a amostra todos os encarcerados e todo aquele
descontentamento em relação à falta de espaço. Aquela rotina era como um exercício de
equilíbrio constante, tentando garantir que os presos aproveitassem os poucos direitos que
tinham nas celas, enquanto o Estado os deixava à margem.

  Agora, parando para refletir, essa experiência me forçou a encarar a dura realidade da
completa ineficácia do sistema carcerário no que diz respeito à ressocialização. Primeiro, o
sistema prisional e a superlotação acaba transforma o presídio em uma "escola do crime",
apenas por causa da busca por sobrevivência; ao isolar o indivíduo em um ambiente
desgastante e degradante, o sistema o entrega às mãos das facções que ocupam o vácuo,
que o sistema deixa, oferecendo a proteção que o poder público nega. Segundo, a lógica da
punição baseada apenas na contenção física ignora o retorna à sociedade. Até porque, o
Estado garante sua vida na prisão, mas não garante a vida fora dela. Sem políticas públicas
concretas, trabalhos que poderiam ser garantidos para aqueles que acabam a pena, ou
suporte psicológico, o sistema apenas para a vida do sujeito por um período e, depois,
devolve-o às ruas com mais revolta e menos oportunidades, alimentando um ciclo vicioso
que vemos a anos.


  Todo este período me faz concluir que precisamos, urgentemente, de políticas públicas
em relação ao desencarceramento. É preciso entender que manter o modelo atual é
esquecer que estamos mexendo com vidas humanas. O desencarceramento não significa
impunidade, mas sim a aplicação estratégica de penas alternativas para crimes de baixo
potencial ofensivo e a revisão de prisões provisórias que superlotam as nossas unidades
sem julgamento. A segurança pública não se faz apenas construindo muros mais altos, mas
garantindo que o sistema penal seja a última medida para problemas que são, na raiz,
sociais e estruturais. Somente reduzindo a pressão dentro dos presídios é que poderemos
ver uma real melhora na vida dentro e fora das cadeias.', 'images/notices/violencia/Gabriela_Carnevali.png', 'Anna Viktoria Alacamini de Carvalho', 'violencia/Anna_Viktoria_Alacamini_de_Carvalho_depoimento_violência.pdf'); -- origem: violencia/Anna_Viktoria_Alacamini_de_Carvalho_depoimento_violência.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'CARTA ABERTA À SECRETARIA DE SEGURANÇA PÚBLICA', 'Violência', 'Uma carta de denúncia sobre as operações policiais nas periferias: quem protege, quem pune, e quem fica invisível.', 'Eixo 3: Violência (Segurança e Direitos Humanos)

Carta de Denúncia: Você é uma moradora de comunidade e deve escrever uma carta
dirigida à Secretaria de Segurança Pública. Seu texto deve obrigatoriamente: a)
contextualizar a interrupção de aulas devido a operações policiais; b) apresentar dois
argumentos sobre o impacto do trauma na aprendizagem infantil; e c) solicitar a
revisão dos protocolos de atuação policial em perímetros escolares.



CARTA ABERTA À SECRETARIA DE SEGURANÇA PÚBLICA

Salto, 30 de Abril de 2026.

Como moradora da comunidade, venho por meio desta carta expressar minha
preocupação, com a intensidade das ações policiais turbulentas em nosso território,
especialmente no horário de funcionamento da unidade escolar, embora reconheça
que as operações sejam necessárias para a segurança pública. Essas ações têm
provocado interrupções nas aulas, seja em razão da falta de segurança imediata ou
alunos e professores que não conseguem chegar na escola, por medo de serem
vítimas de bala perdida ou qualquer atividade policial que faça a população correr
perigo.

Como dito no início, tem causado impactos profundos no desenvolvimento dos
estudantes. Em primeiro lugar, os indivíduos em formação estão tendo exposição à
violência direta, como tiros, invasão e correria. Isso faz com que eles não consigam ter
concentração e assimilar os conteúdos na escola, por temerem pelas suas vidas. Em
segundo lugar, o medo recorrente e inseguranças causadas por essas turbulências, faz
com que os alunos não tenham interesses para ir à escola, atrasando o
desenvolvimento escolar dos alunos, podendo levá-los a buscar caminhos
inadequados, como a criminalidade. Dessa forma, a permanência na escola se torna
essencial para evitar esse cenário.

Deste modo, solicito a revisão dos protocolos de atuação policial próximos a escola,
para que a integridade física e emocional dos alunos seja priorizados, e que seja
garantido o direito de estudar. Assim, as operações policiais serão feitas em áreas
distantes da comunidade escolar, e ainda será protegido o perímetro da nossa
comunidade.

Atenciosamente,

                                                            Moradora da Comunidade.', 'images/notices/violencia/Elisa.png', 'Elisa Dias Sérgio', 'violencia/Elisa_Dias_Sergio_CartaDenúncia_OperaçõesPolicias.pdf'); -- origem: violencia/Elisa_Dias_Sergio_CartaDenúncia_OperaçõesPolicias.pdf
INSERT INTO noticia (usuario_id, titulo, genero, descricao, conteudo, imagem_capa, autor_nome, arquivo_pdf) VALUES (@acervo_usuario_id, 'A URBANIZAÇÃO SOCIAL GEROU AS FAVELAS?', 'Violência', 'Um texto de abertura que contextualiza os dados e histórias por trás dos índices de violência no Brasil contemporâneo.', 'Gabriela Carnevali Gonçalves Lima, nº 11 - 3º ano A

Texto de Apresentação: Você é um estudante de sociologia e deve escrever um
prefácio dirigido aos leitores da revista. Seu texto deve obrigatoriamente: a)
contextualizar as raízes históricas da violência urbana brasileira; b) apresentar dois
argumentos sobre a relação entre exclusão social e criminalidade; e c) antecipar ao
leitor as soluções discutidas na edição



A URBANIZAÇÃO SOCIAL GEROU AS FAVELAS?



Caro leitor,

Ao folhear esta edição, nosso objetivo não é proporcionar apenas uma coletânea de
dados, mas uma visão crítica do Brasil contemporâneo. A urbanização, tema central
deste número, trouxe consigo diversos impactos que podem ser compreendidos a
partir da observação de uma herança escravocrata e desigual do país. Esse passado
moldado a incertezas e preconceitos foi o primordial culpado da situação atual
brasileira. Os “problemas” que a cidade apresentava foram jogados às margens,
dando origem às áreas periféricas, que constantemente são vítimas de um poder
repressivo do Estado, mesmo que este se negue a garantir a cidadania.

Nesse cenário, é possível destacar duas causas principais para a situação
apresentada. Primeiro, observamos a erosão das redes de suporte comunitário: a
inexistência de projetos públicos eficazes para cultura, lazer e educação íntegros gera
um vazio institucional. Esse vácuo gerado pelo governo força a população a buscar
identidade e pertencimento em atividades ilícitas e atos criminosos, na procura de
fazer parte de um grupo. Segundo, observamos a violência como linguagem de
inserção. Em uma sociedade onde medimos a utilidade da população de acordo com
o poder de consumo, a desigualdade se torna um agravante crítico. Ao estabelecer
uma régua de patrimônio, a parcela não condizente ao “aceitável” recebe essa visão
desumanizada, característica do sistema Neoliberal, tornando-se negligenciada.
Jovens são obrigados a praticar atos criminosos, já que o Estado se nega a inseri-los
em contextos trabalhistas em razão de um preconceito cego e de desinstrução
educacional destes, causada pelo abandono estatal.

No entanto, essa revista se recusa a estagnar no pessimismo do diagnóstico. Nas
próximas páginas abordaremos meios de sanar essa realidade latente em nosso país.
Antecipamos discussões sobre o fortalecimento da segurança pública via inteligência
e perícia, além de projetos urgentes de urbanismo social que buscam minimizar a
disparidade do acesso público. Ainda discutiremos políticas públicas para a
reestruturação educacional de infantes, que é, talvez, a única maneira de extinguir
essa onda geracional de vulnerabilidade.
Desejo a você uma leitura inquietante e provocativa.', 'images/notices/violencia/Gabriela_Carnevali.png', 'Gabriela Carnevali Gonçalves Lima', 'violencia/Gabriela_Carnevali_Gonçalves_Lima_TextoDeApresentação_Violência.pdf'); -- origem: violencia/Gabriela_Carnevali_Gonçalves_Lima_TextoDeApresentação_Violência.pdf