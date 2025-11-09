# Frontend - UI em React

Interface web para gerenciar alunos consumindo a API GraphQL.

## 🚀 Tecnologias

- **React 18** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **Apollo Client** - Cliente GraphQL
- **Vitest** - Framework de testes
- **Testing Library** - Testes de componentes
- **Sass** - Pré-processador CSS
- **Lucide React** - Ícones
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Estrutura do Projeto

```
src/
├── main.tsx                    # Entrada da aplicação
├── App.tsx                     # Componente principal com providers
├── routes/
│   └── index.tsx               # Definição de rotas (React Router)
├── components/
│   ├── atoms/                  # Componentes base
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Toast/
│   ├── molecules/              # Componentes compostos
│   │   └── SearchFilter/
│   ├── organisms/              # Componentes complexos
│   │   ├── Header/
│   │   ├── Menu/
│   │   ├── StudentForm/
│   │   └── StudentList/
│   ├── pages/                  # Páginas (rotas)
│   │   └── Student/
│   │       ├── Edit.tsx
│   │       ├── New.tsx
│   │       └── StudentList/
│   └── templates/              # Templates de layout
│       └── App/                # Layout principal (header, footer)
├── graphql/
│   ├── client.ts               # Configuração Apollo Client
│   └── queries.ts              # Queries e mutations GraphQL
├── hooks/
│   ├── index.ts                # Exports
│   ├── useStudents.ts          # Hook para gerenciamento de alunos
│   └── useToast.tsx            # Hook e Provider para toasts
├── types/
│   └── index.ts                # Interfaces TypeScript (Student, ApiResponse)
├── utils/
│   ├── error.ts                # Tratamento e extração de erros
│   ├── formatting.ts           # Formatação (CPF, etc)
│   └── index.ts                # Exports
├── styles/
│   ├── index.scss              # Importação de estilos globais
│   ├── _fonts.scss             # Importação de fontes
│   ├── _functions.scss         # Funções SCSS (tokens)
│   ├── _globals.scss           # Reset e estilos base
│   ├── _helpers.scss           # Classes utilitárias
│   ├── _mixins.scss            # Mixins reutilizáveis
│   └── _tokens.scss            # Design tokens (cores, spacing, etc)
└── __tests__/
    ├── SearchFilter.test.tsx   # Testes da busca
    ├── StudentDetail.test.tsx  # Testes de detalhes
    ├── StudentForm.test.tsx    # Testes do formulário
    └── StudentList.test.tsx    # Testes da lista
```

## 🔧 Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- Backend rodando (porta 3000)

### Instalação

```bash
cd frontend
npm install
```

### Desenvolvimento

```bash
npm run dev  # Inicia em http://localhost:5173
```

### Build

```bash
npm run build
npm run preview
```

## 📋 Funcionalidades

- ✅ **Listar alunos** - Tabela com paginação
- ✅ **Filtrar alunos** - Por nome, CPF e email
- ✅ **Adicionar aluno** - Formulário com validação
- ✅ **Editar aluno** - Modal de edição
- ✅ **Deletar aluno** - Confirmação de exclusão
- ✅ **Validação em tempo real** - CPF e email
- ✅ **UI responsiva** - Mobile-friendly

## 🧪 Testes

```bash
npm test                    # Executar testes
npm run test:coverage      # Testes com cobertura
```

## 📊 Scripts Disponíveis

| Comando                 | Descrição                       |
| ----------------------- | ------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento     |
| `npm run build`         | Build para produção             |
| `npm run preview`       | Preview do build                |
| `npm test`              | Executar testes                 |
| `npm run test:coverage` | Testes com cobertura            |
| `npm run lint`          | Verificar code style (ESLint)   |
| `npm run lint:fix`      | Corrigir issues automaticamente |
| `npm run format`        | Formatar código (Prettier)      |
| `npm run format:check`  | Verificar formatação            |

## 🌐 Variáveis de Ambiente

| Variável       | Descrição          | Padrão                          |
| -------------- | ------------------ | ------------------------------- |
| `VITE_API_URL` | URL da API GraphQL | `http://localhost:3000/graphql` |

## 🎨 Qualidade de Código

### ESLint

Verificação de code style com suporte a React, React Hooks, TypeScript e Acessibilidade.

```bash
npm run lint        # Verificar issues
npm run lint:fix    # Corrigir automaticamente
```

**Configuração:** `eslint.config.js`

### Prettier

Formatação automática de código com regras consistentes.

```bash
npm run format       # Formatar todo o código
npm run format:check # Verificar formatação
```

**Configuração:** `.prettierrc`

## 📍 Path Aliases

Imports simplificados usando aliases configurados no `tsconfig.json`:

```typescript
// ❌ Evitar
import { Button } from "../../../components/atoms/Button";

// ✅ Usar
import { Button } from "@atoms/Button";
```

**Aliases disponíveis:**

- `@/*` - Raiz de `src/`
- `@components/*` - Components
- `@atoms/*` - Atoms (componentes base)
- `@molecules/*` - Molecules
- `@organisms/*` - Organisms
- `@templates/*` - Templates
- `@pages/*` - Páginas
- `@hooks/*` - Custom hooks
- `@graphql/*` - GraphQL queries/mutations
- `@types/*` - Type definitions
- `@utils/*` - Utilitários
- `@styles/*` - Estilos SCSS

## 🔗 Integração com Backend

O frontend se conecta ao backend via GraphQL usando Apollo Client:

- **Queries**: Buscar alunos com filtros
- **Mutations**: CRUD de alunos
- **Subscriptions**: (Futuro) Atualizações em tempo real

Para documentação completa da API GraphQL, consulte o [README do backend](../backend/README.md).
