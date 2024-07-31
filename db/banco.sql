-- 1. Criar o banco gerenciador_projetos
CREATE DATABASE gerenciador_projetos;

-- 2. Utilizar o banco criado
USE gerenciador_projetos;

-- 3. Criar a tabela PROJETO
CREATE TABLE projeto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL
);

-- 4. Criar a tabela ATIVIDADE
CREATE TABLE atividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_projeto INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    finalizada BOOLEAN,
    FOREIGN KEY (id_projeto) REFERENCES projeto(id)
);