# NodeJS com Express - Estudos Pessoais

Projeto para estudos iniciais com NodeJS usando o Express

## Criador

- [Gabriel Ribeiro Schmitt](https://github.com/gabrielschmitt1)

### Pré-Requisitos

Pré-requisitos:

- npm
- docker
- docker-compose
- jes

### Estrutura de pastas

- .github/workflows/tests : Contém a pipeline de testes rodando
- controllers : É responsável por receber as requisições do cliente e retornar as respostas adequadas.
- database : É responsável por toda a comunicação com o banco de dados.
- routes : É responsável por definir as rotas da aplicação e mapear as requisições dos clientes para os controllers correspondentes.
- services : É responsável por implementar a lógica de negócios da aplicação. Aqui, geralmente estão as funções que são chamadas pelos controllers para realizar operações específicas.
- validators : É responsável por validar as entradas do usuário antes que elas sejam processadas pela aplicação.
- sql : Possui o schema inicial do banco de dados usado no docker-compose
- tests : Possui os testes unitarios do sistema

### Subir banco de dados Postgres

Na raiz do projeto

- `docker-compose up -d`

### Instalar pacotes

Na raiz do projeto

- `npm install`

### Executar aplicação

Na raiz do projeto

- `npm start`

### Executar testes

Na raiz do projeto

- `npm test`
