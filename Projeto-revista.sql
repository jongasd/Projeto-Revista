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
    categoria_id INT NOT NULL,
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
	Constraint fk_noticia_categoria
		foreign key (categoria_id)
        references categoria(id)
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

CREATE TABLE IF NOT EXISTS imagem(
	id INT AUTO_INCREMENT PRIMARY KEY,
    link text NULL
);