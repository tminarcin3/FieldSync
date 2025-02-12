import express, { Request, Response } from "express"
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import externalUserRoutes from './routes/externalUserRoutes';
import cors from "cors";
import { AppDataSource } from "./data-source"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.SERVER_PORT || 4000;

app.use(userRoutes);
app.use(externalUserRoutes);
app.get("*", (req: Request, res: Response) => {
  res.status(400).json({ message: "Bad Request" });
});
AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
}); 