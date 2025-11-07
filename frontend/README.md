# Frontend - UI em React

Interface web para gerenciar alunos consumindo a API GraphQL.

## 🚀 Tecnologias

- **React 18** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Apollo Client** - Cliente GraphQL
- **Vitest** - Framework de testes

## 📁 Estrutura do Projeto

```
src/
├── main.tsx              # Entrada da aplicação
├── App.tsx               # Componente principal
├── components/
│   ├── StudentForm/      # Formulário de alunos
│   ├── StudentList/      # Lista de alunos
│   └── SearchFilter/     # Filtros de busca
├── graphql/
│   ├── client.ts         # Configuração Apollo Client
│   └── queries.ts        # Queries GraphQL
├── hooks/
│   └── useStudents.ts    # Hook para alunos
├── types/
│   └── index.ts          # Tipos TypeScript
└── utils/
    ├── error.ts          # Tratamento de erros
    ├── formatting.ts     # Formatação de dados
    └── index.ts          # Utilitários
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

| Comando                 | Descrição                   |
| ----------------------- | --------------------------- |
| `npm run dev`           | Servidor de desenvolvimento |
| `npm run build`         | Build para produção         |
| `npm run preview`       | Preview do build            |
| `npm test`              | Executar testes             |
| `npm run test:coverage` | Testes com cobertura        |

## 🌐 Variáveis de Ambiente

| Variável       | Descrição          | Padrão                          |
| -------------- | ------------------ | ------------------------------- |
| `VITE_API_URL` | URL da API GraphQL | `http://localhost:3000/graphql` |

## 🔗 Integração com Backend

O frontend se conecta ao backend via GraphQL usando Apollo Client:

- **Queries**: Buscar alunos com filtros
- **Mutations**: CRUD de alunos
- **Subscriptions**: (Futuro) Atualizações em tempo real

Para documentação completa da API GraphQL, consulte o [README do backend](../backend/README.md).
