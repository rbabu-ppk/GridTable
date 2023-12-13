import express from "express";
import cors from "cors";
import { dbConnection } from "./database/database";
import router from "./router/routes";

const app = express();
app.use(express.json());

app.use(cors());

dbConnection();

const PORT = 3001;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
