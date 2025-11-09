export const getErrorMessage = (
  err: unknown,
  defaultMsg: string = "Erro na operação"
): string => {
  let message = "";
  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === "string") {
    message = err;
  } else if (typeof err === "object" && err !== null) {
    if (
      "message" in err &&
      typeof (err as { message: unknown }).message === "string"
    ) {
      message = (err as { message: string }).message;
    }
  }

  if (message && message.toLowerCase().includes("failed to fetch")) {
    return "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.";
  }

  return message || defaultMsg;
};
