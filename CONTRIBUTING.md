# 🤝 Contribuindo para Descomplica Tech

Obrigado por considerar contribuir! Este documento fornece diretrizes e melhores práticas para contribuir com o projeto.

---

## 📋 Índice

1. [Como Começar](#como-começar)
2. [Padrão de Commits](#padrão-de-commits)
3. [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
4. [Testes](#testes)
5. [Pull Requests](#pull-requests)
6. [Dúvidas?](#dúvidas)

---

## 🚀 Como Começar

### 1. Fork e Clone

```bash
# Fork no GitHub
# Clonar seu fork
git clone https://github.com/seu-usuario/descomplica-tech.git
cd descomplica-tech

# Adicionar remote upstream
git remote add upstream https://github.com/leome/descomplica-tech.git
```

### 2. Configurar Ambiente

```bash
# Backend
cd backend
npm install

# Frontend (novo terminal)
cd frontend
npm install

# Ou tudo com Docker
docker-compose up --build
```

### 3. Criar Branch

```bash
git checkout -b feature/sua-feature
# ou
git checkout -b fix/seu-bug
```

---

## 📝 Padrão de Commits

Usamos **Conventional Commits** para padronizar mensagens de commits.

### Formato

```
<tipo>(<escopo>): <descrição>

<corpo>

<rodapé>
```

### Tipos de Commits

| Tipo         | Descrição                      | Exemplo                                           |
| ------------ | ------------------------------ | ------------------------------------------------- |
| **feat**     | Nova funcionalidade            | `feat(backend): adiciona validação de CPF`        |
| **fix**      | Correção de bug                | `fix(frontend): corrige erro ao editar aluno`     |
| **docs**     | Documentação                   | `docs: atualiza README com exemplos`              |
| **style**    | Formatação (sem lógica)        | `style(backend): formata código com Prettier`     |
| **refactor** | Refatoração (sem nova feature) | `refactor(resolvers): extrai lógica para service` |
| **test**     | Testes                         | `test(backend): adiciona testes para criar aluno` |
| **chore**    | Tarefas de build/CI            | `chore: atualiza dependências`                    |
| **perf**     | Melhoria de performance        | `perf(database): adiciona índice no MongoDB`      |

### Escopos Principais

- `backend` - Código do backend (Node.js/Express/GraphQL)
- `frontend` - Código do frontend (React/Vite)
- `database` - Schema/queries do MongoDB
- `docker` - Docker/Docker Compose
- `tests` - Testes em geral
- `docs` - Documentação

### Exemplos de Bons Commits

#### ✅ Feature com escopo

```bash
git commit -m "feat(backend): implementa validação com algoritmo CPF oficial

- Calcula dígitos verificadores
- Rejeita padrões all-same (111.111.111-11)
- Testa com CPFs válidos e inválidos"
```

#### ✅ Bug fix com referência

```bash
git commit -m "fix(frontend): corrige erro ao salvar aluno com email duplicado

Anteriormente, o erro do backend não era exibido ao usuário.
Agora extrai e mostra a mensagem de erro do servidor.

Fixes #123"
```

#### ✅ Refatoração

```bash
git commit -m "refactor(resolvers): remove validações duplicadas

O Mongoose schema já valida required, minlength e unique.
Removidas chamadas redundantes de validateStudentInput."
```

#### ✅ Testes

```bash
git commit -m "test(backend): adiciona testes para CPF validation

- Testa CPF válido
- Testa CPF inválido
- Testa padrão all-same
- Testa CPF com caracteres especiais"
```

### ❌ Commits Ruins (Evitar)

```bash
# Muito genérico
git commit -m "fix stuff"

# Sem tipo
git commit -m "adiciona validação"

# Sem contexto
git commit -m "updates"

# Múltiplas features sem separação
git commit -m "feat: adiciona CPF, email, nome e versioning"
```

---

## 🔄 Workflow de Desenvolvimento

### Passo 1: Sincronizar com Upstream

```bash
git fetch upstream
git rebase upstream/main
```

### Passo 2: Criar Branch com Padrão

```bash
# Feature
git checkout -b feature/user-authentication

# Bug fix
git checkout -b fix/login-error

# Improvement
git checkout -b improvement/api-response-time
```

### Passo 3: Fazer Alterações

```bash
# Editar arquivos...
# Testar localmente

# Verificar mudanças
git status
git diff

# Stage apenas mudanças relevantes
git add src/file1.ts
git add src/file2.ts
```

### Passo 4: Commits Atômicos

**Importante:** Cada commit deve ser uma unidade lógica completa

```bash
# ❌ Evitar: Commit gigante com múltiplas features
git add .
git commit -m "feat: implementa tudo"

# ✅ Fazer: Commits separados
git add backend/src/utils/validation.ts
git commit -m "feat(backend): implementa validateCPF"

git add backend/src/resolvers/StudentResolver.ts
git commit -m "feat(backend): integra validateCPF em createStudent"

git add frontend/src/components/StudentForm/index.tsx
git commit -m "test(frontend): adiciona teste para validação"
```

### Passo 5: Push e Pull Request

```bash
# Push para seu fork
git push origin feature/sua-feature

# Abrir Pull Request no GitHub
# - Descreva as mudanças
# - Referende issues relacionadas (#123)
# - Verifique se todos os testes passam
```

---

## 🧪 Testes

### Antes de Fazer Commit

```bash
# Backend
cd backend
npm run typecheck   # TypeScript
npm test            # Jest
npm run build       # Compilação

# Frontend
cd frontend
npm run typecheck
npm test
npm run build
```

### Adicionar Testes

**Backend:** `backend/tests/`

```typescript
describe("CPF Validation", () => {
  it("should validate correct CPF", () => {
    const result = validateCPF("12345678901");
    expect(result).toBe(true);
  });

  it("should reject invalid CPF", () => {
    const result = validateCPF("00000000000");
    expect(result).toBe(false);
  });
});
```

**Frontend:** `frontend/src/__tests__/`

```typescript
import { render, screen } from "@testing-library/react";
import StudentForm from "../components/StudentForm";

test("submits form with valid data", () => {
  render(<StudentForm />);
  // test code
});
```

---

## 📤 Pull Requests

### Checklist PR

Antes de abrir um PR, verifique:

- [ ] Branch criada da `master` (ou branch pai correta)
- [ ] Commits seguem Conventional Commits
- [ ] Código testado localmente
- [ ] Testes adicionados/atualizados
- [ ] TypeScript sem erros (`npm run typecheck`)
- [ ] `npm run build` funciona
- [ ] Documentação atualizada
- [ ] Sem console.logs deixados para trás

### Template PR

```markdown
## 📝 Descrição

Breve descrição do que foi implementado.

## 🔗 Issue Relacionada

Fixes #123

## 🔄 Tipo de Mudança

- [ ] Nova feature
- [ ] Bug fix
- [ ] Refatoração
- [ ] Documentação

## ✅ Checklist

- [ ] Testei localmente
- [ ] Adicionei testes
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Sem breaking changes

## 📸 Screenshots (se aplicável)
```

### Exemplo de PR com Bons Commits

```
feat(backend): implementa validação de CPF com algoritmo oficial

2 commits:

✓ feat(backend): implementa validateCPF com dígitos verificadores
✓ feat(backend): integra validateCPF em createStudent e updateStudent
```

---

## 📊 Histórico de Commits Bom vs Ruim

### ❌ Ruim (Impossível entender histórico)

```
commit abc123 - fix stuff
commit def456 - updates
commit ghi789 - final fix
commit jkl012 - really final fix
commit mno345 - oops forgot something
```

### ✅ Bom (Claro e rastreável)

```
commit abc123 - feat(backend): implementa CPF validation
commit def456 - feat(backend): integra CPF validation em StudentResolver
commit ghi789 - test(backend): adiciona testes para validateCPF
commit jkl012 - docs: atualiza README com exemplos de CPF válido
```

---

## 🔧 Ferramentas Recomendadas

### VSCode Extensions

```json
{
  "recommendations": [
    "conventional-commits.commits",
    "Conventional Commits",
    "ESLint",
    "Prettier"
  ]
}
```

### Git Hooks (Opcional)

Use `husky` + `commitlint` para validar commits automaticamente:

```bash
npm install husky commitlint @commitlint/config-conventional --save-dev

# Setup
npx husky install
npx husky add .husky/commit-msg 'npx --no commitlint --edit "$1"'
```

---

## 💡 Dicas e Boas Práticas

### 1. Commits Pequenos e Focados

```bash
# ❌ Ruim: Tudo junto
git add .
git commit -m "feat: implementa tudo"

# ✅ Bom: Separado por responsabilidade
git add backend/src/utils/validation.ts
git commit -m "feat(backend): adiciona validateCPF"

git add backend/src/resolvers/StudentResolver.ts
git commit -m "feat(backend): usa validateCPF em criar aluno"

git add backend/tests/validation.test.ts
git commit -m "test(backend): testa validateCPF"
```

### 2. Mensagens Descritivas

```bash
# ❌ Ruim
git commit -m "fix error"

# ✅ Bom
git commit -m "fix(frontend): corrige erro ao enviar formulário vazio

Mensagem de erro agora é exibida corretamente quando usuário
tenta criar aluno sem preencher campos obrigatórios."
```

### 3. Referenciar Issues

```bash
# Feche issue automaticamente
git commit -m "fix(backend): corrige validação de email

Fixes #42"

# Relacione sem fechar
git commit -m "refactor(database): melhora índices

Related to #42"
```

### 4. Evitar Commits "Oops"

```bash
# ❌ Ruim: Histórico poluído
commit abc123 - feat: implementa CPF
commit def456 - oops esqueci de importar
commit ghi789 - fix: agora funciona
commit jkl012 - oops typo

# ✅ Bom: Histórico limpo
commit abc123 - feat(backend): implementa CPF com testes

# Se errar ANTES de fazer push:
git commit --amend
# ou
git rebase -i HEAD~3
```

---

## 📚 Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Commit Best Practices](https://tbaggery.com/effective-pull-requests.html)
- [How to Write Good Commit Messages](https://chris.beams.io/posts/git-commit/)

---

## 🚀 Passos Finais

1. ✅ Faça seus commits seguindo o padrão
2. ✅ Teste localmente (`npm test`, `npm run build`)
3. ✅ Push para seu fork
4. ✅ Abra Pull Request com descrição clara
5. ✅ Responda a reviews com constructividade

---

## ❓ Dúvidas?

- 📖 Leia a [documentação](./README.md)
- 🐛 Abra uma [issue](https://github.com/leomeliande/descomplica-tech-test/issues)
- 💬 Comente no PR

---

**Obrigado por contribuir comigo! ❤️**
