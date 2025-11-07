import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./database";
import { initializeDatabase } from "./database/schema";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
      console.log(`📊 Endpoint GraphQL: http://localhost:${PORT}/graphql`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar:", error);
    process.exit(1);
  }
}

start();
