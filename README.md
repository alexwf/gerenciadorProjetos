# Gerenciador de Projetos Alex

Este projeto é um gerenciador de projetos simples que permite aos usuários criar, visualizar e excluir projetos e adicionar e excluir atividades relacionadas aos projetos.

## Tecnologias Utilizadas

### Frontend

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Chakra UI**: Biblioteca de componentes para React que facilita a criação de interfaces responsivas e acessíveis.
- **Axios**: Biblioteca para fazer requisições HTTP.

### Backend

- **Node.js**: Ambiente de execução JavaScript do lado do servidor.
- **Express**: Framework para construção de aplicações web com Node.js.
- **Knex.js**: Construtor de consultas SQL para Node.js, compatível com vários bancos de dados.
- **MySQL**: Banco de dados utilizado para armazenar os dados do projeto.

## Funcionalidades

### Projetos

- **Listar Projetos**: Exibe todos os projetos com informações básicas, como nome, data de início e fim, e percentual de conclusão.
- **Adicionar Projeto**: Permite a criação de um novo projeto através de um modal.
- **Excluir Projeto**: Remove um projeto da lista.

### Atividades

- **Listar Atividades**: Exibe todas as atividades de um projeto específico.
- **Adicionar Atividade**: Permite a criação de uma nova atividade através de um modal.
- **Excluir Atividade**: Remove uma atividade de um projeto.

## Instruções para Executar o Projeto

### Pré-requisitos

- Node.js (v12 ou superior)
- npm (v6 ou superior)
- MySQL (v5.7 ou superior)

### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/gerenciador-projetos-alex.git
   cd gerenciador-projetos-alex
   ```

2. **Instale as dependências**

   ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Configure o banco de dados MySQL**

Acesse o MySQL e execute o procedimento no db/banco.sql

4. **Inicie o servidor backend**

    ```bash
    npm run start
    ```

5. **Inicie o frontend**
    ```bash
    npm run start
    ```

6. **Acesse o aplicativo**
Abra o navegador e vá para http://localhost:3000.

### Conclusão

Este projeto demonstra a implementação de um gerenciador de projetos básico utilizando uma stack moderna de tecnologias web.
Ele serve como uma base sólida para futuros desenvolvimentos e melhorias, permitindo a adição de funcionalidades mais avançadas conforme necessário.