import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./sequalize/config/sequalize";
import inventoryRoutes from "./routes/InventoryRoutes";

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/inventories", inventoryRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
