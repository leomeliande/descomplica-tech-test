import { validateCPF } from "../src/utils/validation";

export const generateValidCPF = (baseNumber: number): string => {
  const base = String(baseNumber).padStart(9, "0").slice(0, 9);

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(base[i]) * (10 - i);
  }

  let remainder = (sum * 10) % 11;
  const digit1 = remainder === 10 || remainder === 11 ? 0 : remainder;

  const cpf9 = base + digit1;

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf9[i]) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  const digit2 = remainder === 10 || remainder === 11 ? 0 : remainder;

  return cpf9 + digit2;
};

jest.mock("../src/resolvers/StudentResolver", () => {
  let store: any[] = [];

  const studentResolvers = {
    students: jest.fn(
      async (args?: { nome?: string; cpf?: string; email?: string }) => {
        let data = [...store];
        if (args?.nome)
          data = data.filter((s) =>
            s.nome.toLowerCase().includes(args.nome!.toLowerCase())
          );
        if (args?.cpf) data = data.filter((s) => s.cpf === args.cpf);
        if (args?.email) data = data.filter((s) => s.email === args.email);
        return { data, count: data.length };
      }
    ),

    student: jest.fn(
      async ({ id }: { id: string }) => store.find((s) => s._id === id) || null
    ),

    createStudent: jest.fn(
      async ({
        nome,
        cpf,
        email,
      }: {
        nome: string;
        cpf: string;
        email: string;
      }) => {
        if (!validateCPF(cpf)) {
          throw new Error("CPF inválido");
        }

        const cleanCpf = cpf.replace(/\D/g, "");
        const s = { _id: String(store.length + 1), nome, cpf: cleanCpf, email };
        store.push(s);
        return s;
      }
    ),

    updateStudent: jest.fn(
      async ({
        id,
        ...rest
      }: {
        id: string;
        nome?: string;
        cpf?: string;
        email?: string;
      }) => {
        const s = store.find((x) => x._id === id);
        if (!s) return null;

        if (rest.cpf && !validateCPF(rest.cpf)) {
          throw new Error("CPF inválido");
        }

        if (rest.cpf) {
          rest.cpf = rest.cpf.replace(/\D/g, "");
        }

        Object.assign(s, rest);
        return s;
      }
    ),

    deleteStudent: jest.fn(async ({ id }: { id: string }) => {
      const idx = store.findIndex((x) => x._id === id);
      if (idx === -1) return false;
      store.splice(idx, 1);
      return true;
    }),
  };

  return {
    studentResolvers,
    __reset: () => {
      store = [];
    },
  };
});

// tiny helper so tests can reset between cases
export const resetMock = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("../src/resolvers/StudentResolver");
  mod.__reset?.();
};
