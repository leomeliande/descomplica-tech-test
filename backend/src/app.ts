import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { graphql } from "graphql";
import { studentResolvers } from "./resolvers/StudentResolver";
import { schema } from "./graphql/schema";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.post("/graphql", async (req: Request, res: Response) => {
  const { query, variables } = req.body;

  const result = await graphql({
    schema,
    source: query,
    rootValue: studentResolvers,
    variableValues: variables,
  });

  res.json(result);
});

export default app;
