## Funcionalidades Implementadas

### 1. Sistema de Avaliações (Reviews)
*   **Descrição:** Foi implementada uma nova tabela (`Reviews`) para permitir que usuários autenticados adicionem avaliações (nota e comentário) aos livros.
*   **Integração:** O backend possui rotas dedicadas para criar, listar e gerenciar as avaliações. O frontend exibe as avaliações na página de detalhes do livro e oferece um formulário para submissão.

### 2. Upload de Imagem de Capa do Livro
*   **Descrição:** Os usuários podem fazer o upload de uma imagem para ser a capa de cada livro.
*   **Integração:** O backend utiliza o **Multer** para receber e armazenar os arquivos no servidor, salvando apenas o caminho da imagem no banco de dados. O frontend exibe a capa nos cards e no formulário de edição.

### 3. Sistema de Favoritos
*   **Descrição:** Usuários autenticados podem marcar livros como favoritos.
*   **Integração:** Uma tabela de relacionamento (`Favorites`) gerencia a associação entre usuários e livros. O sistema oferece botões de favoritar/desfavoritar na interface e uma página dedicada ("Meus Favoritos") que lista apenas os livros marcados pelo usuário logado.

### 4. Tema Claro/Escuro (Dark/Light Mode)
*   **Descrição:** Implementação de um sistema de alternância de tema com persistência.
*   **Estilo:** O tema claro utiliza um esquema de cores **Rosa Pastel**, enquanto o tema escuro utiliza tons de **Verde e Preto**. A preferência do usuário é salva e mantida ao recarregar a página.

---

## Instruções para Execução do Sistema

### Pré-requisitos

*   Node.js (versão 18 ou superior)
*   npm (gerenciador de pacotes do Node.js)

### 1. Clonar o Repositório

```bash
git clone https://github.com/Yhas-04/LivrariaFinal.git
cd LivrariaFinal/livraria_node_http
```

### 2. Configuração e Execução do Backend

O backend utiliza **Express** e **SQLite** (o banco de dados será criado automaticamente).

```bash
# Navegue para o diretório do backend
cd livraria_node_http/backend

# Instale as dependências
npm install

# Inicie o servidor
npm start
```
O backend será iniciado em `http://localhost:3333`.

### 3. Configuração e Execução do Frontend

O frontend utiliza **React** com **Vite**.

```bash
# Navegue para o diretório do frontend
cd ../frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
O frontend será iniciado em `http://localhost:3000`.

A aplicação estará acessível em `http://localhost:3000`. O frontend está configurado para se comunicar com o backend através de um proxy no `vite.config.js`.

---

## Estrutura do Projeto

O projeto segue uma arquitetura modular:

*   `livraria_node_http/backend`: Contém toda a lógica do servidor, API REST, banco de dados e autenticação.
*   `livraria_node_http/frontend`: Contém a aplicação React, componentes, serviços e estilos.
*   `livraria_node_http/backend/uploads`: Diretório onde as imagens de capa são armazenadas.
*   `livraria_node_http/backend/src/database/livraria.db`: Arquivo do banco de dados SQLite (criado na primeira execução).
