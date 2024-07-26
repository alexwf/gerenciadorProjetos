CREATE DATABASE gerenciador_projetos;

USE gerenciador_projetos;

CREATE TABLE projeto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL
);

CREATE TABLE atividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_projeto INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    finalizada BOOLEAN,
    FOREIGN KEY (id_projeto) REFERENCES projeto(id)
);