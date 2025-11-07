/**
 * Validation utilities for student data
 */

export const validateCPF = (cpf: string): boolean => {
  const cleanCpf = cpf.replace(/\D/g, "");

  if (cleanCpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(cleanCpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCpf.substring(10, 11))) {
    return false;
  }

  return true;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequiredFields = (
  nome?: string,
  cpf?: string,
  email?: string
): boolean => {
  return !!(nome?.trim() && cpf?.trim() && email?.trim());
};

export const validateStudentInput = (
  nome?: string,
  cpf?: string,
  email?: string
): {
  valid: boolean;
  field?: string;
} => {
  if (!validateRequiredFields(nome, cpf, email)) {
    return { valid: false, field: "required" };
  }

  if (!validateCPF(cpf!)) {
    return { valid: false, field: "cpf" };
  }

  if (!validateEmail(email!)) {
    return { valid: false, field: "email" };
  }

  return { valid: true };
};
