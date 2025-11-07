/**
 * Error handling utilities
 */

export const getErrorMessage = (
  err: unknown,
  defaultMsg: string = "Erro na operação"
): string => {
  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === "string") {
    return err;
  }

  if (
    err &&
    typeof err === "object" &&
    "message" in err &&
    typeof err.message === "string"
  ) {
    return err.message;
  }

  return defaultMsg;
};
