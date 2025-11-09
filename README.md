# 📚 Descomplica Flow - Sistema de Gerenciamento de Alunos

API GraphQL em Node.js com TypeScript + UI em React para gerenciamento de alunos.

**Desenvolvido com:** Node.js • TypeScript • GraphQL • React • MongoDB • Docker

---

## 🚀 Quick Start (30 segundos)

```bash
docker-compose up --build

# Abra no navegador:
# Frontend: http://localhost:5173
# GraphQL: http://localhost:3000/graphql
```

**Primeira vez:** Aguarde 2-3 minutos para inicializar.

---

## 📋 Índice

1. [Arquitetura](#-arquitetura)
2. [Instalação](#-instalação)
3. [Como Usar](#-como-usar)
4. [API GraphQL](#-api-graphql)
5. [Desenvolvimento Local](#-desenvolvimento-local)
6. [Testes](#-testes)
7. [Commits e Contribuição](#-commits-e-contribuição)
8. [Docker](#-docker)
9. [Contribuindo](#-contribuindo)
10. [Troubleshooting](#-troubleshooting)

---

## 🏗️ Arquitetura

| Componente          | Tecnologia                                     |
| ------------------- | ---------------------------------------------- |
| **Backend**         | Node.js + Express + TypeScript + Apollo Server |
| **Frontend**        | React + TypeScript + Vite + Apollo Client      |
| **Database**        | MongoDB + Mongoose                             |
| **Containerização** | Docker + Docker Compose                        |
| **Testes**          | Jest + Supertest (Backend) / Vitest (Frontend) |

---

## 📦 Instalação

### Pré-requisitos

- **Docker Desktop** (Windows/Mac) ou Docker + Docker Compose (Linux)
- Git

### Clonar Projeto

```bash
git clone <seu-repo>
cd descomplica-tech
```

---

## 🎯 Como Usar

### Com Docker (Recomendado ⭐)

```bash
docker-compose up --build
```

Acesse:

- **Frontend:** http://localhost:5173
- **GraphQL Playground:** http://localhost:3000/graphql
- **MongoDB:** localhost:27017

### Parar Containers

```bash
docker-compose down

# Com limpeza de dados:
docker-compose down -v
```

### Ver Logs

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

---

## 📊 API GraphQL

### Playground

Acesse: **http://localhost:3000/graphql**

### Exemplo: Listar Alunos

```graphql
query {
  students {
    data {
      _id
      nome
      cpf
      email
      createdAt
    }
    count
  }
}
```

### Exemplo: Filtrar por Nome

```graphql
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
```

### Filtrar por CPF

```graphql
query {
  students(cpf: "12345678901") {
    data {
      _id
      nome
      cpf
      email
    }
    count
  }
}
```

### Exemplo: Criar Aluno

```graphql
mutation {
  createStudent(
    nome: "Maria Silva"
    cpf: "12345678901"
    email: "maria@example.com"
  ) {
    _id
    nome
    cpf
    email
    createdAt
  }
}
```

### Exemplo: Atualizar Aluno

```graphql
mutation {
  updateStudent(id: "STUDENT_ID", nome: "Maria Santos") {
    _id
    nome
    updatedAt
  }
}
```

### Exemplo: Deletar Aluno

```graphql
mutation {
  deleteStudent(id: "STUDENT_ID")
}
```

### GraphQL com cURL

```bash
# Query
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ students { data { nome cpf email } count } }"
  }'

# Mutation
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createStudent(nome: \"João\", cpf: \"12345678901\", email: \"joao@example.com\") { _id nome } }"
  }'
```

---

## 💻 Desenvolvimento Local

### Sem Docker - Terminal 1: MongoDB

```bash
# Opção 1: Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Opção 2: MongoDB instalado localmente
mongod
# ou
brew services start mongodb-community  # Mac
sudo systemctl start mongod             # Linux
```

### Terminal 2: Backend

```bash
cd backend
npm install
npm run dev

# Roda em http://localhost:3000/graphql
```

### Terminal 3: Frontend

```bash
cd frontend
npm install
npm run dev

# Roda em http://localhost:5173
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

## 🧪 Testes

### Backend

```bash
cd backend

# Rodar testes
npm test

# Modo watch
npm run test:watch

# Com cobertura
npm run test:coverage
```

### Frontend

```bash
cd frontend

# Rodar testes
npm test

# Com cobertura
npm run test:coverage
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
├── backend/
│   ├── src/
│   │   ├── app.ts                    # Aplicação Express + Apollo
│   │   ├── resolvers/
│   │   │   └── StudentResolver.ts    # GraphQL resolvers
│   │   ├── database/
│   │   │   ├── index.ts              # Conexão MongoDB
│   │   │   └── schema.ts             # Mongoose schema
│   │   ├── services/
│   │   │   └── StudentService.ts
│   │   └── types/
│   │       └── index.ts
│   ├── tests/
│   │   └── students.test.ts
│   ├── Dockerfile
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── StudentForm.tsx
│   │   │   ├── StudentList.tsx
│   │   │   └── SearchFilter.tsx
│   │   ├── graphql/
│   │   │   ├── queries.ts            # GraphQL queries/mutations
│   │   │   └── client.ts             # Apollo Client config
│   │   ├── services/
│   │   │   └── api.ts                # API calls
│   │   └── types/
│   │       └── index.ts
│   ├── Dockerfile
│   ├── .env
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── docker-compose.yml
├── .gitignore
└── README.md (este arquivo)
```

---

## 🧬 Scripts Disponíveis

### Backend

```bash
npm run dev              # Servidor em desenvolvimento (hot reload)
npm run build            # Compilar TypeScript para dist/
npm start                # Iniciar servidor compilado
npm test                 # Executar testes
npm run test:watch       # Testes em modo watch
npm run test:coverage    # Cobertura de testes
npm run typecheck        # Verificar tipos TypeScript
npm run lint             # Executar ESLint
```

### Frontend

```bash
npm run dev              # Servidor Vite em desenvolvimento
npm run build            # Build para produção (dist/)
npm run preview          # Visualizar build localmente
npm test                 # Executar testes
npm run test:coverage    # Cobertura de testes
npm run lint             # Executar ESLint
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

### Testes falhando

```bash
# Dentro do container
docker exec descomplica-backend npm test

# Ou localmente
cd backend
npm install
npm test
```

### Frontend não consegue acessar API

```bash
# Verifique se GraphQL está rodando:
curl http://localhost:3000/graphql

# Verifique frontend .env
cat frontend/.env

# Restart containers
docker-compose restart
```

---

## ✅ Requisitos Atendidos

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

## 🚀 Próximos Passos

1. ✅ Clone o projeto
2. 👉 **Agora:** `docker-compose up --build`
3. 🎨 Acesse http://localhost:5173
4. 🧪 Teste as funcionalidades
5. 📝 Explore http://localhost:3000/graphql
6. 💾 Faça seus commits com padrão `feat:`, `fix:`, etc.

---

## 📞 Suporte

- Ver logs em tempo real: `docker-compose logs -f`
- Testar GraphQL: http://localhost:3000/graphql
- Verificar containers: `docker ps`
- Reset completo: `docker-compose down -v && docker-compose up --build`

---

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ para Descomplica**
