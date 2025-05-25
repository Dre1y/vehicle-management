# Configuração do Projeto React + Java + Docker

## 🚀 Passos para Configuração

### 1️⃣ Clonar o Repositório

```sh
git clone https://github.com/Dre1y/vehicle-management.git
cd vehicle-management
```

### 2️⃣ Subir o contâiner para o Banco de dados

```sh
cd api/docker
docker compose up -d --build
```

### 3️⃣ Instalar Dependências do Java

```sh
cd api
mvn install
```

### 4️⃣ Iniciar a API

```sh
mvn spring-boot:run
```

### 5️⃣ Instalar Dependências do React + Iniciar Aplicação

```sh
cd client
npm install & npm run dev
```

## 🎯 Padronização de Commits

Para manter um histórico organizado e compreensível, segui a convenção abaixo ao realizar commits:

| Tipo      | Descrição                                                           |
| --------- | ------------------------------------------------------------------- |
| **feat**  | Adiciona uma nova funcionalidade                                    |
| **chore** | Mudanças que não afetam o código-fonte ou testes (ex: dependências) |
| **style** | Ajustes de formatação e estilo do código                            |

Tudo pronto! 🚀
