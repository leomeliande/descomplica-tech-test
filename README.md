# 📚 Descomplica Flow - Sistema de Gerenciamento de Alunos

[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-e535ab?logo=graphql)](https://www.apollographql.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-13aa52?logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ed?logo=docker)](https://www.docker.com/)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

API GraphQL em Node.js + UI em React para gerenciamento de alunos com CRUD completo.

**Tech:** Node.js • TypeScript • GraphQL • React • MongoDB • Docker • ESLint • Prettier

---

## ✨ Destaques

- 🚀 **Full Stack Moderno:** GraphQL API + React UI
- 🏗️ **Arquitetura Limpa:** Atomic Design + Type-Safe
- ✅ **Code Quality:** ESLint 9+ + Prettier + TypeScript Strict
- 🧪 **Testes:** Jest (Backend) + Vitest (Frontend)
- 🐳 **Containerizado:** Docker + Docker Compose
- 📝 **Bem Documentado:** README + CONTRIBUTING
- 💾 **CRUD Completo:** Criar, ler, filtrar, atualizar e deletar alunos
- 🔐 **Type-Safe:** TypeScript em 100% do código

---

## 🚀 Quick Start

```bash
docker-compose up --build
```

- **Frontend:** http://localhost:5173
- **GraphQL:** http://localhost:3000/graphql

---

## 📋 Índice

1. [Quick Start](#-quick-start)
2. [Pré-requisitos](#-pré-requisitos)
3. [Arquitetura](#-arquitetura)
4. [Desenvolvimento Local](#-desenvolvimento-local)
5. [Scripts](#-scripts)
6. [API GraphQL](#-api-graphql)
7. [Code Quality](#-code-quality)
8. [Estrutura do Projeto](#-estrutura-do-projeto)
9. [Contribuindo](#-contribuindo)
10. [Troubleshooting](#-troubleshooting)

---

## 📦 Pré-requisitos

- **Node.js** 20+
- **npm** 10+ ou **yarn**
- **Docker** e **Docker Compose** (para containerização)
- **MongoDB** (incluído no docker-compose)
- **Git**

**Opcional:** MongoDB instalado localmente ou qualquer gerenciador de variáveis de ambiente

---

## 🏗️ Arquitetura

| Componente | Stack                                     |
| ---------- | ----------------------------------------- |
| Backend    | Node.js + Express + Apollo Server         |
| Frontend   | React + TypeScript + Vite + Apollo Client |
| Database   | MongoDB + Mongoose                        |
| Quality    | ESLint 9+ + Prettier + TypeScript         |
| Tests      | Jest (Backend) / Vitest (Frontend)        |

---

## 📊 API GraphQL

Acesse o Playground: **http://localhost:3000/graphql**

```graphql
# Listar alunos
query {
  students {
    data {
      _id
      nome
      cpf
      email
    }
    count
  }
}

# Filtrar por nome
query {
  students(nome: "João") {
    data {
      _id
      nome
      cpf
      email
    }
    count
  }
}

# Criar aluno
mutation {
  createStudent(nome: "Maria", cpf: "12345678901", email: "maria@example.com") {
    _id
    nome
  }
}

# Atualizar aluno
mutation {
  updateStudent(id: "ID", nome: "Novo Nome") {
    _id
    nome
  }
}

# Deletar aluno
mutation {
  deleteStudent(id: "ID")
}
```

---

## 💻 Desenvolvimento Local

### 1. MongoDB

```bash
# Docker
docker run -d -p 27017:27017 mongo:7.0

# Ou local
mongod
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
# http://localhost:3000/graphql
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

### Variáveis de Ambiente

**backend/.env**

```
DATABASE_URL=mongodb://localhost:27017/descomplica
NODE_ENV=development
PORT=3000
```

**frontend/.env**

```
VITE_API_URL=http://localhost:3000
```

---

## 🎯 Path Aliases (Frontend)

```typescript
// ❌ Evitar
import { Button } from "../../../atoms/Button";

// ✅ Usar
import { Button } from "@atoms/Button";
```

**Disponíveis:** `@atoms`, `@molecules`, `@organisms`, `@pages`, `@hooks`, `@graphql`, `@utils`, `@types`, `@styles`

---

## 🧬 Scripts

### Backend

```bash
npm run dev              # Desenvolvimento
npm run build            # Build
npm start                # Produção
npm test                 # Testes
npm run lint             # Verificar código
npm run lint:fix         # Corrigir código
npm run format           # Formatar
```

### Frontend

```bash
npm run dev              # Vite dev
npm run build            # Build produção
npm run preview          # Visualizar
npm test                 # Testes
npm run lint             # ESLint
npm run lint:fix         # Corrigir
npm run format           # Prettier
```

---

## 🧪 Code Quality

```bash
npm run lint             # Verificar
npm run lint:fix         # Corrigir
npm run format           # Formatar com Prettier
npm run format:check     # Verificar formatação
npm run typecheck        # Verificar tipos TypeScript
```

---

## 🧪 Testes

```bash
npm test                 # Rodar testes
npm run test:coverage    # Com cobertura
npm run test:watch       # Modo watch
```

---

## 🐳 Docker

### Comando principal

```bash
docker-compose up --build
```

### Comandos Úteis

```bash
# Status dos containers
docker ps

# Logs em tempo real
docker-compose logs -f

# Logs de um serviço específico
docker-compose logs -f backend

# Parar
docker-compose down

# Parar e remover dados
docker-compose down -v

# Rebuild
docker-compose up --build --no-cache
```

### Acessar Container

```bash
# Shell do backend
docker exec -it descomplica-backend sh

# Rodar comandos
docker exec descomplica-backend npm test
```

### Customizar Portas

Edite `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "3001:3000" # Mudar de 3000 para 3001

  frontend:
    ports:
      - "5174:5173" # Mudar de 5173 para 5174

  mongodb:
    ports:
      - "27018:27017" # Mudar de 27017 para 27018
```

Depois execute:

```bash
docker-compose up --build
```

---

## 📁 Estrutura do Projeto

```
descomplica-tech/
├── backend/                   # Node.js + Express + GraphQL
│   ├── src/
│   │   ├── app.ts             # Apollo Server + Express
│   │   ├── server.ts          # Server initialization
│   │   ├── resolvers/         # GraphQL resolvers
│   │   │   └── StudentResolver.ts
│   │   ├── database/          # MongoDB
│   │   │   ├── index.ts       # Connection
│   │   │   └── schema.ts      # Mongoose schema
│   │   ├── graphql/           # GraphQL schema
│   │   ├── types/             # TypeScript types
│   │   ├── constants/         # String constants
│   │   └── utils/             # Utilities
│   ├── tests/                 # Jest tests
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── components/        # Atomic Design
│   │   │   ├── atoms/
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   ├── pages/
│   │   │   └── templates/
│   │   ├── graphql/           # Apollo queries/mutations
│   │   ├── hooks/             # Custom hooks
│   │   ├── routes/            # Rotas
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Utilities
│   │   └── styles/            # SCSS with design tokens
│   ├── __tests__/             # Vitest tests
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── CONTRIBUTING.md            # Commit guidelines
└── README.md
```

---

## 🤝 Contribuindo

Quer contribuir com melhorias? Excelente! 🎉

Leia o [CONTRIBUTING.md](./CONTRIBUTING.md) para:

- ✅ Como fazer commits com Conventional Commits
- ✅ Workflow de desenvolvimento
- ✅ Padrão de Pull Requests
- ✅ Boas práticas

**TL;DR:**

```bash
# 1. Fork e clone
git clone https://github.com/seu-usuario/descomplica-tech.git

# 2. Criar branch
git checkout -b feature/sua-feature

# 3. Commit com padrão
git commit -m "feat(backend): descrição do que foi feito"

# 4. Push e PR
git push origin feature/sua-feature
```

---

## 🆘 Troubleshooting

### "Connection refused" ao conectar MongoDB

```bash
# Aguarde 30 segundos - MongoDB está iniciando
# Verifique status:
docker ps

# Ver logs:
docker-compose logs mongodb
```

### Porta já em uso

```bash
# Encontrar processo na porta 3000
# Windows:
netstat -ano | findstr :3000

# Mac/Linux:
lsof -i :3000

# Matar processo (Windows)
taskkill /PID <PID> /F

# Ou mudar porta no docker-compose.yml (ver seção Docker acima)
```

### Erro ao build

```bash
# Limpar e rebuild
docker-compose down -v
docker-compose up --build --no-cache
```

### MongoDB não conecta

```bash
# Testar MongoDB
docker exec descomplica-mongodb mongosh --eval "db.adminCommand('ping')"

# Restart
docker-compose restart mongodb
```

---

## 🆘 Troubleshooting

| Problema                | Solução                                                                  |
| ----------------------- | ------------------------------------------------------------------------ |
| **Porta em uso**        | `lsof -i :3000` (Mac/Linux) ou `netstat -ano \| findstr :3000` (Windows) |
| **MongoDB não conecta** | `docker-compose logs mongodb` ou aguarde 30s                             |
| **API não responde**    | Verifique: `curl http://localhost:3000/graphql`                          |
| **Build falha**         | `docker-compose down -v && docker-compose up --build --no-cache`         |
| **Testes falhando**     | `docker exec descomplica-backend npm test`                               |

---

## 🤝 Contribuindo

Leia [CONTRIBUTING.md](./CONTRIBUTING.md) para:

- ✅ Padrão de Commits (Conventional Commits)
- ✅ Workflow de desenvolvimento
- ✅ Pull Requests

**TL;DR:**

```bash
git checkout -b feature/sua-feature
git commit -m "feat(frontend): descrição"
git push origin feature/sua-feature
```

---

## ⚡ Performance & Boas Práticas

### Backend

- ✅ Apollo Server com cache automático
- ✅ Mongoose com índices de database
- ✅ Validação em camadas (schema + resolvers)
- ✅ Error handling consistente

### Frontend

- ✅ React Router para navegação otimizada
- ✅ Apollo Client com refetchQueries para cache
- ✅ Atomic Design para componentes reutilizáveis
- ✅ Path aliases para imports limpos
- ✅ Design tokens centralizados em SCSS

### DevOps

- ✅ ESLint 9+ com flat config
- ✅ Prettier com formatação automática
- ✅ TypeScript com `strict: true`
- ✅ Docker multi-stage build
- ✅ Docker Compose para ambiente completo

---

## 📊 Cobertura de Testes

| Área     | Type                           | Cobertura             |
| -------- | ------------------------------ | --------------------- |
| Backend  | Jest + Supertest               | Testes de resolvers   |
| Frontend | Vitest + React Testing Library | Testes de componentes |
| E2E      | Manual                         | GraphQL Playground    |

---

## 👤 Autor

**Leonardo Meliande**

- GitHub: [@leomeliande](https://github.com/leomeliande)
- Projeto: Sistema de Gerenciamento de Alunos - Descomplica

---

## ✨ Requisitos Atendidos

### Proposta ✅

- [x] API em Node.js (GraphQL + Apollo Server)
- [x] Banco de dados de alunos (nome, CPF, email)
- [x] Listar alunos com filtros
- [x] UI em React para consumir API

### Requisitos Não-Funcionais ✅

- [x] SGBD implementado (MongoDB)
- [x] Projeto bem documentado
- [x] Instruções de execução claras

### Diferenciais ✅

- [x] Adicionar, editar e excluir alunos via UI
- [x] Commits específicos e detalhados
- [x] Testes automatizados
- [x] TypeScript em ambos frontend e backend
- [x] Containers Docker (backend, frontend, MongoDB)
- [x] Docker Compose para orquestração

---

## 🎓 O que aprender com este projeto

1. **Backend TypeScript/GraphQL**

   - Apollo Server setup e resolvers
   - MongoDB + Mongoose schema design
   - Validações e error handling
   - Testes com Jest

2. **Frontend React/TypeScript**

   - React Router para SPA
   - Apollo Client para GraphQL
   - Atomic Design pattern
   - Custom hooks reutilizáveis
   - Testes com Vitest

3. **DevOps & Quality**

   - Containerização com Docker
   - Setup com ESLint + Prettier
   - TypeScript strict mode
   - Git workflow com Conventional Commits

4. **Soft Skills**
   - Organização de código
   - Documentação
   - Boas práticas

---

**Desenvolvido com ❤️ para Descomplica**
