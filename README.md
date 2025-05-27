# 🚗 Configuração do Projeto Vehicle Management (React + Java + Docker)

Este projeto é uma aplicação web com frontend em React, backend em Java (Spring Boot) e banco de dados rodando em Docker.

---

## 🛠 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Git](https://git-scm.com/downloads) (para clonar o projeto)
- [Docker](https://www.docker.com/get-started) (para rodar o banco de dados)
- [Java JDK 17](https://adoptium.net/) (para rodar o backend)
- [Node.js](https://nodejs.org/) (para rodar o frontend)

Se não tiver instalado algum deles, acesse os links acima e faça a instalação.

---

## 🚀 Passos para Configuração

### 1️⃣ Clonar o Repositório

Abra o terminal (Prompt de Comando, PowerShell, Terminal do Mac/Linux) e digite:

```sh
git clone https://github.com/Dre1y/vehicle-management.git
cd vehicle-management
```

### 2️⃣ Subir o container para o Banco de dados

Dentro do projeto, em um terminal:

```sh
cd api/docker
docker compose up -d --build
```

### 3️⃣ Instalar Dependências do Java

Saindo da pasta docker e entrando na pasta da API:

```sh
cd ../
mvn install
```

### 4️⃣ Iniciar a API

Ainda dentro da pasta /api no terminal:

```sh
mvn spring-boot:run
```

As tabelas serão criadas e dados iniciais inseridos no banco automaticamente.

### 5️⃣ Instalar Dependências do React

Para entrar na pasta do Client, deixe o terminal anterior aberto rodando a API e abra um novo:

```sh
cd client
npm install
```

### 6️⃣ Iniciar a Aplicação

Ainda dentro da pasta /client no terminal:

```sh
npm run dev
```

Disponível em:

```sh
http://localhost:5173
```

Acesse pelo navegador colando o link acima ou diretamente pelo terminal.

### 7️⃣ (Opcional) Visualizar rotas da API através do Swagger

Disponível em:

```sh
http://localhost:8080/swagger-ui.html
```

## 🎯 Padronização de Commits

Para manter um histórico organizado e compreensível, segui a convenção abaixo ao realizar commits:

| Tipo         | Descrição                                                           |
| ------------ | ------------------------------------------------------------------- |
| **feat**     | Adiciona uma nova funcionalidade                                    |
| **fix**      | Corrige um bug                                                      |
| **refactor** | Refatoração de código sem alterar funcionalidades                   |
| **chore**    | Mudanças que não afetam o código-fonte ou testes (ex: dependências) |
| **style**    | Ajustes de formatação e estilo do código                            |

Tudo pronto! 🚀
