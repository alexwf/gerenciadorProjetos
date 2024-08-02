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

- **Listar Projetos**: Exibe todos os projetos com informações básicas, como nome, data de início e fim, percentual de conclusão e se o projeto está dentro do prazo ou atrasado.
- **Status do projeto**: O projeto estará atrasado caso a maior data final das atividades seja superior a data final do projeto
- **Percentual de conclusão**: É considerado o número de atividades finalizadas e sem finalizar;
- **Adicionar Projeto**: Permite a criação de um novo projeto através de um modal preenchendo os campos requeridos (nome, início, fim).
- **Excluir Projeto**: Remove um projeto da lista.

### Atividades

- **Listar Atividades**: Exibe todas as atividades de um projeto específico com nome, data de início e fim, e se a atividade encontra-se finalizada.
- **Adicionar Atividade**: Permite a criação de uma nova atividade através de um modal preenchendo os campos requeridos (nome, início, fim, finalizada?).
- **Excluir Atividade**: Remove uma atividade de um projeto.

## Instruções para Executar o Projeto

### Pré-requisitos

- Node.js (v12 ou superior)
- npm (v6 ou superior)
- MySQL (v5.7 ou superior)

### Passos

1. **Clone o repositório**

   ```bash
   git clone https://github.com/alexwf/gerenciadorProjetos.git
   cd gerenciadorProjetos
   ```

2. **Instale as dependências**

   ```bash
    cd backend
    npm install
    cd frontend
    npm install
    ```

3. **Configure o banco de dados MySQL**

    Acesse o MySQL e execute o procedimento no db/banco.sql
   
    As demais configurações de banco (host, user, password, client) podem ser ajustadas no arquivo: backend/src/config/knexfile.js   

5. **Inicie o servidor backend**

    ```bash
    cd backend
    npm run start
    ```

6. **Inicie o frontend**
    ```bash
    cd frontend
    npm run start
    ```

7. **Acesse o aplicativo**

    Abra o navegador e vá para http://localhost:3000.

### Conclusão

Este projeto demonstra a implementação de um gerenciador de projetos básico utilizando uma stack moderna de tecnologias web.
Ele serve como uma base sólida para futuros desenvolvimentos e melhorias, permitindo a adição de funcionalidades mais avançadas conforme necessário.
