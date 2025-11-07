import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) {
    console.log("✅ Já está conectado ao MongoDB");
    return;
  }

  try {
    const mongoUri =
      process.env.DATABASE_URL || "mongodb://mongodb:27017/descomplica";

    await mongoose.connect(mongoUri);
    isConnected = true;

    console.log("✅ Conectado ao MongoDB com sucesso");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  try {
    if (isConnected) {
      await mongoose.disconnect();
      isConnected = false;
      console.log("✅ Desconectado do MongoDB");
    }
  } catch (error) {
    console.error("❌ Erro ao desconectar do MongoDB:", error);
    throw error;
  }
}

export function isDBConnected(): boolean {
  return isConnected;
}

export default mongoose;
