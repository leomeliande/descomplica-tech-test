# Backend - API GraphQL de Alunos

API GraphQL em Node.js + TypeScript usando MongoDB para gerenciamento de alunos.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express.js** - Framework web
- **GraphQL** - API query language
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Jest** - Framework de testes

## 📁 Estrutura do Projeto

```
src/
├── app.ts                 # Configuração da aplicação Express
├── server.ts              # Ponto de entrada da aplicação
├── constants/
│   └── errors.ts          # Constantes de erro
├── database/
│   ├── index.ts           # Conexão com MongoDB
│   └── schema.ts          # Schema do Mongoose
├── graphql/
│   └── schema.ts          # Schema GraphQL
├── resolvers/
│   └── StudentResolver.ts # Resolvers GraphQL
├── types/
│   └── index.ts           # Tipos TypeScript
└── utils/
    ├── mappers.ts         # Funções de mapeamento
    └── validation.ts      # Validações de CPF/Email
tests/
├── mock.ts                # Mocks para testes
└── students.test.ts       # Testes da API
```

## 🔧 Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- MongoDB

### Instalação

```bash
cd backend
npm install
```

### Desenvolvimento

```bash
npm run dev  # Inicia em modo desenvolvimento
```

### Build

```bash
npm run build
npm start
```

## 📋 API GraphQL

### Endpoint

```
http://localhost:3000/graphql
```

### Queries Principais

#### Buscar alunos

```graphql
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
```

#### Criar aluno

```graphql
mutation {
  createStudent(
    nome: "João Silva"
    cpf: "12345678901"
    email: "joao@example.com"
  ) {
    _id
    nome
    cpf
    email
  }
}
```

### Validações

- **CPF**: Validação completa com dígitos verificadores
- **Email**: Formato válido
- **Campos obrigatórios**: nome, CPF, email
- **CPF único**: Não permite duplicatas

## 🧪 Testes

```bash
npm test                    # Executar testes
npm run test:coverage      # Testes com cobertura
npm run test:watch         # Testes em modo watch
```

**Cobertura:** 14 testes incluindo validações, CRUD e casos de borda.

## 📊 Scripts Disponíveis

| Comando                 | Descrição                      |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Desenvolvimento com hot-reload |
| `npm run build`         | Compilar TypeScript            |
| `npm start`             | Servidor de produção           |
| `npm test`              | Executar testes                |
| `npm run test:watch`    | Testes em modo watch           |
| `npm run test:coverage` | Testes com cobertura           |
| `npm run typecheck`     | Verificar tipos                |
| `npm run lint`          | Executar ESLint                |

## 🌐 Variáveis de Ambiente

| Variável       | Descrição         | Padrão                                |
| -------------- | ----------------- | ------------------------------------- |
| `DATABASE_URL` | URL MongoDB       | `mongodb://mongodb:27017/descomplica` |
| `NODE_ENV`     | Ambiente          | `development`                         |
| `PORT`         | Porta do servidor | `3000`                                |

## 🐳 Docker

```bash
# Construir imagem
docker build -t descomplica-backend .

# Executar
docker run -p 3000:3000 descomplica-backend
```

## 📈 Desenvolvimento

### Arquivos Importantes

- `src/graphql/schema.ts` - Definição do schema GraphQL
- `src/resolvers/StudentResolver.ts` - Lógica dos resolvers
- `src/utils/validation.ts` - Validações de CPF/Email
- `tests/students.test.ts` - Testes da API

### Adicionando Novos Campos

1. Atualizar `schema.ts` (GraphQL)
2. Atualizar `schema.ts` (Mongoose)
3. Atualizar resolvers
4. Atualizar testes

Para documentação completa da API, consulte o [README principal](../README.md).
